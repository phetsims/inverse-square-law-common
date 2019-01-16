// Copyright 2017-2018, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var FocusHighlightFromNode = require( 'SCENERY/accessibility/FocusHighlightFromNode' );
  var GrabDragInteraction = require( 'SCENERY_PHET/accessibility/GrabDragInteraction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  var KeyboardDragListener = require( 'SCENERY_PHET/accessibility/listeners/KeyboardDragListener' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var unitsCentimetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.centimeters' );

  // a11y strings
  var rulerHelpTextString = ISLCA11yStrings.rulerHelpText.value;
  var rulerLabelString = ISLCA11yStrings.rulerLabel.value;
  var moveInFourDirectionsString = ISLCA11yStrings.moveInFourDirections.value;

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 35;
  var RULER_INSET = 10;

  /**
   * @param {ISLCModel} model
   * @param {number} screenHeight
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCRulerNode( model, screenHeight, modelViewTransform, tandem, options ) {

    options = _.extend( {
      snapToNearest: null,
      majorTickLabels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
      unitString: unitsCentimetersString,
      backgroundFill: '#ddd',
      rulerInset: RULER_INSET,

      // a11y
      moveOnHoldDelay: 750
    }, options );

    assert && assert( options.tagName === undefined, 'RulerNode sets its own tagName, see GrabDragInteraction usage below.' );

    var majorTickLabels = options.majorTickLabels;
    var rulerUnitString = options.unitString;

    Node.call( this, {
      cursor: 'pointer',
      cssTransform: true,
      tandem: tandem,
      tagName: 'div',
      focusable: true,
      focusHighlightLayerable: true
    } );

    var ruler = new RulerNode(
      RULER_WIDTH,
      RULER_HEIGHT,
      50,
      majorTickLabels,
      rulerUnitString,
      {
        backgroundFill: options.backgroundFill,
        insetsWidth: options.rulerInset,
        minorTicksPerMajorTick: 4,
        majorTickFont: new PhetFont( 12 ),
        snapToNearest: options.snapToNearest ? options.snapToNearest : 0,
        unitsFont: new PhetFont( 10 ),
        unitsSpacing: 3,
        tandem: tandem.createTandem( 'ruler' )
      }
    );
    this.addChild( ruler );

    ruler.mouseArea = Shape.rectangle( 0, 0, ruler.bounds.width, RULER_HEIGHT );
    ruler.touchArea = ruler.mouseArea;

    // ruler drag bounds (in model coordinate frame) - assumes a single point scale inverted Y mapping
    var modelHeight = modelViewTransform.viewToModelDeltaY( screenHeight );
    var modelRulerHeight = modelViewTransform.viewToModelDeltaY( this.height );

    var minX = model.leftObjectBoundary;
    var minY = modelHeight / 2 - modelRulerHeight; // bottom bound because Y is inverted
    var maxX = model.rightObjectBoundary;
    var maxY = -modelHeight / 2 + modelRulerHeight; // top bound because Y is inverted
    var bounds = new Bounds2( minX, minY, maxX, maxY );

    this.addInputListener( new MovableDragHandler( model.rulerPositionProperty, {
      dragBounds: bounds,
      tandem: tandem.createTandem( 'dragHandler' ),
      modelViewTransform: modelViewTransform,

      onDrag: function() {

        // snap to nearest snapToNearest if specified
        if ( options.snapToNearest ) {

          // x in model coordinates
          var xModel = model.rulerPositionProperty.get().x;

          var snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;

          model.rulerPositionProperty.set( new Vector2( snappedX, model.rulerPositionProperty.get().y ) );
        }
      }
    } ) );

    // a11y - custom, layerable focus highlight
    var focusHighlight = new FocusHighlightFromNode( ruler, { useLocalBounds: true } );
    this.setFocusHighlight( focusHighlight );

    ruler.addChild( focusHighlight );

    // @private (a11y) - supports keyboard interaction, private so it can be stepped
    var keyboardDragDelta = modelViewTransform.modelToViewDeltaX( options.snapToNearest );
    var keyboardDragListener = new KeyboardDragListener( {
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
          var xModel = model.rulerPositionProperty.get().x;
          var snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
          model.rulerPositionProperty.set( new Vector2( snappedX, model.rulerPositionProperty.get().y ) );
        }
      }
    } );

    // a11y - add the "grab button" interaction
    this.a11yGrabDragInteraction = new GrabDragInteraction( this, {
      objectToGrabString: rulerLabelString,

      // Empirically determined values to place the cue above the book.
      grabCueOptions: {
        x: 150,
        y: -40
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
        if ( this.hasAccessibleAttribute( 'aria-roledescription' ) ) {
          this.removeAccessibleAttribute( 'aria-roledescription' );
        }
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
