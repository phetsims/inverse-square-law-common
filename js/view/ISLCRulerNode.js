// Copyright 2017, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Michael Barlow
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var KeyboardDragListener = require( 'SCENERY/accessibility/listeners/KeyboardDragListener' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 35;
  var RULER_INSET = 10;

  // strings
  var unitsCentimetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.centimeters' );

  /**
   * @param {ISLCModel} model
   * @param {number} screenHeight
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function ISLCRulerNode( model, screenHeight, modelViewTransform, tandem, options ) {

    options = _.extend( {
      snapToNearest: null,
      majorTickLabels: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
      unitString: unitsCentimetersString,
      backgroundFill: '#ddd',
      rulerInset: RULER_INSET
    }, options );

    var majorTickLabels = options.majorTickLabels;
    var rulerUnitString = options.unitString;

    Node.call( this, { cursor: 'pointer', cssTransform: true, tandem: tandem, tagName: 'div', focusable: true } );

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

    // @public - ruler node is never destroyed, no listener disposal necessary
    model.rulerPositionProperty.link( function( value ) {
      ruler.center = modelViewTransform.modelToViewPosition( value );
    } );

    // ruler drag bounds (in model coordinate frame) - assumes a single point scale inverted Y mapping
    var modelHeight = modelViewTransform.viewToModelDeltaY( screenHeight );
    var modelRulerHeight = modelViewTransform.viewToModelDeltaY( this.height );

    var minX = model.leftObjectBoundary;
    var minY = modelHeight / 2 - modelRulerHeight; // bottom bound because Y is invered
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

          // var offsetX = modelViewTransform.viewToModelDeltaX( RULER_INSET );
          model.rulerPositionProperty.set( new Vector2( snappedX , model.rulerPositionProperty.get().y ) );
        }
      }
    } ) );

    // @private (a11y) - supports keyboard interaction, private so it can be stepped
    this.keyboardDragListener = new KeyboardDragListener( {
      dragBounds: bounds,
      locationProperty: model.rulerPositionProperty,
      transform: modelViewTransform,
      positionDelta: 3, // in view coordinates
      shiftPositionDelta: 1.5,

      // snap to nearest snapToNearest, called on end so that dragging doesn't snap to a value for as long
      // as key is held down
      end: function() {
        if ( options.snapToNearest ) {
          var xModel = model.rulerPositionProperty.get().x;
          var snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;
          model.rulerPositionProperty.set( new Vector2( snappedX , model.rulerPositionProperty.get().y ) );
        }
      }
    } );
    this.addAccessibleInputListener( this.keyboardDragListener );
  }

  inverseSquareLawCommon.register( 'ISLCRulerNode', ISLCRulerNode );

  return inherit( Node, ISLCRulerNode, {

    /**
     * Step to support keyboard dragging.
     *
     * @param {number} dt
     */
    step: function( dt ) {
      this.keyboardDragListener.step( dt );
    }
  } );
} );
