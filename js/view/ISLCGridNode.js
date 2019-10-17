// Copyright 2017-2019, University of Colorado Boulder

/**
 * Grid that shows the possible locations of where the objects can be in the play area. For several
 * sims that use inverse-square-law-common, objects are constrained to positions along a 2D grid.
 * This node should only be used for debugging and will be hidden behind query parameter "showGrid".
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {number} deltaX - position step for the object in model coordinates
   * @param {Bounds2} layoutBounds - layout bounds of the ScreenView
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function ISLCGridNode( deltaX, layoutBounds, modelViewTransform, options ) {

    options = merge( {
      stroke: 'rgba( 0, 0, 0, 0.6 )'
    }, options );

    const gridShape = new Shape();

    // subtract 1 so grid aligns with model, see https://github.com/phetsims/inverse-square-law-common/issues/49
    let gridPosition = modelViewTransform.viewToModelX( layoutBounds.minX - 1 );
    const rightBoundary = modelViewTransform.viewToModelX( layoutBounds.maxX );
    while ( gridPosition <= rightBoundary ) {

      // grid position in view coords
      const viewPosition = modelViewTransform.modelToViewX( gridPosition );

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

  inverseSquareLawCommon.register( 'ISLCGridNode', ISLCGridNode );

  return inherit( Path, ISLCGridNode );
} );