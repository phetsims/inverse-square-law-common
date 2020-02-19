// Copyright 2019-2020, University of Colorado Boulder

/**
 * Panel with reusable style.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );

  class ISLCPanel extends Panel {

    /**
     * @param {Node} content
     * @param {Object} [options]
     */
    constructor( content, options ) {

      options = merge( {
        fill: '#FDF498',
        xMargin: 10,
        yMargin: 10,
        minWidth: 170,
        backgroundPickable: true // when the rule is behind panels, see https://github.com/phetsims/gravity-force-lab/issues/253
      }, options );

      super( content, options );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCPanel', ISLCPanel );
} );