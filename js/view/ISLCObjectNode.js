// Copyright 2017-2019, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const AccessibleSlider = require( 'SUN/accessibility/AccessibleSlider' );
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Color = require( 'SCENERY/util/Color' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const ISLCForceArrowNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCForceArrowNode' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCPullerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPullerNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const Range = require( 'DOT/Range' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const Shape = require( 'KITE/Shape' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );

  // constants
  const LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings
  const ARROW_OPTION_KEYS = [
    'defaultDirection',
    'attractNegative', // if true, arrows will point towards each other if forces is negative
    'arrowNodeLineWidth',

    // label options
    'otherObjectLabel', // label for the other object exerting a force on this object
    'label', // label for this object
    'arrowLabelFont',
    'arrowLabelFill',
    'arrowLabelStroke',
    'forceReadoutDecimalPlaces', // number of decimal places in force readout

    // arrow node arguments
    'forceArrowHeight',

    // arrow node options
    'maxArrowWidth', // max width of the arrow when when redrawn, in view coordinates - used in mapping function
    'headHeight',
    'headWidth',
    'tailWidth',
    'arrowStroke',
    'arrowFill'
  ];
  const PULLER_OPTION_KEYS = [
    'ropeLength',
    'shadowMinWidth',
    'shadowMaxWidth',
    'attractNegative',
    'displayShadow',
    'atomicScale'
  ];

  const NEGATIVE_FILL = new Color( '#66f' );
  const POSITIVE_FILL = new Color( '#f66' );
  const ZERO_FILL = new Color( 'gray' );

  /**
   * @param {ISLCModel} model - the simulation model
   * @param {ISLCObject} object - the associated object's model within the sim
   * @param {Bounds2} layoutBounds - bounds of the screen view containing the object
   * @param {ModelViewTransform2} modelViewTransform
   * @param {ISLCAlertManager} alertManager
   * @param {PositionDescriber} positionDescriber
   * @param {Object} config
   * @mixes AccessibleSlider
   * @constructor
   */
  function ISLCObjectNode( model, object, layoutBounds, modelViewTransform, alertManager, positionDescriber, config ) {

    config = _.extend( {
      label: null, // {string} @required
      otherObjectLabel: null, // {string} @required
      defaultDirection: 'left',

      attractNegative: false,
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout
      snapToNearest: null, // {number} if present, object node will snap to the nearest snapToNearest value on drag
      stepSize: null, // {number} step size when moving the object keyboard. By default based on snapToNearest, see below.

      // options for the label, in the lower center of the sphere
      labelFill: '#fff',
      labelFont: new PhetFont( 12 ),
      labelMaxWidth: LABEL_MAX_WIDTH,

      // options for the label 'shadow' that helps the label show up when the object is roughly the same color
      // as the label
      labelShadowFill: '#000',
      labelShadowOffsetX: 0.5,
      labelShadowOffsetY: 0.5,

      // options for the arrow node, passed to the ISLCForceArrowNode
      arrowLabelFill: '#fff',

      arrowColor: '#66f', // color of vertical line
      arrowFill: 'white',
      y: 250,
      forceArrowHeight: 150, // height of arrow in view coordinates

      arrowHeadHeight: 8,
      arrowHeadWidth: 8,
      arrowTailWidth: 3,
      arrowStroke: null,

      tandem: Tandem.required,

      // {Property[]} - Properties that need to be monitored to successfully update this Node's PDOM descriptions
      additionalA11yDependencies: []
    }, config );

    const tandem = config.tandem;

    // use snapToNearest if stepSize is not provided
    if ( config.stepSize === null ) {
      assert && assert( config.snapToNearest );
      config.stepSize = config.snapToNearest * 2;
    }

    assert && assert( config.label, 'required param' );
    assert && assert( config.otherObjectLabel, 'required param' );
    assert && assert( alertManager instanceof ISLCAlertManager );

    Node.call( this, {
      containerTagName: 'div',
      tandem: tandem
    } );

    const pullForceRange = new Range( model.getMinForce(), model.getMaxForce() );

    this.accessibleName = PositionDescriber.getObjectLabelPositionText( config.label );

    // @protected
    this.layoutBounds = layoutBounds;
    this.objectModel = object;
    this.model = model; // used in abstract method implementations by children.
    this.modelViewTransform = modelViewTransform;

    // @public - which object this instance is (one or two)
    this.enum = object === model.object1 ? ISLCObjectEnum.OBJECT_ONE : ISLCObjectEnum.OBJECT_TWO;

    // the full range of force for the arrow node (note: this is distinct)
    const arrowForceRange = new Range( model.getMinForce(), model.getMaxForce() );

    // @protected - arrow node
    this.arrowNode = new ISLCForceArrowNode(
      arrowForceRange,
      layoutBounds,
      _.extend( {
        tandem: tandem.createTandem( 'forceArrowNode' )
      }, _.pick( config, ARROW_OPTION_KEYS ) )
    );

    // set y position for the arrow
    this.arrowNode.y = config.y - config.forceArrowHeight;

    // @private - the puller node
    this.pullerNode = new ISLCPullerNode(
      pullForceRange,
      tandem.createTandem( 'pullerNode' ),
      _.pick( config, PULLER_OPTION_KEYS )
    );

    if ( config.defaultDirection === 'right' ) {
      this.pullerNode.scale( -1, 1 );
    }

    // @protected - a parent node that applies the drag handler
    this.dragNode = new Node( {
      cursor: 'pointer',
      tandem: tandem.createTandem( 'dragNode' )
    } );

    // the 'object' - a shaded circle
    const radius = modelViewTransform.modelToViewDeltaX( object.radiusProperty.get() );

    // @protected - the object
    this.objectCircle = new Circle( radius );

    this.dragNode.addChild( this.pullerNode );
    this.dragNode.addChild( this.objectCircle );

    // Small black dot where vertical arrow line connects to the object
    this.dragNode.addChild( new Circle( 2, { fill: '#000' } ) );

    const labelCenterX = 0;
    const labelTop = 4;

    // add the label shadow, added first so that the 'shadow' appears under the label text
    this.dragNode.addChild( new RichText( config.label, {
      font: config.labelFont,
      fill: config.labelShadowFill,
      pickable: false,
      maxWidth: config.labelMaxWidth,
      centerX: labelCenterX + config.labelShadowOffsetX,
      top: labelTop + config.labelShadowOffsetY,
      tandem: tandem.createTandem( 'labelShadowNode' )
    } ) );

    // add the label
    this.dragNode.addChild( new RichText( config.label, {
      font: config.labelFont,
      fill: config.labelFill,
      pickable: false,
      maxWidth: config.labelMaxWidth,
      centerX: labelCenterX,
      top: labelTop,
      tandem: tandem.createTandem( 'labelNode' )
    } ) );

    this.addChild( this.dragNode );

    // @private
    this.y = config.y;

    // the marker line, connecting the arrow to the object, the first one is for the shadow so that
    // it is visible on top of the object
    const markerLineShape = new Shape();
    markerLineShape.moveTo( 0, -4 );
    markerLineShape.lineTo( 0, -config.forceArrowHeight );
    this.addChild( new Path( markerLineShape, {
      stroke: '#FFF',
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      x: 0.5,
      y: 0.5,
      tandem: tandem.createTandem( 'markerLineShadow' )
    } ) );
    const markerLineShapeTop = new Path( markerLineShape, {
      stroke: config.arrowColor,
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      tandem: tandem.createTandem( 'markerLine' )
    } );
    this.addChild( markerLineShapeTop );

    let clickOffset;

    this.dragNode.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,
      start: event => {
        clickOffset = this.dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        object.isDragging = true;
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
      end: () => { object.isDragging = false; },
      tandem: tandem.createTandem( 'dragHandler' )
    } ) );

    const boundRedrawForce = this.redrawForce.bind( this );
    model.forceValuesProperty.lazyLink( boundRedrawForce );
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

    let oldPosition = object.positionProperty.get();
    const accessibleSliderOptions = {
      keyboardStep: config.stepSize,
      shiftKeyboardStep: config.snapToNearest,
      pageKeyboardStep: config.stepSize * 2,
      a11yDecimalPlaces: 1,
      constrainValue: value => {
        const numberOfDecimalPlaces = Util.numberOfDecimalPlaces( config.snapToNearest );
        return Util.toFixedNumber( value, numberOfDecimalPlaces );
      },
      startDrag: () => {
        object.isDragging = true;
        oldPosition = object.positionProperty.get();
      },
      endDrag: () => {
        object.isDragging = false;
        this.redrawForce();

      },
      a11yCreateValueChangeAlert: () => {
        const newPosition = object.positionProperty.get();
        const positionChanged = newPosition !== oldPosition;
        return positionChanged ? alertManager.alertPositionChanged( object ) : alertManager.alertPositionUnchanged( object );
      },
      a11yCreateValueChangeAriaValueText: positionDescriber.getPositionAriaValueTextCreator( this.enum ),

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

      // set the scale of the arrow based on the model value
      this.arrowNode.redrawArrow( this.model.forceProperty.get() );

      // update the arrow label - always display the force as a positive magnitude
      this.arrowNode.updateLabel( Math.abs( this.model.forceProperty.get() ), this.model.forceValuesProperty.get() );

      // set the text position, positioning the center relative to the parent coordinate frame
      this.arrowNode.setArrowTextPosition( this.parentToLocalBounds( this.layoutBounds ) );

      // update puller node visibility
      this.pullerNode.setPull( this.model.forceProperty.get(), this.objectCircle.width / 2 );
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

  return ISLCObjectNode;
} );
