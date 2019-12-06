// Copyright 2019, University of Colorado Boulder

/**
 * Enumeration for the two default directions that the ISLCObjects and sub components can have in the sim.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  return inverseSquareLawCommon.register( 'DefaultDirection', Enumeration.byKeys( [
    'LEFT',
    'RIGHT'
  ] ) );
} );