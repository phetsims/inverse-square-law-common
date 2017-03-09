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
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var InverseSquareLawObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawObject' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {number} initialMass
   * @param {number} initialPosition
   * @param {number} density
   * @param {string} baseColor
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Mass( initialMass, initialPosition, density, baseColor, constantRadiusProperty, tandem, options ) {

    options = _.extend( {
      valueRange: InverseSquareLawCommonConstants.MASS_RANGE // in meters
    }, options );

    // @private
    this.density = density;

    InverseSquareLawObject.call( this, initialMass, initialPosition, constantRadiusProperty, baseColor, options );
  }

  inverseSquareLawCommon.register( 'Mass', Mass );

  return inherit( InverseSquareLawObject, Mass, {

    /**
     * calculates the radius based on mass of object maintaining constant density
     * calculations are made using the density formula and volume of a sphere
     * @private
     * @override
     */
    calculateRadius: function( mass ) {
      var sphereVolume = mass / this.density;
      var sphereRadius = Math.pow( ( 3 * sphereVolume ) / ( 4 * Math.PI ), 1 / 3 );
      return sphereRadius;
    },

    // @public
    reset: function() {
      this.valueProperty.reset();
      this.positionProperty.reset();
    }
  } );
} );