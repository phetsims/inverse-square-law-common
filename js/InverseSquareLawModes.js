// Copyright 2017, University of Colorado Boulder

/**
 * An enum that defines the possible modes for inverse square law sims. Must be one of Mass or Charge.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  var InverseSquareLawModes = {
    MASS: 'MASS',
    CHARGE: 'CHARGE'    
  };

  // verify that enum is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( InverseSquareLawModes ); }

  inverseSquareLawCommon.register( 'InverseSquareLawModes', InverseSquareLawModes );

  return InverseSquareLawModes;
} );
