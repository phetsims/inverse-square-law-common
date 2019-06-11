// Copyright 2018-2019, University of Colorado Boulder

/**
 * Base type for all ISLC associated Describer types. In general, this stores state that is useful to have for any describer
 * instance.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );

  // constants
  const { OBJECT_ONE } = ISLCObjectEnum;

  class ISLCDescriber {

    /**
     * @param {ISLCModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     */
    constructor( model, object1Label, object2Label ) {

      // @private
      this.model = model;
      this.object1 = model.object1;
      this.object2 = model.object2;
      this.object1Label = object1Label;
      this.object2Label = object2Label;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {Mass}
     */
    getObjectFromEnum( objectEnum ) {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === OBJECT_ONE ? this.object1 : this.object2;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {Mass}
     */
    getOtherObjectFromEnum( objectEnum ) {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === OBJECT_ONE ? this.object2 : this.object1;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getObjectLabelFromEnum( objectEnum ) {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === OBJECT_ONE ? this.object1Label : this.object2Label;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getOtherObjectLabelFromEnum( objectEnum ) {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
    }
  }

  return inverseSquareLawCommon.register( 'ISLCDescriber', ISLCDescriber );
} );