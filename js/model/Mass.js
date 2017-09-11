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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCObject = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCObject' );
  var TColor = require( 'SCENERY/util/TColor' );

  /**
   * @constructor
   * @param {number} initialMass
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {number} density
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Color} baseColor
   * @param {Tandem} tandem
   * @param {Object} options
   */
  function Mass( initialMass, initialPosition, valueRange, density, constantRadiusProperty, baseColor, tandem, options ) {

    options = _.extend( {
      constantRadius: ISLCConstants.CONSTANT_RADIUS, // in meters
      constantRadiusColor: ISLCConstants.CONSTANT_RADIUS_COLOR, // 
    }, options );

    // @private
    this.density = density;

    ISLCObject.call( this, initialMass, initialPosition, valueRange, constantRadiusProperty, tandem, options );


    // @public - mass color is will change with value
    // TODO: alter 'constantRadiusProperty' to better indicate the condition for which the object colors will change
    // radius changes will be moved into the Mass object
    // color property will be changed and updated based on a boolean value (negative vs positive for Charge and Constant Radius for Mass)
    // brightness will be set according to the Mass/Charge magnitude
    this.baseColorProperty = new DerivedProperty(
      [ this.valueProperty, constantRadiusProperty ],
      function( value, constantRadius ) {
        return constantRadius ?
               options.constantRadiusColor.colorUtilsBrighter( 1 - Math.abs(value) / valueRange.max ) :
               baseColor;
      },
      { tandem: tandem.createTandem( 'baseColorProperty' ), phetioValueType: TColor }
    );
  }

  inverseSquareLawCommon.register( 'Mass', Mass );

  return inherit( ISLCObject, Mass, {

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