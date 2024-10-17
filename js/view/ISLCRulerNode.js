// Copyright 2017-2024, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Utils from '../../../dot/js/Utils.js';
import Vector2 from '../../../dot/js/Vector2.js';
import { Shape } from '../../../kite/js/imports.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import GrabDragInteraction from '../../../scenery-phet/js/accessibility/grab-drag/GrabDragInteraction.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import RulerNode from '../../../scenery-phet/js/RulerNode.js';
import SceneryPhetStrings from '../../../scenery-phet/js/SceneryPhetStrings.js';
import { DragListener, HighlightFromNode, HotkeyData, InteractiveHighlighting, KeyboardDragListener, KeyboardListener, Line, Node } from '../../../scenery/js/imports.js';
import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import SoundLevelEnum from '../../../tambo/js/SoundLevelEnum.js';
import soundManager from '../../../tambo/js/soundManager.js';
import grab_mp3 from '../../../tambo/sounds/grab_mp3.js';
import release_mp3 from '../../../tambo/sounds/release_mp3.js';
import Tandem from '../../../tandem/js/Tandem.js';
import Utterance from '../../../utterance-queue/js/Utterance.js';
import rulerMovement000_mp3 from '../../sounds/rulerMovement000_mp3.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import InverseSquareLawCommonStrings from '../InverseSquareLawCommonStrings.js';
import ISLCQueryParameters from '../ISLCQueryParameters.js';

// constants
const unitsCentimetersString = InverseSquareLawCommonStrings.units.centimeters;
const rulerHelpTextString = InverseSquareLawCommonStrings.a11y.ruler.rulerHelpText;
const rulerKeyboardHintString = InverseSquareLawCommonStrings.a11y.ruler.rulerKeyboardHint;
const gestureHelpTextPatternStringProperty = SceneryPhetStrings.a11y.grabDrag.gestureHelpTextPatternStringProperty;
const rulerLabelString = InverseSquareLawCommonStrings.a11y.ruler.rulerLabel;
const measureDistanceRulerString = InverseSquareLawCommonStrings.a11y.ruler.measureDistanceRuler;

const RULER_WIDTH = 500;
const RULER_HEIGHT = 35;
const RULER_INSET = 10;
const SHOW_RULER_REGIONS = ISLCQueryParameters.showRulerRegions;
const SOUND_PLAY_DRAG_DISTANCE = 0.5; // in screen coords

class ISLCRulerNode extends InteractiveHighlighting( Node ) {

  /**
   * @param {Property.<number>} rulerPositionProperty
   * @param {Bounds2} dragBounds - draggable bounds of the ruler, in model coords. Note that this will be dilated by
   *                                half the width of the ruler in the y dimensions. Also the right bound will not
   *                                be based on the center of the ruler, but instead based on the "zero mark" of
   *                                the ruler (located on the left side of the ruler)
   * @param {ModelViewTransform2} modelViewTransform
   * @param {function():number} getObject1Position - get the position in model coords, of the first object
   * @param {Alerter} rulerAlerter TODO  https://github.com/phetsims/least-squares-regression/issues/86 when other types need this, likely should create an ISLC interface for this
   * @param {Node} interactionCueParent
   * @param {Object} [options]
   */
  constructor(
    rulerPositionProperty,
    dragBounds,
    modelViewTransform,
    getObject1Position,
    rulerAlerter,
    interactionCueParent,
    options ) {
    assert && options && assert( options.tagName === undefined, 'RulerNode sets its own tagName, see GrabDragInteraction usage below.' );

    options = merge( {

      // Node
      cursor: 'pointer',

      // SelfOptions
      snapToNearest: null,
      majorTickLabels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
      unitString: unitsCentimetersString,
      backgroundFill: '#ddd',
      rulerInset: RULER_INSET,

      // {number} If using with snapToNearest, then this number will be rounded by the that value.
      modelYForCenterJump: 0.5,

      // sound generation

      // {TSoundPlayer|null} - sound players, null indicates default should be used, use nullSoundPlayer to disable
      grabRulerSoundPlayer: null,
      releaseRulerSoundPlayer: null,
      movementSoundPlayer: null,

      // {number} - amount of distance that the ruler should travel before playing another sound, same units as the
      // rulerPositionProperty.
      movementSoundDistance: 0.5,

      // pdom
      moveOnHoldDelay: 750,
      moveOnHoldInterval: 50,
      grabDragInteractionOptions: {
        objectToGrabString: rulerLabelString,
        idleStateAccessibleName: measureDistanceRulerString,

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
          deviceSpecificHint: StringUtils.fillIn( gestureHelpTextPatternStringProperty, {
            objectToGrab: rulerLabelString
          } )
        } )
      },

      tandem: Tandem.REQUIRED
    }, options );

    const majorTickLabels = options.majorTickLabels;
    const rulerUnitString = options.unitString;

    super( options );

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
        tandem: Tandem.OPT_OUT
      } );
    this.addChild( ruler );

    ruler.mouseArea = Shape.rectangle( 0, 0, ruler.bounds.width, RULER_HEIGHT );
    ruler.touchArea = ruler.mouseArea;

    // Use the constant instead of `this.width` because RulerNode adds inset on each side of the ruler.
    dragBounds.maxX = dragBounds.maxX + modelViewTransform.viewToModelDeltaX( RULER_WIDTH / 2 );

    // Add half of the ruler height so the whole ruler is bounded, not just the center. Use the constant instead of
    // `this.height` because RulerNode adds line width around for drawing
    const dragBoundsWithRulerHeight = dragBounds.dilatedY( modelViewTransform.viewToModelDeltaY( RULER_HEIGHT / 2 ) );

    // sound generation

    let grabRulerSoundPlayer;
    if ( options.grabRulerSoundPlayer === null ) {

      // no sound player specified by the client, use the default
      grabRulerSoundPlayer = new SoundClip( grab_mp3 );
      soundManager.addSoundGenerator( grabRulerSoundPlayer );
    }
    else {
      grabRulerSoundPlayer = options.grabRulerSoundPlayer;
    }

    let releaseRulerSoundPlayer;
    if ( options.releaseRulerSoundPlayer === null ) {

      // no sound player specified by the client, use the default
      releaseRulerSoundPlayer = new SoundClip( release_mp3 );
      soundManager.addSoundGenerator( releaseRulerSoundPlayer );
    }
    else {
      releaseRulerSoundPlayer = options.releaseRulerSoundPlayer;
    }

    // check if a sound player was provided for ruler motion and, if not, create a default
    let movementSoundPlayer;
    if ( options.movementSoundPlayer === null ) {

      // no sound player provided, use the default
      movementSoundPlayer = new SoundClip( rulerMovement000_mp3, {
        initialOutputLevel: 0.2,
        sonificationLevel: SoundLevelEnum.EXTRA
      } );
      soundManager.addSoundGenerator( movementSoundPlayer );
    }
    else {

      // use the sound player specified by the user
      movementSoundPlayer = options.movementSoundPlayer;
    }

    // variable to track position where last movement sound was produced
    const positionOfLastMotionSound = rulerPositionProperty.value.copy();

    ruler.addInputListener( new DragListener( {
      positionProperty: rulerPositionProperty,
      tandem: options.tandem.createTandem( 'dragListener' ),
      transform: modelViewTransform,
      targetNode: ruler,
      useParentOffset: true,
      mapPosition: position => {

        // snap to nearest snapToNearest if specified
        if ( options.snapToNearest ) {

          // x in model coordinates
          const xModel = position.x;
          position.x = Utils.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
        }

        // map withing the drag bounds, this is the same as using "dragBoundsProperty'
        return dragBoundsWithRulerHeight.closestPointTo( position );
      },
      start() {
        positionOfLastMotionSound.set( rulerPositionProperty.value );
      },
      drag() {
        const distanceFromLastMotionSoundPlay = rulerPositionProperty.value.distance( positionOfLastMotionSound );
        if ( distanceFromLastMotionSoundPlay > SOUND_PLAY_DRAG_DISTANCE ) {
          movementSoundPlayer.play();
          positionOfLastMotionSound.set( rulerPositionProperty.value );
        }

        rulerAlerter.onDrag();
      }
    } ) );

    // pdom - custom focus highlight
    const focusHighlight = new HighlightFromNode( ruler, { useLocalBounds: true } );
    this.setFocusHighlight( focusHighlight );

    const grabbedUtterance = new Utterance();
    const keyboardDragDelta = modelViewTransform.modelToViewDeltaX( options.snapToNearest );

    // supports keyboard interaction
    const keyboardDragListener = new KeyboardDragListener( {
      dragBoundsProperty: new Property( dragBoundsWithRulerHeight ),
      positionProperty: rulerPositionProperty,
      transform: modelViewTransform,
      moveOnHoldDelay: options.moveOnHoldDelay,
      moveOnHoldInterval: options.moveOnHoldInterval,
      dragDelta: 2 * keyboardDragDelta,
      shiftDragDelta: keyboardDragDelta,

      start() {

        // play a sound at the start of a drag
        movementSoundPlayer.play();
        positionOfLastMotionSound.set( rulerPositionProperty.value );
      },

      // snap to nearest snapToNearest, called on end so that dragging doesn't snap to a value for as long
      // as key is held down
      drag() {
        if ( options.snapToNearest ) {
          const xModel = rulerPositionProperty.value.x;
          const snappedX = Utils.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
          rulerPositionProperty.set( new Vector2( snappedX, rulerPositionProperty.value.y ) );
        }

        // play a sound if the ruler has been dragged for a ways without being released
        const distanceFromLastMotionSoundPlay = rulerPositionProperty.value.distance( positionOfLastMotionSound );
        if ( distanceFromLastMotionSoundPlay > SOUND_PLAY_DRAG_DISTANCE ) {
          movementSoundPlayer.play();
          positionOfLastMotionSound.set( rulerPositionProperty.value );
        }

        rulerAlerter.onDrag();
      },
      tandem: options.tandem.createTandem( 'keyboardDragListener' )
    } );

    assert && assert( !options.onGrab, 'ISLCRulerNode sets its own onGrab' );
    assert && assert( !options.onRelease, 'ISLCRulerNode sets its own onRelease' );
    assert && assert( !options.listenersWhileGrabbed, 'ISLCRulerNode sets its own listenersWhileGrabbed' );

    // the ruler's origin is the center, this offset gets the edge of it.
    const rulerAlignWithObjectXOffset = modelViewTransform.viewToModelDeltaX( RULER_WIDTH ) / 2;

    const jumpListener = new KeyboardListener( {
      keyStringProperties: HotkeyData.combineKeyStringProperties( [
        ISLCRulerNode.JUMP_HOME_HOTKEY_DATA,
        ISLCRulerNode.JUMP_CENTER_HOTKEY_DATA
      ] ),
      fire: ( event, pressedKeys ) => {
        if ( ISLCRulerNode.JUMP_CENTER_HOTKEY_DATA.hasKeyStroke( pressedKeys ) ) {
          const x = getObject1Position();
          const destinationPosition = new Vector2( x + rulerAlignWithObjectXOffset, options.modelYForCenterJump );
          if ( !rulerPositionProperty.value.equals( destinationPosition ) ) {
            rulerPositionProperty.set( destinationPosition );
            movementSoundPlayer.play();
          }

          rulerAlerter.alertJumpCenterMass();
        }
        else if ( ISLCRulerNode.JUMP_HOME_HOTKEY_DATA.hasKeyStroke( pressedKeys ) ) {
          if ( !rulerPositionProperty.value.equals( rulerPositionProperty.initialValue ) ) {
            movementSoundPlayer.play();
          }
          rulerPositionProperty.set( rulerPositionProperty.initialValue );
          this.grabDragInteraction.release();

          rulerAlerter.alertJumpHome();
        }
      }
    } );

    const grabDragInteractionOptions = merge( options.grabDragInteractionOptions, {

      // For ISLC sims, it looks nicer to have the cue above the ruler as there is usually
      // more empty space in above the ruler in the sim.
      grabCuePosition: 'top',
      grabCueOffset: new Vector2( 0, -10 ),

      onGrab: () => {
        grabRulerSoundPlayer.play();

        // call this first to update the describer state before the alert
        rulerAlerter.onGrab();

        grabbedUtterance.alert = rulerAlerter.getRulerGrabbedAlertable();
        this.alertDescriptionUtterance( grabbedUtterance );
      },

      onRelease: () => {
        releaseRulerSoundPlayer.play();
      },

      listenersWhileGrabbed: [ jumpListener ],

      tandem: options.tandem.createTandem( 'grabDragInteraction' )
    } );

    // @private - add the "grab button" interaction
    this.grabDragInteraction = new GrabDragInteraction( ruler, keyboardDragListener, interactionCueParent, grabDragInteractionOptions );

    // If you can't use mouse/touch, then you cant use keyboard either
    this.inputEnabledProperty.link( inputEnabled => {
      this.grabDragInteraction.enabled = inputEnabled;
    } );

    // pdom - the GrabDragInteraction is added to this Node but the drag handler and transform changes are applied
    // to the child RulerNode - PDOM siblings need to reposition with the RulerNode
    this.setPDOMTransformSourceNode( ruler );

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

  static JUMP_HOME_HOTKEY_DATA = new HotkeyData( {
    keyStringProperties: [ new Property( 'j+h' ) ],
    binderName: 'Jump ruler to home position',
    repoName: inverseSquareLawCommon.name
  } );

  static JUMP_CENTER_HOTKEY_DATA = new HotkeyData( {
    keyStringProperties: [ new Property( 'j+c' ) ],
    binderName: 'Jump start ruler to center position',
    repoName: inverseSquareLawCommon.name
  } );

  /**
   * @public
   */
  reset() {
    this.grabDragInteraction.reset();
  }
}

inverseSquareLawCommon.register( 'ISLCRulerNode', ISLCRulerNode );
export default ISLCRulerNode;