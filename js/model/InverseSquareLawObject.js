// Copyright 2017, University of Colorado Boulder

/**
 * Common type for items in inverse square law sims.
 * 
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TColor = require( 'SCENERY/util/TColor' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );


  /**
   * @constructor
   * @param {number} initialValue
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Color} baseColor
   * @param {Object} options
   */
  function InverseSquareLawObject( initialValue, initialPosition, valueRange, constantRadiusProperty, baseColor, options ) {

    var self = this;

    options = _.extend( {
      leftObjectBoundary: InverseSquareLawCommonConstants.LEFT_OBJECT_BOUNDARY,
      rightObjectBoundary: InverseSquareLawCommonConstants.RIGHT_OBJECT_BOUNDARY,

      constantRadius: InverseSquareLawCommonConstants.CONSTANT_RADIUS, // in meters
      constantRadiusColor: InverseSquareLawCommonConstants.CONSTANT_RADIUS_COLOR, // 

      tandem: Tandem.tandemRequired(), // tandem optional until sim is instrumented - TODO: come back to this
      tandemUnits: 'kilograms',
    }, options );

    // @public
    this.positionProperty = new Property( initialPosition, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioValueType: TNumber( {
        units: 'meters',
        range: new Range( options.leftObjectBoundary, options.rightObjectBoundary )
      } )
    } );

    // @public
    this.valueProperty = new Property( initialValue, {
      tandem: options.tandem.createTandem( 'valueProperty' ),
      phetioValueType: TNumber( { units: options.tandemUnits, range: valueRange } )
    } );

    // @public - mass radius will change with value
    this.radiusProperty = new DerivedProperty(
      [ this.valueProperty, constantRadiusProperty ],
      function( mass, constantRadius ) {
        return constantRadius ? options.constantRadius : self.calculateRadius( mass );
      },
      { tandem: options.tandem.createTandem( 'radiusProperty' ), phetioValueType: TNumber( { units: 'meters' } ) }
    );

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
      { tandem: options.tandem.createTandem( 'baseColorProperty' ), phetioValueType: TColor }
    );
  }

  inverseSquareLawCommon.register( 'InverseSquareLawObject', InverseSquareLawObject );

  return inherit( Object, InverseSquareLawObject, {

    /**
     * Calculate radius for the object - must be implemented in subtypes.
     */
    calculateRadius: function() {
      throw new Error( 'calculateRadius must be implemented in descendent types' );
    }
  } );

} );
