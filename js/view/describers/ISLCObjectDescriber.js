// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  class ISLCObjectDescriber {
    constructor( model, object, objectLabel ) {
      this.model = model;
      this.object = object;
      this.label = objectLabel;
    }
  }

  return inverseSquareLawCommon.register( 'ISLCObjectDescriber', ISLCObjectDescriber );
} );