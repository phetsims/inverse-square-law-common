// Copyright 2017, University of Colorado Boulder

/**
 * Shared constants used in various places in gravity-force-lab, gravity-force-lab-basics, and coulombs-law.
 * 
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommmon = require( 'INVERSE_SQUARE_LAW/inverseSquareLawCommmon' );

  var InverseSquareLawCommonConstants = {
    G: 6.67384E-11, // gravitational constant
    k: 8.987551E9 // Coulomb's constant
  };

  inverseSquareLawCommmon.register( 'InverseSquareLawCommonConstants', InverseSquareLawCommonConstants );

  return InverseSquareLawCommonConstants;
} );
