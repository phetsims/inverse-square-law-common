// Copyright 2017-2020, University of Colorado Boulder

/**
 * A common type for object views in sims that use inverse-square-law-common. The objects have a shaded sphere with a
 * puller/pusher robot attached that updates based on the model object values.  This node also manages an
 * arrow with a label that represents the force.  This arrow is NOT added as a child of this node, but is
 * intended to be added in the screen view for layering purposes.  The arrow and its label need to be above
 * both ISLCObjectNodes in the screen view.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import Range from '../../../dot/js/Range.js';
import Utils from '../../../dot/js/Utils.js';
import Shape from '../../../kite/js/Shape.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import VoicingInputListener from '../../../scenery-phet/js/accessibility/speaker/VoicingInputListener.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import sceneryPhetStrings from '../../../scenery-phet/js/sceneryPhetStrings.js';
import voicingUtteranceQueue from '../../../scenery/js/accessibility/speaker/voicingUtteranceQueue.js';
import DragListener from '../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import RichText from '../../../scenery/js/nodes/RichText.js';
import Color from '../../../scenery/js/util/Color.js';
import AccessibleSlider from '../../../sun/js/accessibility/AccessibleSlider.js';
import Tandem from '../../../tandem/js/Tandem.js';
import VoicingUtterance from '../../../utterance-queue/js/VoicingUtterance.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import inverseSquareLawCommonStrings from '../inverseSquareLawCommonStrings.js';
import ISLCConstants from '../ISLCConstants.js';
import DefaultDirection from './DefaultDirection.js';
import PositionDescriber from './describers/PositionDescriber.js';
import ISLCAlertManager from './ISLCAlertManager.js';
import ISLCForceArrowNode from './ISLCForceArrowNode.js';
import ISLCObjectEnum from './ISLCObjectEnum.js';
import ISLCPullerNode from './ISLCPullerNode.js';

// constants
const voicingLevelsMoveSpheresHintString = inverseSquareLawCommonStrings.a11y.voicing.levels.moveSpheresHintString;
const grabbedString = sceneryPhetStrings.a11y.voicing.grabbedAlert;

const NEGATIVE_FILL = new Color( '#66f' );
const POSITIVE_FILL = new Color( '#f66' );
const ZERO_FILL = new Color( 'gray' );

const LABEL_MAX_WIDTH = 50; // empirically determined through testing with long strings
const LABEL_CENTER_X = 0;

class ISLCObjectNode extends Node {

  /**
   * @param {ISLCModel} model - the simulation model
   * @param {ISLCObject} object - the associated object's model within the sim
   * @param {Bounds2} layoutBounds - bounds of the screen view containing the object
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ISLCAlertManager} alertManager
   * @param {ForceDescriber} forceDescriber
   * @param {PositionDescriber} positionDescriber
   * @param {Object} config
   * @mixes AccessibleSlider
   */
  constructor( model, object, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, config ) {

    config = merge( {
      label: null, // {string} @required
      otherObjectLabel: null, // {string} @required
      defaultDirection: DefaultDirection.LEFT,

      // {boolean} - if true, arrows will point towards each other if forces is negative. Used by the puller and arrow nodes
      attractNegative: false,
      snapToNearest: null, // {number} if present, object node will snap to the nearest snapToNearest value on drag
      stepSize: null, // {number} step size when moving the object keyboard. By default based on snapToNearest, see below.

      arrowColor: '#66f', // color of vertical line
      y: 250,

      forceArrowHeight: 150, // height of arrow in view coordinates

      objectColor: null, // {{string}} @required - description of sphere for voicing content

      // phet-io
      tandem: Tandem.REQUIRED,

      // {Property[]} - Properties that need to be monitored to successfully update this Node's PDOM descriptions
      additionalA11yDependencies: []
    }, config );

    // separate call because of the use of a config value from the above defaults
    config = merge( {

      // options passed to ISLCForceArrowNode, filled in below
      arrowNodeOptions: {
        attractNegative: config.attractNegative,
        defaultDirection: config.defaultDirection,
        forceArrowHeight: config.forceArrowHeight,
        forceReadoutDecimalPlaces: ISLCConstants.DECIMAL_NOTATION_PRECISION // number of decimal places in force readout
      },

      // options for the RichText label on the object circle
      labelOptions: {
        fill: 'black',
        font: new PhetFont( { size: 12 } ),

        pickable: false,
        maxWidth: LABEL_MAX_WIDTH,
        centerX: LABEL_CENTER_X,

        tandem: config.tandem.createTandem( 'labelText' )
      },

      // options passed to the PullerNode, filled in below
      pullerNodeOptions: {
        attractNegative: config.attractNegative
      }
    }, config );

    // use snapToNearest if stepSize is not provided
    if ( config.stepSize === null ) {
      assert && assert( config.snapToNearest, 'snapToNearest is required if stepSize is not provided.' );
      config.stepSize = config.snapToNearest * 2;
    }

    assert && assert( config.label, 'required param' );
    assert && assert( config.otherObjectLabel, 'required param' );
    assert && assert( alertManager instanceof ISLCAlertManager );

    super( {
      containerTagName: 'div',
      tandem: config.tandem
    } );

    this.accessibleName = PositionDescriber.getObjectLabelPositionText( config.label );

    // @protected
    this.layoutBounds = layoutBounds;
    this.objectModel = object;
    this.model = model; // used in abstract method implementations by children.
    this.modelViewTransform = modelViewTransform;

    // @private
    this.forceDescriber = forceDescriber;

    // @public - which object this instance is (one or two)
    this.enum = object === model.object1 ? ISLCObjectEnum.OBJECT_ONE : ISLCObjectEnum.OBJECT_TWO;

    // the full range of force for the arrow node (note: this is distinct)
    const arrowForceRange = new Range( model.getMinForceMagnitude(), model.getMaxForce() );

    // @protected - arrow node
    this.arrowNode = new ISLCForceArrowNode(
      arrowForceRange,
      layoutBounds,
      config.label,
      config.otherObjectLabel,
      config.tandem.createTandem( 'forceDisplayNode' ),
      config.arrowNodeOptions
    );

    // set y position for the arrow
    this.arrowNode.y = config.y - config.forceArrowHeight;

    // @private - the puller node
    this.pullerNode = new ISLCPullerNode(
      new Range( model.getMinForce(), model.getMaxForce() ),
      config.pullerNodeOptions
    );

    if ( config.defaultDirection === DefaultDirection.RIGHT ) {
      this.pullerNode.scale( -1, 1 );
    }

    // @protected - a parent node that applies the drag handler
    this.dragNode = new Node( {
      cursor: 'pointer'
    } );

    // the 'object' - a shaded circle
    const radius = modelViewTransform.modelToViewDeltaX( object.radiusProperty.get() );

    // @protected - the object
    this.objectCircle = new Circle( radius );

    // PROTOTYPE a11y code, to support voicing features
    if ( phet.chipper.queryParameters.supportsVoicing ) {
      assert && assert( config.objectColor, 'required param, if testing voicing features' );

      this.addInputListener( new VoicingInputListener( {
        onFocusIn: () => {

          // special behavior if the hit is from a keyboard
          const interactionHint = voicingLevelsMoveSpheresHintString;
          const objectResponse = positionDescriber.getVoicingDistanceDescription( config.label, config.otherObjectLabel );

          if ( phet.chipper.queryParameters.supportsVoicing ) {
            const response = levelSpeakerModel.collectResponses( objectResponse, null, interactionHint );
            voicingUtteranceQueue.addToBack( response );
          }
        },
        highlightTarget: this
      } ) );
    }

    this.dragNode.addChild( this.pullerNode );
    this.dragNode.addChild( this.objectCircle );

    // @public - for ruler regions
    // Small black dot where vertical arrow line connects to the object
    this.centerPoint = new Circle( 2, { fill: '#000' } );
    this.dragNode.addChild( this.centerPoint );

    this.labelText = new RichText( config.label, config.labelOptions );

    this.dragNode.addChild( this.labelText );
    this.labelText.boundsProperty.lazyLink( () => {
      this.labelText.centerX = this.objectCircle.centerX;
    } );

    this.addChild( this.dragNode );

    // @private
    this.y = config.y; // TODO: is this needed?

    // Added for PhET-iO as a way to hide the dashed lines.
    const centerOfMassLineNode = new Node( { tandem: config.tandem.createTandem( 'centerOfMassLineNode' ) } );
    this.addChild( centerOfMassLineNode );

    // The marker line, connecting the arrow to the object. The first one is for the shadow so that
    // it is visible on top of the object
    const markerLineShape = new Shape();
    markerLineShape.moveTo( 0, -4 );
    markerLineShape.lineTo( 0, -config.forceArrowHeight );
    centerOfMassLineNode.addChild( new Path( markerLineShape, {
      stroke: '#FFF',
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      x: 0.5,
      y: 0.5
    } ) );
    const markerLineShapeTop = new Path( markerLineShape, {
      stroke: config.arrowColor,
      lineDash: [ 4, 4 ],
      lineWidth: 2
    } );
    centerOfMassLineNode.addChild( markerLineShapeTop );

    let clickOffset;

    let oldPosition = object.positionProperty.get();
    let previousSeparation = model.separationProperty.get();

    // reusable utterance to prevent a pile-up of alerts while the object moves
    const separationUtterance = new VoicingUtterance();

    // @public - so that events can be forwarded to this DragListener in the
    // case of alternative input
    const voicingDragUtterance = new VoicingUtterance( {
      alertStableDelay: 500,
      alertMaximumDelay: 1000,
      cancelOther: false
    } );
    this.dragListener = new DragListener( {
      allowTouchSnag: true,
      start: event => {
        clickOffset = this.dragNode.globalToParentPoint( event.pointer.point ).x - event.target.x;
        object.isDraggingProperty.value = true;

        oldPosition = object.positionProperty.get();

        if ( phet.chipper.queryParameters.supportsVoicing ) {

          // the initial dragging alert does not use the utterance because it must be assertive and
          // should interrupt any other utterance being spoken
          // special behavior if the hit is from a keyboard
          const interactionHint = voicingLevelsMoveSpheresHintString;
          const distanceDescription = positionDescriber.getVoicingDistanceDescription( config.label, config.otherObjectLabel );

          const objectResponse = StringUtils.fillIn( '{{grabbed}}. {{response}}', {
            grabbed: grabbedString,
            response: distanceDescription
          } );

          const response = levelSpeakerModel.collectResponses( objectResponse, null, interactionHint );
          const dragStartUtterance = new VoicingUtterance( {
            alert: response
          } );
          voicingUtteranceQueue.addToBack( dragStartUtterance );
        }
      },
      drag: event => {

        // drag position relative to the pointer pointer start position and convert to model coordinates
        let x = modelViewTransform.viewToModelX( this.globalToParentPoint( event.pointer.point ).x - clickOffset );

        // absolute drag bounds based on model
        // see method descriptions for details
        const xMax = model.getObjectMaxPosition( object );
        const xMin = model.getObjectMinPosition( object );

        // apply limitations and update position
        x = Math.max( Math.min( x, xMax ), xMin ); // limited value of x (by boundary) in model coordinates

        // snapToGrid method dynamically checks whether to snap or not
        object.positionProperty.set( model.snapToGrid( x ) );

        if ( phet.chipper.queryParameters.supportsVoicing ) {
          const distanceDescription = positionDescriber.getVoicingDistanceDescriptionWithoutLabel( config.otherObjectLabel );

          // only speak something if the positions have changed during drag
          if ( oldPosition !== object.positionProperty.get() ) {
            const forceChangeText = this.forceDescriber.getVectorChangeText( this.objectModel );

            if ( model.separationProperty.get() < previousSeparation ) {
              separationUtterance.alert = 'Closer';
            }
            else {
              separationUtterance.alert = 'Farther away';
            }

            voicingUtteranceQueue.addToBack( separationUtterance );
            previousSeparation = model.separationProperty.get();
            oldPosition = object.positionProperty.get();

            voicingDragUtterance.alert = levelSpeakerModel.collectResponses( distanceDescription, forceChangeText );
            voicingUtteranceQueue.addToBack( voicingDragUtterance );
          }
        }
      },
      end: () => {
        object.isDraggingProperty.value = false;
      },
      tandem: config.tandem.createTandem( 'dragListener' )
    } );
    this.dragNode.addInputListener( this.dragListener );

    const boundRedrawForce = this.redrawForce.bind( this );
    model.showForceValuesProperty.lazyLink( boundRedrawForce );
    object.radiusProperty.lazyLink( boundRedrawForce );
    object.valueProperty.lazyLink( boundRedrawForce );
    model.forceProperty.lazyLink( boundRedrawForce );

    object.baseColorProperty.link( baseColor => {
      this.updateGradient( baseColor );
      if ( config.attractNegative ) {
        markerLineShapeTop.stroke = getUpdatedFill( object.valueProperty.get() );
      }
    } );

    // on reset, no objects are destroyed and properties are set to initial values
    // no need to dispose of any of the below listeners
    object.positionProperty.link( property => {

      // position this node and its force arrow with label
      const transformedValue = modelViewTransform.modelToViewX( property );
      this.x = transformedValue;
      this.arrowNode.x = transformedValue;
      this.redrawForce();
    } );

    const accessibleSliderOptions = {
      keyboardStep: config.stepSize,
      shiftKeyboardStep: config.snapToNearest,
      pageKeyboardStep: config.stepSize * 2,
      a11yMapPDOMValue: value => Utils.toFixedNumber( value, 1 ),
      constrainValue: value => {
        const numberOfDecimalPlaces = Utils.numberOfDecimalPlaces( config.snapToNearest );
        return Utils.toFixedNumber( value, numberOfDecimalPlaces );
      },
      startDrag: () => {
        object.isDraggingProperty.value = true;
        oldPosition = object.positionProperty.get();
      },
      endDrag: () => {
        object.isDraggingProperty.value = false;
        this.redrawForce();

        const distanceDescription = positionDescriber.getVoicingDistanceDescriptionWithoutLabel( config.otherObjectLabel );

        // only speak force change if it has changed
        let forceChangeText = '';
        if ( oldPosition !== object.positionProperty.get() ) {
          forceChangeText = this.forceDescriber.getVectorChangeText( this.objectModel );
        }

        if ( phet.chipper.queryParameters.supportsVoicing ) {
          const response = levelSpeakerModel.collectResponses( distanceDescription, forceChangeText );
          voicingUtteranceQueue.addToBack( response );
        }
      },
      a11yCreateContextResponseAlert: () => {
        const newPosition = object.positionProperty.get();
        const positionChanged = newPosition !== oldPosition;
        return positionChanged ? forceDescriber.getVectorChangeText( object ) : forceDescriber.getPositionUnchangedAlertText( object );
      },
      a11yCreateAriaValueText: positionDescriber.getPositionAriaValueTextCreator( this.enum ),

      // This object's PDOM description also depends on the position of the other object, so include it here.
      a11yDependencies: config.additionalA11yDependencies.concat( object === model.object1 ?
        [ model.object2.positionProperty ] : [ model.object1.positionProperty ] )
    };

    // pdom - initialize the accessible slider, which makes this Node act like an accessible range input
    this.initializeAccessibleSlider(
      object.positionProperty,
      object.enabledRangeProperty,
      new BooleanProperty( true ), // always enabled
      accessibleSliderOptions
    );

    // for layering purposes, we assume that the ScreenView will add the arrow node and label - by the
    // time the sim is stepped, make sure that the arrows are added to the view
    if ( assert ) {
      const checkForArrowAdded = () => {
        if ( this.arrowNode.parents.length === 0 ) {
          throw new Error( 'ArrowNode should be added to the view in inverse-square-law-common sim screen view' );
        }

        // no need to keep checking
        model.stepEmitter.removeListener( checkForArrowAdded );
      };
      model.stepEmitter.addListener( checkForArrowAdded );
    }
  }


  /**
   * Redraws the white radial gradient for the object - must be implemented in subtypes.
   *
   * @public
   * @abstract
   */
  updateGradient() {
    throw new Error( 'Update gradient must be implemented in subtypes.' );
  }

  /**
   * Sets whether or not the readouts above the arrows use scientific notation in their display of the value.
   *
   * @public
   * @param {boolean} useScientificNotation
   */
  setReadoutsInScientificNotation( useScientificNotation ) {
    this.arrowNode.scientificNotationMode = useScientificNotation;

    // redraw the force after updating
    this.redrawForce();
  }

  /**
   * Updates the radius, arrow length & direction, force readout, and the visible puller image.
   *
   * @public
   */
  redrawForce() {
    this.objectCircle.setRadius( this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() ) );
    this.updateGradient( this.objectModel.baseColorProperty.get() );

    // set the labelText to be right below the circle
    this.labelText.top = this.objectCircle.bottom + +1;

    // set the scale of the arrow based on the model value
    this.arrowNode.redrawArrow( this.model.forceProperty.get() );

    // update the arrow label - always display the force as a positive magnitude
    this.arrowNode.updateLabel( Math.abs( this.model.forceProperty.get() ), this.model.showForceValuesProperty.get() );

    // set the text position, positioning the center relative to the parent coordinate frame
    this.arrowNode.setArrowTextPosition( this.parentToLocalBounds( this.layoutBounds ) );

    // update puller node visibility
    this.pullerNode.setPull( this.model.forceProperty.get(), this.objectCircle.width / 2 );
  }

  /**
   * @public
   */
  reset() {
    this.resetAccessibleSlider();
  }
}

/**
 * Helper function to get a color based the force value
 *
 * @param {number} forceValue
 * @returns {Color}
 */
const getUpdatedFill = forceValue => {

  let fill;
  if ( forceValue < 0 ) {
    fill = NEGATIVE_FILL;
  }
  else if ( forceValue > 0 ) {
    fill = POSITIVE_FILL;
  }
  else {
    fill = ZERO_FILL;
  }

  return fill;
};

inverseSquareLawCommon.register( 'ISLCObjectNode', ISLCObjectNode );

// mix in accessibility features, this Node behaves like a range input
AccessibleSlider.mixInto( ISLCObjectNode );

export default ISLCObjectNode;