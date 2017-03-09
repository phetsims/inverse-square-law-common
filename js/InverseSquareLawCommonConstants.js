// Copyright 2017, University of Colorado Boulder

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
  var Color = require( 'SCENERY/util/Color' );

  // constants
  var MIN_MASS = 1; // kg
  var MAX_MASS = 1000; // kg
  var MAX_DISTANCE_FROM_CENTER = 7.48; // meters, empirically determined boundary for objects
  
  var InverseSquareLawCommonConstants = {
    G: 6.67384E-11, // gravitational constant
    k: 8.987551E9, // Coulomb's constant,

    RIGHT_OBJECT_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_OBJECT_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,

    CONSTANT_RADIUS_COLOR: new Color( 'indigo' ),

    // mass constants
    CONSTANT_RADIUS: 0.5, // meters
    MASS_DENSITY: 150, // kg/m^3
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
  };

  inverseSquareLawCommon.register( 'InverseSquareLawCommonConstants', InverseSquareLawCommonConstants );

  return InverseSquareLawCommonConstants;
} );
