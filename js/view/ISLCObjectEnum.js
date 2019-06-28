// Copyright 2018-2019, University of Colorado Boulder

/**
 * Enumeration for the two ISLCObjects in the sim.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  return inverseSquareLawCommon.register( 'ISLCObjectEnum', new Enumeration( [
    'OBJECT_ONE',
    'OBJECT_TWO'
  ], ISLCObjectEnum => {

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {ISLCObjectEnum}
     */
    ISLCObjectEnum.getOtherObjectEnum = objectEnum => {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === ISLCObjectEnum.OBJECT_ONE ? ISLCObjectEnum.OBJECT_TWO : ISLCObjectEnum.OBJECT_ONE;
    };

    /**
     * @public
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    ISLCObjectEnum.isObject1 = objectEnum => {
      return objectEnum === ISLCObjectEnum.OBJECT_ONE;
    };

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    ISLCObjectEnum.isObject2 = objectEnum => {
      return objectEnum === ISLCObjectEnum.OBJECT_TWO;
    };
  } ) );
} );