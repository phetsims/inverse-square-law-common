// Copyright 2018-2019, University of Colorado Boulder

/**
 * Type used to create auditory description related strings associated with the two ISLCObject instances and their state.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
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