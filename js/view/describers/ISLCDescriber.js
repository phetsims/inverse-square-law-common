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
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const summaryInteractionHintPatternString = ISLCA11yStrings.summaryInteractionHintPattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

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
     * @public
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    isObject1( objectEnum ) {
      return objectEnum === OBJECT_ONE;
    }

    /**
     * @public
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    isObject2( objectEnum ) {
      return objectEnum === OBJECT_TWO;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {Mass}
     */
    getObjectFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object1 : this.object2;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {Mass}
     */
    getOtherObjectFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object2 : this.object1;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getObjectLabelFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object1Label : this.object2Label;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getOtherObjectLabelFromEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {ISLCObjectEnum}
     */
    getOtherObjectEnum( objectEnum ) {
      return objectEnum === OBJECT_ONE ? OBJECT_TWO : OBJECT_ONE;
    }

    /**
     * @public
     * @param {ISLCObject} object
     * @returns {boolean}
     */
    getEnumFromObject( object ) {
      return object === this.object1 ? OBJECT_ONE :
             object === this.object2 ? OBJECT_TWO :
             assert && assert( false, 'unrecognized ISLCObject' );
    }

    /**
     * TODO: as of writing this is only used by GFL, should it be moved out of here?
     * Static function to get interaction hint
     * @param massOrCharge
     * @returns {*|string}
     */
    static getSummaryInteractionHint( massOrCharge ) {
      return StringUtils.fillIn(
        summaryInteractionHintPatternString,
        { massOrCharge: massOrCharge }
      );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCDescriber', ISLCDescriber );
} );