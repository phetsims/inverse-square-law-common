// Copyright 2016, University of Colorado Boulder

/**
 * Model for one of the spherical draggable masses.
 *
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  // var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var InverseSquareLawObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawObject' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @param {number} initialCharge
   * @param {number} initialPosition
   * @param {string} baseColor
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Charge(initialCharge, initialPosition, valueRange, baseColor, tandem, options) {

    // radius for charges is always constant
    var radiusProperty = new Property( true );

    InverseSquareLawObject.call( this, initialCharge, initialPosition, valueRange, radiusProperty, baseColor, options );
  }

  inverseSquareLawCommon.register('Charge', Charge );

  return inherit( InverseSquareLawObject, Charge, {

    /**
     * Overriding parent function for calculateRadius. No implementation for Charge objects.
     */
    calculateRadius: function() {
      throw new Error( 'Charge objects have no radius' );
    },

    // @public
    reset: function () {
      this.valueProperty.reset();
      this.positionProperty.reset();
    }
  } );
} );