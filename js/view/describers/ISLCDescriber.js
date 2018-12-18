// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );

  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  let describer = null;

  class ISLCDescriber {
    constructor( model, object1Label, object2Label ) {

      this.model = model;
      this.object1 = model.object1;
      this.object2 = model.object2;
      this.object1Label = object1Label;
      this.object2Label = object2Label;
    }

    getObjectFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object1 : this.object2;
    }

    getOtherObjectFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object2 : this.object1;
    }

    getObjectLabelFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object1Label : this.object2Label;
    }

    getOtherObjectLabelFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
    }

    getOtherObjectEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? OBJECT_TWO : OBJECT_ONE;
    }

    getObjectsFromEnum( objectEnum ) {
      const thisObject = OBJECT_ONE ? this.object1 : this.object2;
      const otherObject = OBJECT_ONE ? this.object2 : this.object1;
      return { thisObject, otherObject };
    }
  }

  return inverseSquareLawCommon.register( 'ISLCDescriber', ISLCDescriber );
} );