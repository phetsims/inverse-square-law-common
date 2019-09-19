// Copyright 2017-2019, University of Colorado Boulder

/**
 * Shared constants used in various places in gravity-force-lab, gravity-force-lab-basics, and coulombs-law.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  // constants
  var MAX_DISTANCE_FROM_CENTER = 5; // meters, empirically determined boundary for objects

  var ISLCConstants = {
    k: 8.987551E9, // Coulomb's constant

    coulombsPerAtomicUnit: 1.6021766208E-19, // atomic unit in C

    RIGHT_OBJECT_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_OBJECT_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,

    MIN_SEPARATION_BETWEEN_OBJECTS: 0.1, // in m

    // mass constants
    CONSTANT_RADIUS: 0.5, // meters
    MASS_DENSITY: 150 // kg/m^3
  };

  inverseSquareLawCommon.register( 'ISLCConstants', ISLCConstants );

  return ISLCConstants;
} );
