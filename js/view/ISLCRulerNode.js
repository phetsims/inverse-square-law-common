// Copyright 2017-2019, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  const Bounds2 = require( 'DOT/Bounds2' );
  const FocusHighlightFromNode = require( 'SCENERY/accessibility/FocusHighlightFromNode' );
  const GrabDragInteraction = require( 'SCENERY_PHET/accessibility/GrabDragInteraction' );
  const inherit = require( 'PHET_CORE/inherit' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const KeyboardDragListener = require( 'SCENERY/listeners/KeyboardDragListener' );
  const KeyboardUtil = require( 'SCENERY/accessibility/KeyboardUtil' );
  const merge = require( 'PHET_CORE/merge' );
  const MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RulerNode = require( 'SCENERY_PHET/RulerNode' );
  const Shape = require( 'KITE/Shape' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const unitsCentimetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.centimeters' );

  // a11y strings
  const rulerHelpTextString = ISLCA11yStrings.rulerHelpText.value;
  const rulerLabelString = ISLCA11yStrings.rulerLabel.value;
  const moveInFourDirectionsString = ISLCA11yStrings.moveInFourDirections.value;

  // constants
  const RULER_WIDTH = 500;
  const RULER_HEIGHT = 35;
  const RULER_INSET = 10;

  /**
   * @param {ISLCModel} model
   * @param {number} screenHeight
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCRulerNode( model, screenHeight, modelViewTransform, tandem, options ) {

    options = merge( {
      snapToNearest: null,
      majorTickLabels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
      unitString: unitsCentimetersString,
      backgroundFill: '#ddd',
      rulerInset: RULER_INSET,

      // {number} If using with snapToNearest, then this number will be rounded by the that value.
      modelYForCenterJump: .5,

      // a11y
      moveOnHoldDelay: 750
    }, options );

    assert && assert( options.tagName === undefined, 'RulerNode sets its own tagName, see GrabDragInteraction usage below.' );

    const majorTickLabels = options.majorTickLabels;
    const rulerUnitString = options.unitString;

    Node.call( this, {
      cursor: 'pointer',
      cssTransform: true,
      tagName: 'div',
      focusable: true,
      focusHighlightLayerable: true
    } );

    const ruler = new RulerNode(
      RULER_WIDTH,
      RULER_HEIGHT,
      50,
      majorTickLabels,
      rulerUnitString, {
        backgroundFill: options.backgroundFill,
        insetsWidth: options.rulerInset,
        minorTicksPerMajorTick: 4,
        majorTickFont: new PhetFont( 12 ),
        snapToNearest: options.snapToNearest ? options.snapToNearest : 0,
        unitsFont: new PhetFont( 10 ),
        unitsSpacing: 3,
        tandem: tandem
      } );
    this.addChild( ruler );

    ruler.mouseArea = Shape.rectangle( 0, 0, ruler.bounds.width, RULER_HEIGHT );
    ruler.touchArea = ruler.mouseArea;

    // ruler drag bounds (in model coordinate frame) - assumes a single point scale inverted Y mapping
    const modelHeight = modelViewTransform.viewToModelDeltaY( screenHeight );
    const modelRulerHeight = modelViewTransform.viewToModelDeltaY( this.height );

    const minX = model.leftObjectBoundary;
    const minY = modelHeight / 2 - modelRulerHeight; // bottom bound because Y is inverted
    const maxX = model.rightObjectBoundary;
    const maxY = -modelHeight / 2 + modelRulerHeight; // top bound because Y is inverted
    const bounds = new Bounds2( minX, minY, maxX, maxY );

    this.addInputListener( new MovableDragHandler( model.rulerPositionProperty, {
      dragBounds: bounds,
      tandem: tandem.createTandem( 'dragHandler' ),
      modelViewTransform: modelViewTransform,

      onDrag: function() {

        // snap to nearest snapToNearest if specified
        if ( options.snapToNearest ) {

          // x in model coordinates
          const xModel = model.rulerPositionProperty.get().x;

          const snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;

          model.rulerPositionProperty.set( new Vector2( snappedX, model.rulerPositionProperty.get().y ) );
        }
      }
    } ) );

    // a11y - custom, layerable focus highlight
    const focusHighlight = new FocusHighlightFromNode( ruler, { useLocalBounds: true } );
    this.setFocusHighlight( focusHighlight );

    ruler.addChild( focusHighlight );

    const keyboardDragDelta = modelViewTransform.modelToViewDeltaX( options.snapToNearest );

    // supports keyboard interaction
    const keyboardDragListener = new KeyboardDragListener( {
      dragBounds: bounds,
      locationProperty: model.rulerPositionProperty,
      transform: modelViewTransform,
      moveOnHoldDelay: options.moveOnHoldDelay,
      downDelta: keyboardDragDelta,
      shiftDownDelta: keyboardDragDelta,
      dragVelocity: keyboardDragDelta * 60,
      shiftDragVelocity: keyboardDragDelta * 60,

      // snap to nearest snapToNearest, called on end so that dragging doesn't snap to a value for as long
      // as key is held down
      drag: function() {
        if ( options.snapToNearest ) {
          const xModel = model.rulerPositionProperty.get().x;
          const snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
          model.rulerPositionProperty.set( new Vector2( snappedX, model.rulerPositionProperty.get().y ) );
        }
      }
    } );

    // the ruler's orgin is the center, this offset get's the edge of it.
    const rulerAlignWithObjectXOffset = modelViewTransform.viewToModelDeltaX( RULER_WIDTH ) / 2;

    // register hot key shortcuts
    keyboardDragListener.addHotkeyGroups( [ {
      keys: [ KeyboardUtil.KEY_J, KeyboardUtil.KEY_C ], // jump to center of object 1
      callback: () => {
        const x = model.object1.positionProperty.value;
        model.rulerPositionProperty.set( new Vector2( x + rulerAlignWithObjectXOffset, options.modelYForCenterJump ) );
      }
    }, {
      keys: [ KeyboardUtil.KEY_J, KeyboardUtil.KEY_H ], // jump home
      callback: () => model.rulerPositionProperty.set( model.rulerPositionProperty.initialValue )
    } ] );

    // a11y - add the "grab button" interaction
    this.a11yGrabDragInteraction = new GrabDragInteraction( this, {
      objectToGrabString: rulerLabelString,

      // Empirically determined values to place the cue above the ruler.
      grabCueOptions: {
        x: 135,
        y: -45
      },
      grabbableOptions: {
        appendDescription: true,
        helpText: rulerHelpTextString,
        focusHighlight: focusHighlight
      },

      // whenever converting from grabbable -> draggable, this function is called
      onDraggable: () => {
        this.setAccessibleAttribute( 'aria-roledescription', moveInFourDirectionsString );
        this.addAriaDescribedbyAssociation( {
          otherNode: this,
          otherElementName: AccessiblePeer.DESCRIPTION_SIBLING,
          thisElementName: AccessiblePeer.PRIMARY_SIBLING
        } );
      },

      // whenever converting from draggable -> grabbable, this function is called
      onGrabbable: () => {
        this.ariaDescribedbyAssociations = [];
      },

      listenersForDrag: [ keyboardDragListener ]
    } );

    // @public - ruler node is never destroyed, no listener disposal necessary
    // Called after the focusHighlight has been added as a child to the ruler
    model.rulerPositionProperty.link( function( value ) {

      // Because the focus highlight is `focusHighlightLayerable`, the highlight for `this`
      // is a child of the ruler. As a result the "center" includes the focusHighlight as well
      // as some child added to it in GrabDragInteraction, and so it is easiest to set the center
      // disregarding the focusHighlight. See https://github.com/phetsims/gravity-force-lab/issues/140
      ruler.removeChild( focusHighlight );
      ruler.center = modelViewTransform.modelToViewPosition( value );
      ruler.addChild( focusHighlight );
    } );
  }

  inverseSquareLawCommon.register( 'ISLCRulerNode', ISLCRulerNode );

  return inherit( Node, ISLCRulerNode, {

    /**
     * @public
     */
    reset: function() {
      this.a11yGrabDragInteraction.reset();
    }
  } );
} );
