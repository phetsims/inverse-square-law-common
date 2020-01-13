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
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // constants
  const MAX_DISTANCE_FROM_CENTER = 5; // meters, empirically determined boundary for objects

  const ISLCConstants = {
    k: 8.987551E9, // Coulomb's constant

    coulombsPerAtomicUnit: 1.6021766208E-19, // atomic unit in C

    RIGHT_OBJECT_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_OBJECT_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,

    MIN_SEPARATION_BETWEEN_OBJECTS: 0.1, // in m

    // mass constants
    CONSTANT_RADIUS: 0.5, // meters
    MASS_DENSITY: 150, // kg/m^3

    CHECKBOX_OPTIONS: {
      spacing: 10,
      padding: 8,
      boxWidth: 16
    },
    UI_TEXT_OPTIONS: {
      font: new PhetFont( 14 ),
      maxWidth: 110
    }
  };

  inverseSquareLawCommon.register( 'ISLCConstants', ISLCConstants );

  return ISLCConstants;
} );
