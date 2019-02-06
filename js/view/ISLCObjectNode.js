// Copyright 2017-2018, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var AccessibleSlider = require( 'SUN/accessibility/AccessibleSlider' );
  var Color = require( 'SCENERY/util/Color' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  var ISLCForceArrowNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCForceArrowNode' );
  var ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  var ISLCPullerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPullerNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  var Range = require( 'DOT/Range' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Util = require( 'DOT/Util' );

  // phetio
  var BooleanProperty = require( 'AXON/BooleanProperty' );

  // constants
  var LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings
  var ARROW_OPTION_KEYS = [
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
  var PULLER_OPTION_KEYS = [
    'ropeLength',
    'shadowMinWidth',
    'shadowMaxWidth',
    'attractNegative',
    'displayShadow',
    'atomicScale'
  ];

  var NEGATIVE_FILL = new Color( '#66f' );
  var POSITIVE_FILL = new Color( '#f66' );
  var ZERO_FILL = new Color( 'gray' );

  /**
   * @param {ISLCModel} model - the simulation model
   * @param {ISLCObject} object - the associated object's model within the sim
   * @param {Bounds2} layoutBounds - bounds of the screen view containing the object
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Range} pullForceRange - empirically determined range of force values (usu. min/max) for puller image mapping
   * @param {Object} options
   * @mixes AccessibleSlider
   * @constructor
   */
  function ISLCObjectNode( model, object, layoutBounds, modelViewTransform, pullForceRange, options ) {

    var self = this;

    options = _.extend( {
      label: 'This Object',
      otherObjectLabel: 'Other Object',
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

      tandem: Tandem.required
    }, options );

    var tandem = options.tandem;

    // use snapToNearest if stepSize is not provided
    if ( options.stepSize === null ) {
      assert && assert( options.snapToNearest );
      options.stepSize = options.snapToNearest * 2;
    }

    Node.call( this, {
      containerTagName: 'div',
      tandem: tandem
    } );

    // A11Y DRAFT
    // assert && assert( options.createAriaValueText, 'ISLCObjectNode subtypes must define an aria-valuetext creation function' );
    this.accessibleName = PositionDescriber.getObjectLabelPositionText( options.label );
    var positionDescriber = PositionDescriber.getDescriber();
    var alertManager = ISLCAlertManager.getManager();

    // @protected
    this.layoutBounds = layoutBounds;
    this.objectModel = object;
    this.model = model;
    this.modelViewTransform = modelViewTransform;

    // @public - which object this instance is (one or two)
    this.enum = object === model.object1 ? ISLCObjectEnum.OBJECT_ONE : ISLCObjectEnum.OBJECT_TWO;

    // the full range of force for the arrow node (note: this is distinct)
    var arrowForceRange = new Range( model.getMinForce(), model.getMaxForce() );

    // @protected - arrow node
    this.arrowNode = new ISLCForceArrowNode(
      arrowForceRange,
      layoutBounds,
      _.extend( {
        tandem: tandem.createTandem( 'forceArrowNode' )
      }, _.pick( options, ARROW_OPTION_KEYS ) )
    );

    // set y position for the arrow
    this.arrowNode.y = options.y - options.forceArrowHeight;


    // @private - the puller node
    this.pullerNode = new ISLCPullerNode(
      pullForceRange,
      tandem.createTandem( 'pullerNode' ),
      _.pick( options, PULLER_OPTION_KEYS )
    );

    if ( options.defaultDirection === 'right' ) {
      this.pullerNode.scale( -1, 1 );
    }

    // a parent node that applies the drag handler
    var dragNode = new Node( {
      cursor: 'pointer',
      tandem: tandem.createTandem( 'dragNode' )
    } );

    // the 'object' - a shaded circle
    var radius = modelViewTransform.modelToViewDeltaX( object.radiusProperty.get() );

    // @protected - the object
    this.objectCircle = new Circle( radius );

    dragNode.addChild( this.pullerNode );
    dragNode.addChild( this.objectCircle );

    // Small black dot where vertical arrow line connects to the object
    dragNode.addChild( new Circle( 2, { fill: '#000' } ) );

    var labelCenterX = 0;
    var labelTop = 4;

    // add the label shadow, added first so that the 'shadow' appears under the label text
    dragNode.addChild( new RichText( options.label, {
      font: options.labelFont,
      fill: options.labelShadowFill,
      pickable: false,
      maxWidth: options.labelMaxWidth,
      centerX: labelCenterX + options.labelShadowOffsetX,
      top: labelTop + options.labelShadowOffsetY,
      tandem: tandem.createTandem( 'labelShadowNode' )
    } ) );

    // add the label
    dragNode.addChild( new RichText( options.label, {
      font: options.labelFont,
      fill: options.labelFill,
      pickable: false,
      maxWidth: options.labelMaxWidth,
      centerX: labelCenterX,
      top: labelTop,
      tandem: tandem.createTandem( 'labelNode' )
    } ) );

    this.addChild( dragNode );

    // @private
    this.y = options.y;

    // the marker line, connecting the arrow to the object, the first one is for the shadow so that
    // it is visible on top of the object
    var markerLineShape = new Shape();
    markerLineShape.moveTo( 0, -4 );
    markerLineShape.lineTo( 0, -options.forceArrowHeight );
    this.addChild( new Path( markerLineShape, {
      stroke: '#FFF',
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      x: 0.5,
      y: 0.5,
      tandem: tandem.createTandem( 'markerLineShadow' )
    } ) );
    var markerLineShapeTop = new Path( markerLineShape, {
      stroke: options.arrowColor,
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      tandem: tandem.createTandem( 'markerLine' )
    } );
    this.addChild( markerLineShapeTop );

    var clickOffset;

    dragNode.addInputListener( new SimpleDragHandler( {
      allowTouchSnag: true,
      start: function( event ) {
        clickOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        object.isDragging = true;
      },
      drag: function( event ) {

        // drag position relative to the pointer pointer start position and convert to model coordinates
        var x = modelViewTransform.viewToModelX( self.globalToParentPoint( event.pointer.point ).x - clickOffset );

        // absolute drag bounds based on model
        // see method descriptions for details
        var xMax = model.getObjectMaxPosition( object );
        var xMin = model.getObjectMinPosition( object );

        // apply limitations and update position
        x = Math.max( Math.min( x, xMax ), xMin ); // limited value of x (by boundary) in model coordinates

        // snapToGrid method dynamically checks whether to snap or not
        object.positionProperty.set( model.snapToGrid( x ) );
      },
      end: function( event ) {
        object.isDragging = false;
        // position change alert
        // TODO: Do we activate alerts for mouse interactions?
      },
      tandem: tandem.createTandem( 'dragHandler' )
    } ) );

    model.forceValuesProperty.lazyLink( this.redrawForce.bind( this ) );
    object.radiusProperty.lazyLink( this.redrawForce.bind( this ) );
    object.valueProperty.lazyLink( this.redrawForce.bind( this ) );
    model.forceProperty.lazyLink( this.redrawForce.bind( this ) );

    object.baseColorProperty.link( function( baseColor ) {
      self.updateGradient( baseColor );
      if ( options.attractNegative ) {
        markerLineShapeTop.stroke = getUpdatedFill( object.valueProperty.get() );
      }
    } );

    // on reset, no objects are destroyed and properties are set to initial values
    // no need to dispose of any of the below listeners
    object.positionProperty.link( function( property ) {

      // position this node and its force arrow with label
      var transformedValue = modelViewTransform.modelToViewX( property );
      self.x = transformedValue;
      self.arrowNode.x = transformedValue;
      self.redrawForce();

      // a11y edge alerts
      if ( positionDescriber.objectAtMinEdge( self.enum ) ) {
        alertManager.alertAtLeftEdge();
      }
      else if ( positionDescriber.objectAtMaxEdge( self.enum ) ) {
        alertManager.alertAtRightEdge();
      }
    } );

    var oldPosition = object.positionProperty.get();
    var accessibleSliderOptions = {
      keyboardStep: options.stepSize,
      shiftKeyboardStep: options.snapToNearest,
      pageKeyboardStep: options.stepSize * 2,
      accessibleDecimalPlaces: 1,
      constrainValue: function( value ) {
        var numberOfDecimalPlaces = Util.numberOfDecimalPlaces( options.snapToNearest );
        return Util.toFixedNumber( value, numberOfDecimalPlaces );
      },
      startDrag: function() {
        object.isDragging = true;
        oldPosition = object.positionProperty.get();
      },
      endDrag: function() {
        var newPosition = object.positionProperty.get();
        var positionChanged = newPosition !== oldPosition;
        object.isDragging = false;
        self.redrawForce();
        if ( positionChanged ) {
          alertManager.alertPositionChanged( positionDescriber.objectsClosest );
        }
        else {
          alertManager.alertPositionUnchanged();
        }
      },
      createAriaValueText: positionDescriber.ariaValueTextCreator( this.enum )
    };

    // a11y - initialize the accessible slider
    // these features make this Node act like an accessible range input
    this.initializeAccessibleSlider(
      object.positionProperty,
      object.enabledRangeProperty,
      new BooleanProperty( true ), // always enabled
      accessibleSliderOptions
    );

    // TODO: move to MassNode since ChargeNodes don't have a changing radiusProperty.
    this.objectModel.radiusProperty.link( function() {

      // a11y - update the focusHighlight with the radius (Accessibility.js setter)
      self.focusHighlight = Shape.bounds( dragNode.bounds.dilated( 5 ) );

      // set the pointer and touch areas
      var pullerBounds = self.pullerNode.localToParentBounds( self.pullerNode.touchAreaBounds );
      self.mouseArea = Shape.xor( [ Shape.bounds( pullerBounds ), self.objectCircle.createCircleShape() ] );
      self.touchArea = self.mouseArea;
    } );

    // for layering purposes, we assume that the ScreenView will add the arrow node and label - by the
    // time the sim is stepped, make sure that the arrows are added to the view
    if ( assert ) {
      var checkForArrowAdded = function() {
        if ( self.arrowNode.parents.length === 0 ) {
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

    var fill;
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
     * Updates the AccessibleSlider's PDOM peer aria-valutext property directly.
     *
     * @public
     * @abstract
     */
    resetAriaValueText: function() {
      throw new Error( 'resetAriaValueText must be implemented in subtypes' );
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
    }
  } );

  // mix in accessibility features, this Node behaves like a range input
  AccessibleSlider.mixInto( ISLCObjectNode );

  return ISLCObjectNode;
} );
