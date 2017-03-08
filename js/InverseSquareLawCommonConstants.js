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
  var Range = require( 'DOT/Range' );

  // constants
  var MIN_MASS = 1; // kg
  var MAX_MASS = 1000; // kg
  var MAX_DISTANCE_FROM_CENTER = 7.48; // meters, empirically determined boundary for objects
  
  var InverseSquareLawCommonConstants = {
    G: 6.67384E-11, // gravitational constant
    k: 8.987551E9, // Coulomb's constant,

    RIGHT_OBJECT_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_OBJECT_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,

    // mass constants
    MASS_CONSTANT_RADIUS: 0.5, // meters
    MASS_DENSITY: 150, // kg/m^3
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
  };

  inverseSquareLawCommmon.register( 'InverseSquareLawCommonConstants', InverseSquareLawCommonConstants );

  return InverseSquareLawCommonConstants;
} );
