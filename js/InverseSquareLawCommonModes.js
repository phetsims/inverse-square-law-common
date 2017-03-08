// Copyright 2017, University of Colorado Boulder

/**
 * An enum that defines the possible modes for inverse square law sims. Must be one of Mass or Charge.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var gravityAndOrbits = require( 'GRAVITY_AND_ORBITS/gravityAndOrbits' );

  var InverseSquareLawCommonModes = {
    MASS: 'MASS',
    CHARGE: 'CHARGE'    
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( InverseSquareLawCommonModes ); }

  gravityAndOrbits.register( 'InverseSquareLawCommonModes', InverseSquareLawCommonModes );

  return InverseSquareLawCommonModes;
} );
