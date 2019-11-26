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
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const FocusHighlightFromNode = require( 'SCENERY/accessibility/FocusHighlightFromNode' );
  const GrabDragInteraction = require( 'SCENERY_PHET/accessibility/GrabDragInteraction' );
  const grabSoundPlayer = require( 'TAMBO/shared-sound-players/grabSoundPlayer' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const KeyboardDragListener = require( 'SCENERY/listeners/KeyboardDragListener' );
  const KeyboardUtil = require( 'SCENERY/accessibility/KeyboardUtil' );
  const Line = require( 'SCENERY/nodes/Line' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const releaseSoundPlayer = require( 'TAMBO/shared-sound-players/releaseSoundPlayer' );
  const RulerNode = require( 'SCENERY_PHET/RulerNode' );
  const SceneryPhetA11yStrings = require( 'SCENERY_PHET/SceneryPhetA11yStrings' );
  const Shape = require( 'KITE/Shape' );
  const softClickSoundPlayer = require( 'TAMBO/shared-sound-players/softClickSoundPlayer' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const Utterance = require( 'UTTERANCE_QUEUE/Utterance' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const unitsCentimetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.centimeters' );

  // a11y strings
  const rulerHelpTextString = ISLCA11yStrings.rulerHelpText.value;
  const rulerKeyboardHintString = ISLCA11yStrings.rulerKeyboardHint.value;
  const gestureHelpTextPatternString = SceneryPhetA11yStrings.gestureHelpTextPattern.value;
  const rulerLabelString = ISLCA11yStrings.rulerLabel.value;

  const measureDistanceRulerString = ISLCA11yStrings.measureDistanceRuler.value;

  // constants
  const RULER_WIDTH = 500;
  const RULER_HEIGHT = 35;
  const RULER_INSET = 10;
  const SHOW_RULER_REGIONS = ISLCQueryParameters.showRulerRegions;

  class ISLCRulerNode extends Node {

    /**
     * @param {Property.<number>} rulerPositionProperty
     * @param {Bounds2} dragBounds - draggable bounds of the ruler, in model coords. Note that this will be dilated by
     *                                half the width of the ruler in the y dimensions. Also the right bound will not
     *                                be based on the center of the ruler, but instead based on the "zero mark" of
     *                                the ruler (located on the left side of the ruler)
     * @param {ModelViewTransform2} modelViewTransform
     * @param {function():number} getObject1Position - get the position in model coords, of the first object
     * @param {ISLCRulerDescriber} rulerDescriber
     * @param {Tandem} tandem
     * @param {Object} [options]
     */
    constructor( rulerPositionProperty, dragBounds, modelViewTransform, getObject1Position, rulerDescriber, tandem, options ) {

      options = merge( {
        snapToNearest: null,
        majorTickLabels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
        unitString: unitsCentimetersString,
        backgroundFill: '#ddd',
        rulerInset: RULER_INSET,

        // {number} If using with snapToNearest, then this number will be rounded by the that value.
        modelYForCenterJump: .5,

        // sound generation

        // {Playable|null} - sound players, null indicates default should be used, use Playable.NO_SOUND to disable
        grabRulerSoundPlayer: null,
        releaseRulerSoundPlayer: null,
        movementSoundPlayer: null,

        // {number} - amount of distance that the ruler should travel before playing another sound, same units as the
        // rulerPositionProperty.
        movementSoundDistance: 0.5,

        // a11y
        moveOnHoldDelay: 750
      }, options );

      assert && assert( options.tagName === undefined, 'RulerNode sets its own tagName, see GrabDragInteraction usage below.' );

      const majorTickLabels = options.majorTickLabels;
      const rulerUnitString = options.unitString;

      super( {
        cursor: 'pointer',
        cssTransform: true,
        tagName: 'div',
        focusable: true
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

      // Use the constant instead of `this.width` because RulerNode adds inset on each side of the ruler.
      dragBounds.maxX = dragBounds.maxX + modelViewTransform.viewToModelDeltaX( RULER_WIDTH / 2 );

      // Add half of the ruler height so the whole ruler is bounded, not just the center. Use the constant instead of
      // `this.height` because RulerNode adds line width around for drawing
      const dragBoundsWithRulerHeight = dragBounds.dilatedY( modelViewTransform.viewToModelDeltaY( RULER_HEIGHT / 2 ) );

      // get default sound generators if needed
      const grabRulerSoundPlayer = options.grabRulerSoundPlayer || grabSoundPlayer;
      const releaseRulerSoundPlayer = options.releaseRulerSoundPlayer || releaseSoundPlayer;

      // variable to track location where last movement sound was produced
      const positionOfLastMotionSound = rulerPositionProperty.value.copy();

      this.addInputListener( new DragListener( {
        locationProperty: rulerPositionProperty,
        tandem: tandem.createTandem( 'dragListener' ),
        transform: modelViewTransform,
        applyOffset: false, // TODO: we want to be able to apply offset here, but can't because of https://github.com/phetsims/scenery/issues/1014
        mapLocation: location => {

          // snap to nearest snapToNearest if specified
          if ( options.snapToNearest ) {

            // x in model coordinates
            const xModel = location.x;
            location.x = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
          }

          // map withing the drag bounds, this is the same as using "dragBoundsProperty'
          return dragBoundsWithRulerHeight.closestPointTo( location );
        },
        start() {
          grabRulerSoundPlayer.play();
          positionOfLastMotionSound.set( rulerPositionProperty.value );
        },
        drag() {
          const rulerPosition = rulerPositionProperty.value;
          const distanceFromLastMotionSoundPlay = rulerPosition.distance( positionOfLastMotionSound );
          if ( distanceFromLastMotionSoundPlay > 0.5 ) {
            softClickSoundPlayer.play();
            positionOfLastMotionSound.set( rulerPosition );
          }
        },
        end() {
          releaseRulerSoundPlayer.play();
        }
      } ) );

      // a11y - custom focus highlight
      const focusHighlight = new FocusHighlightFromNode( ruler, { useLocalBounds: true } );
      this.setFocusHighlight( focusHighlight );

      const grabbedUtterance = new Utterance();
      const movedUtterance = new Utterance();
      const keyboardDragDelta = modelViewTransform.modelToViewDeltaX( options.snapToNearest );

      // supports keyboard interaction
      const keyboardDragListener = new KeyboardDragListener( {
        dragBounds: dragBoundsWithRulerHeight,
        locationProperty: rulerPositionProperty,
        transform: modelViewTransform,
        moveOnHoldDelay: options.moveOnHoldDelay,
        downDelta: 2 * keyboardDragDelta,
        shiftDownDelta: keyboardDragDelta,
        dragVelocity: keyboardDragDelta * 60,
        shiftDragVelocity: keyboardDragDelta * 60,

        // snap to nearest snapToNearest, called on end so that dragging doesn't snap to a value for as long
        // as key is held down
        drag() {
          softClickSoundPlayer.play();
          if ( options.snapToNearest ) {
            const xModel = rulerPositionProperty.get().x;
            const snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
            rulerPositionProperty.set( new Vector2( snappedX, rulerPositionProperty.get().y ) );
          }
        }
      } );

      // @private - add the "grab button" interaction
      this.grabDragInteraction = new GrabDragInteraction( this, {
        objectToGrabString: rulerLabelString,
        grabbableAccessibleName: measureDistanceRulerString,

        // Empirically determined values to place the cue above the ruler.
        grabCueOptions: {
          x: 135,
          y: -45
        },

        keyboardHelpText: StringUtils.fillIn( rulerHelpTextString, {
          deviceSpecificHint: rulerKeyboardHintString
        } ),

        // Overwrite the gesture help text to include ruler-specific logic. This isn't always needed.
        gestureHelpText: StringUtils.fillIn( rulerHelpTextString, {
          deviceSpecificHint: StringUtils.fillIn( gestureHelpTextPatternString, {
            objectToGrab: rulerLabelString
          } )
        } ),

        onGrab() {
          grabRulerSoundPlayer.play();
          grabbedUtterance.alert = rulerDescriber.getRulerGrabbedAlertable();
          phet.joist.sim.utteranceQueue.addToBack( grabbedUtterance );
        },

        onRelease() {
          releaseRulerSoundPlayer.play();
        },

        listenersForDrag: [ keyboardDragListener ],

        tandem: tandem.createTandem( 'grabDragInteraction' )
      } );

      // a11y - the GrabDragInteraction is added to this Node but the drag handler and transform changes are applied
      // to the child RulerNode - PDOM siblings need to reposition with the RulerNode
      this.setPDOMTransformSourceNode( ruler );

      // the ruler's orgin is the center, this offset get's the edge of it.
      const rulerAlignWithObjectXOffset = modelViewTransform.viewToModelDeltaX( RULER_WIDTH ) / 2;

      // register hotkeys
      keyboardDragListener.addHotkeys( [ {
        keys: [ KeyboardUtil.KEY_J, KeyboardUtil.KEY_C ], // jump to center of object 1
        callback: () => {
          const x = getObject1Position();
          rulerPositionProperty.set( new Vector2( x + rulerAlignWithObjectXOffset, options.modelYForCenterJump ) );

          // TODO: remove this conditional once CL ruler describer is supported
          if ( rulerDescriber.getJumpCenterMassAlert ) {
            movedUtterance.alert = rulerDescriber.getJumpCenterMassAlert();
            phet.joist.sim.utteranceQueue.addToBack( movedUtterance );
          }
        }
      }, {
        keys: [ KeyboardUtil.KEY_J, KeyboardUtil.KEY_H ], // jump home
        callback: () => {
          rulerPositionProperty.set( rulerPositionProperty.initialValue );
          this.grabDragInteraction.releaseDraggable();

          // TODO: remove this conditional once CL ruler describer is supported
          if ( rulerDescriber.getHomePositionString ) {
            movedUtterance.alert = rulerDescriber.getHomePositionString();
            phet.joist.sim.utteranceQueue.addToBack( movedUtterance );
          }
        }
      } ] );


      // @public - ruler node is never destroyed, no listener disposal necessary
      rulerPositionProperty.link( value => {
        ruler.center = modelViewTransform.modelToViewPosition( value );
      } );

      if ( SHOW_RULER_REGIONS ) {
        const lineOptions = { stroke: 'black', x: ruler.width / 2, y: RULER_HEIGHT / 2 };
        const xLine = new Line( -10, 0, 10, 0, lineOptions );
        const yLine = new Line( 0, -10, 0, 10, lineOptions );
        ruler.addChild( xLine );
        ruler.addChild( yLine );
      }
    }

    /**
     * @public
     */
    reset() {
      this.grabDragInteraction.reset();
    }
  }

  return inverseSquareLawCommon.register( 'ISLCRulerNode', ISLCRulerNode );
} );
