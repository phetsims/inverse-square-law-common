// Copyright 2018-2020, University of Colorado Boulder

/**
 * Base type for all ISLC associated Describer types. In general, this stores state that is useful to have for any describer
 * instance.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import inverseSquareLawCommon from '../../inverseSquareLawCommon.js';
import ISLCObjectEnum from '../ISLCObjectEnum.js';

class ISLCDescriber {

  /**
   * @param {ISLCModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   */
  constructor( model, object1Label, object2Label ) {

    // @private
    this.object1 = model.object1;
    this.object2 = model.object2;
    this.object1Label = object1Label;
    this.object2Label = object2Label;
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {Mass}
   * @private
   */
  getObjectFromEnum( objectEnum ) {
    assert && assert( ISLCObjectEnum.includes( objectEnum ) );
    return ISLCObjectEnum.isObject1( objectEnum ) ? this.object1 : this.object2;
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {Mass}
   * @private
   */
  getOtherObjectFromEnum( objectEnum ) {
    assert && assert( ISLCObjectEnum.includes( objectEnum ) );
    return ISLCObjectEnum.isObject1( objectEnum ) ? this.object2 : this.object1;
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   * @private
   */
  getObjectLabelFromEnum( objectEnum ) {
    assert && assert( ISLCObjectEnum.includes( objectEnum ) );
    return ISLCObjectEnum.isObject1( objectEnum ) ? this.object1Label : this.object2Label;
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   * @private
   */
  getOtherObjectLabelFromEnum( objectEnum ) {
    assert && assert( ISLCObjectEnum.includes( objectEnum ) );
    return ISLCObjectEnum.isObject1( objectEnum ) ? this.object2Label : this.object1Label;
  }
}

inverseSquareLawCommon.register( 'ISLCDescriber', ISLCDescriber );
export default ISLCDescriber;