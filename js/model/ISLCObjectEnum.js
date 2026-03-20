// Copyright 2018-2026, University of Colorado Boulder

/**
 * Enumeration for the two ISLCObjects in the sim.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import EnumerationDeprecated from '../../../phet-core/js/EnumerationDeprecated.js';

const ISLCObjectEnum = EnumerationDeprecated.byKeys( [
  'OBJECT_ONE',
  'OBJECT_TWO'
], {
  beforeFreeze: ISLCObjectEnum => {

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
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === ISLCObjectEnum.OBJECT_ONE;
    };

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    ISLCObjectEnum.isObject2 = objectEnum => {
      assert && assert( ISLCObjectEnum.includes( objectEnum ) );
      return objectEnum === ISLCObjectEnum.OBJECT_TWO;
    };
  }
} );
export default ISLCObjectEnum;
