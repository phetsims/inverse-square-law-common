  // Copyright 2017, University of Colorado Boulder

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