// Copyright 2013-2015, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );
  var Node = require( 'SCENERY/nodes/Node' );

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 35;
  var RULER_INSET = 11;

  // strings
  var unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );

  /**
   * @param {InverseSquareLawModel} model
   * @param {number} screenWidth
   * @param {number} screenHeight
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @constructor
   */
  function ISLRuler( model, screenWidth, screenHeight, modelViewTransform, tandem, options ) {

    options = _.extend( {
      snapToNearest: null,
    }, options );
    var self = this;
    Node.call( this, { cursor: 'pointer', cssTransform: true, tandem: tandem } );
    var ruler = new RulerNode(
      RULER_WIDTH,
      RULER_HEIGHT,
      50,
      [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
      unitsMetersString,
      {
        backgroundFill: '#ddd',
        insetsWidth: RULER_INSET,
        minorTicksPerMajorTick: 4,
        majorTickFont: new PhetFont( 12 ),
        snapToNearest: options.snapToNearest ? options.snapToNearest : 0,
        unitsFont: new PhetFont( 10 ),
        unitsSpacing: 3,
        tandem: tandem.createTandem( 'ruler' )
      }
    );
    this.addChild( ruler );

    model.rulerPositionProperty.link( function( value ) {
      ruler.translation = modelViewTransform.modelToViewPosition( value );
    } );

    this.addInputListener( new MovableDragHandler( model.rulerPositionProperty, {
      dragBounds: new Bounds2( -self.width / 2, 0, screenWidth - self.width / 2, screenHeight - self.height ),
      tandem: tandem.createTandem( 'dragHandler' ),
      modelViewTransform: modelViewTransform,

      onDrag: function( event ) {

        // snap to nearest snapToNearest if specified
        if ( options.snapToNearest ) {

          // x in model coordinates
          var xModel = model.rulerPositionProperty.get().x;
          
          var snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;

          var offsetX = modelViewTransform.viewToModelDeltaX( RULER_INSET );
          model.rulerPositionProperty.set( new Vector2( snappedX - offsetX, model.rulerPositionProperty.get().y ) );
        }
      }
    } ) );
  }

  inverseSquareLawCommon.register( 'ISLRuler', ISLRuler );

  return inherit( Node, ISLRuler );
} );
