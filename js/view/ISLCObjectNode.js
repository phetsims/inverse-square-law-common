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
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import Utils from '../../../dot/js/Utils.js';
import Shape from '../../../kite/js/Shape.js';
import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import DragListener from '../../../scenery/js/listeners/DragListener.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import RichText from '../../../scenery/js/nodes/RichText.js';
import Color from '../../../scenery/js/util/Color.js';
import AccessibleSlider from '../../../sun/js/accessibility/AccessibleSlider.js';
import Tandem from '../../../tandem/js/Tandem.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import ISLCConstants from '../ISLCConstants.js';
import DefaultDirection from './DefaultDirection.js';
import PositionDescriber from './describers/PositionDescriber.js';
import ISLCAlertManager from './ISLCAlertManager.js';
import ISLCForceArrowNode from './ISLCForceArrowNode.js';
import ISLCObjectEnum from './ISLCObjectEnum.js';
import ISLCA11yStrings from '../ISLCA11yStrings.js';
import ISLCPullerNode from './ISLCPullerNode.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';

// a11y strings
const verboseMassInteractionHintPatternString = ISLCA11yStrings.verboseMassInteractionHintPattern.value;
const briefMassInteractionHintPatternString = ISLCA11yStrings.briefMassInteractionHintPattern.value;
const positionChangePatternString = ISLCA11yStrings.positionChangePattern.value;

// constants
const NEGATIVE_FILL = new Color( '#66f' );
const POSITIVE_FILL = new Color( '#f66' );
const ZERO_FILL = new Color( 'gray' );

const LABEL_MAX_WIDTH = 50; // empirically determined through testing with long strings
const LABEL_CENTER_X = 0;

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
 * @constructor
 */
function ISLCObjectNode( model, object, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, config ) {

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

    // {null|ShapeHitDetector} a11y, hit detector for the view for the Pointer, to support prototype self voicing features
    shapeHitDetector: null,
    objectColor: null, // {{string}} @required - description of sphere for self-voicing content

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

  Node.call( this, {
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

  // PROTOTYPE a11y code for self-voicing features
  if ( config.shapeHitDetector ) {
    config.shapeHitDetector.addNode( this.arrowNode );
    config.shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
      if ( hitTarget === this.arrowNode ) {
        if ( webSpeaker.exploreModeProperty.get() ) {
          const utterance = forceDescriber.getForceVectorMagnitudeText( config.label, config.otherObjectLabel );
          webSpeaker.speak( utterance );
        }
      }
    } );
  }

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

  // PROTOTYPE a11y code, to support self-voicing features
  if ( config.shapeHitDetector ) {
    assert && assert( config.objectColor, 'required param, if testing self voicing features' );
    config.shapeHitDetector.addNode( this.objectCircle );
    config.shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
      if ( hitTarget === this.objectCircle ) {
        if ( webSpeaker.exploreModeProperty.get() ) {
          const patternString = webSpeaker.getExploreModeVerbose() ? verboseMassInteractionHintPatternString : briefMassInteractionHintPatternString;
          webSpeaker.speak( StringUtils.fillIn( patternString, {
            objectLabel: config.label,
            objectColor: config.objectColor
          } ) );
        }
      }
    } );
  }

  this.dragNode.addChild( this.pullerNode );
  this.dragNode.addChild( this.objectCircle );

  // @public - for ruler regions
  // Small black dot where vertical arrow line connects to the object
  this.centerPoint = new Circle( 2, { fill: '#000' } );
  this.dragNode.addChild( this.centerPoint );

  this.labelText = new RichText( config.label, config.labelOptions );

  this.dragNode.addChild( this.labelText );
  this.labelText.on( 'bounds', () => {
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
  this.dragNode.addInputListener( new DragListener( {
    allowTouchSnag: true,
    start: event => {
      clickOffset = this.dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
      object.isDragging = true;

      oldPosition = object.positionProperty.get();
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
    },
    end: () => {
      object.isDragging = false;

      // SELF VOICING PROTOTYPE - when ending drag, speak the result of the interaction
      if ( webSpeaker.interactiveModeProperty.get() ) {
        webSpeaker.speak( this.getSelfVoicingPositionChangeAlert( object.positionProperty.get(), oldPosition ) );
      }
    },
    tandem: config.tandem.createTandem( 'dragListener' )
  } ) );

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
    a11yMapValue: value => Utils.toFixedNumber( value, 1 ),
    constrainValue: value => {
      const numberOfDecimalPlaces = Utils.numberOfDecimalPlaces( config.snapToNearest );
      return Utils.toFixedNumber( value, numberOfDecimalPlaces );
    },
    startDrag: () => {
      object.isDragging = true;
      oldPosition = object.positionProperty.get();
    },
    endDrag: () => {
      object.isDragging = false;
      this.redrawForce();

      // SELF VOICING PROTOTYPE - when ending drag, speak the result of the interaction
      if ( webSpeaker.interactiveModeProperty.get() ) {
        webSpeaker.speak( this.getSelfVoicingPositionChangeAlert( object.positionProperty.get(), oldPosition ) );
      }
    },
    a11yCreateValueChangeAlert: () => {
      const newPosition = object.positionProperty.get();
      const positionChanged = newPosition !== oldPosition;
      return positionChanged ? forceDescriber.getVectorChangeText( object ) : forceDescriber.getPositionUnchangedAlertText( object );
    },
    a11yCreateAriaValueText: positionDescriber.getPositionAriaValueTextCreator( this.enum ),

    // This object's PDOM description also depends on the position of the other object, so include it here.
    a11yDependencies: config.additionalA11yDependencies.concat( object === model.object1 ?
      [ model.object2.positionProperty ] : [ model.object1.positionProperty ] )
  };

  // a11y - initialize the accessible slider, which makes this Node act like an accessible range input
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
 * Helper function to get a color based the force value
 *
 * @param {number} forceValue
 * @returns {Color}
 */
function getUpdatedFill( forceValue ) {

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
}

inverseSquareLawCommon.register( 'ISLCObjectNode', ISLCObjectNode );

inherit( Node, ISLCObjectNode, {

  /**
   * Redraws the white radial gradient for the object - must be implemented in subtypes.
   *
   * @public
   * @abstract
   */
  updateGradient: function() {
    throw new Error( 'Update gradient must be implemented in subtypes.' );
  },

  /**
   * Sets whether or not the readouts above the arrows use scientific notation in their display of the value.
   *
   * @public
   * @param {boolean} useScientificNotation
   */
  setReadoutsInScientificNotation: function( useScientificNotation ) {
    this.arrowNode.scientificNotationMode = useScientificNotation;

    // redraw the force after updating
    this.redrawForce();
  },

  /**
   * Updates the radius, arrow length & direction, force readout, and the visible puller image.
   *
   * @public
   */
  redrawForce: function() {
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
  },

  getSelfVoicingPositionChangeAlert( newPosition, oldPosition ) {
    const vectorChangeText = newPosition !== oldPosition ? this.forceDescriber.getVectorChangeText( this.objectModel ) : this.forceDescriber.getPositionUnchangedAlertText( this.objectModel );

    return StringUtils.fillIn( positionChangePatternString, {
      valueText: this.getAriaValueText(),
      vectorText: vectorChangeText
    } );
  },

  /**
   * @public
   */
  reset: function() {
    this.resetAccessibleSlider();
  }
} );

// mix in accessibility features, this Node behaves like a range input
AccessibleSlider.mixInto( ISLCObjectNode );

export default ISLCObjectNode;