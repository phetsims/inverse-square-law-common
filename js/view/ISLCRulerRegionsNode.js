// Copyright 2019, University of Colorado Boulder

/**
 * Shows the regions that a ruler can occupy in vertical space. These regions are used for interactive descriptions of
 * the ruler.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {Array.<number>} rulerRegionPositions - a list of y values that are the ruler region boundaries
   * @param {Bounds2} layoutBounds
   * @param {Object} [options]
   * @constructor
   */
  class ISLCRulerRegionsNode extends Path {
    constructor( rulerRegionPositions, layoutBounds, options ) {

      options = merge( {
        stroke: 'rgba(237,54,187,0.6)',
        lineWidth: 1.5
      }, options );

      const regionsShape = new Shape();

      rulerRegionPositions.forEach( position => {

        // draw the grid line
        regionsShape.moveTo( layoutBounds.left, position );
        regionsShape.lineTo( layoutBounds.right, position );
      } );

      super( regionsShape, options );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCRulerRegionsNode', ISLCRulerRegionsNode );
} );