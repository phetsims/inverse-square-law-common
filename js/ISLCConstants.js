// Copyright 2017-2018, University of Colorado Boulder

/**
 * Shared constants used in various places in gravity-force-lab, gravity-force-lab-basics, and coulombs-law.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Range = require( 'DOT/Range' );

  // constants
  var MIN_MASS = 1; // kg
  var MAX_MASS = 1000; // kg

  var MAX_DISTANCE_FROM_CENTER = 5; // meters, empirically determined boundary for objects

  var ISLCConstants = {
    G: 6.67384E-11, // gravitational constant
    k: 8.987551E9, // Coulomb's constant

    coulombsPerAtomicUnit: 1.6021766208E-19, // atomic unit in C

    RIGHT_OBJECT_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_OBJECT_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,

    MIN_SEPARATION_BETWEEN_OBJECTS: 0.1, // in m

    // mass constants
    CONSTANT_RADIUS: 0.5, // meters
    MASS_DENSITY: 150, // kg/m^3
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
  };

  inverseSquareLawCommon.register( 'ISLCConstants', ISLCConstants );

  return ISLCConstants;
} );
