// Copyright 2017, University of Colorado Boulder

/**
 * Grid that shows the possible locations of where the objects can be in the play area. For several
 * sims that use inverse-square-law-common, objects are constrained to positions along a 2D grid.
 * This node should only be used for debugging and will be hidden behind query parameter "showGrid".
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @constructor
   * @param {number} rightBoundary - right most position of object in model coordinates
   * @param {number} leftBoundary - left most postion of object in model coordinates
   * @param {number} deltaX - position step for the object in model coordinates
   * @param {Bounds2} layoutBounds - layout bounds of the ScreenView
   * @param {ModelViewTransform2} modelViewTransform
   */
  function InverseSquareLawGridNode( rightBoundary, leftBoundary, deltaX, layoutBounds, modelViewTransform, options ) {

    options = _.extend( {
      stroke: 'rgba( 0, 0, 0, 0.6 )'
    }, options );

    var gridShape = new Shape();
    var gridPosition = leftBoundary;
    while ( gridPosition <= rightBoundary ) {

      // grid position in view coords
      var viewPosition = modelViewTransform.modelToViewX( gridPosition );

      // draw the grid line
      gridShape.moveTo( viewPosition, layoutBounds.top );
      gridShape.lineTo( viewPosition, layoutBounds.bottom );

      // move to the next location
      gridPosition += deltaX;
    }

    Path.call( this, gridShape, {
      stroke: options.stroke,
      lineWidth: 1
    } );
  }

  inverseSquareLawCommon.register( 'InverseSquareLawGridNode', InverseSquareLawGridNode );

  return inherit( Path, InverseSquareLawGridNode );

} );
