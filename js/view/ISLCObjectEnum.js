// Copyright 2018-2019, University of Colorado Boulder

/**
 * Enumeration for the two ISLCObjects in the sim.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  const ISLCObjectEnum = {
    OBJECT_ONE: 'object1',
    OBJECT_TWO: 'object2'
  };

  if ( assert ) { Object.freeze( ISLCObjectEnum ); }

  return inverseSquareLawCommon.register( 'ISLCObjectEnum', ISLCObjectEnum );
} );