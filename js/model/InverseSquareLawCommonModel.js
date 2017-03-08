// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main model for a system of two objects that exert forces on each other.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var InverseSquareLawCommonModes = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonModes' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @constructor
   * @param {string} mode - one of {'MASS'|'CHARGE'}  
   * @param {number} value1 - value of the first object, either in kg or C, depending on mode
   * @param {number} value2 - value of the first object, either in kg or C, depending on mode
   * @param {Vector2} position1 - initial position of the left object
   * @param {Vector2} position2 - initial position of the right object
   * @param {object} options
   */
  function InverseSquareLawCommonModel( mode, value1, value2, position1, position2, tandem, options ) {

    options = _.extend( {

      // boundary locations for the objects (in meters)
      leftObjectBoundary: InverseSquareLawCommonConstants.LEFT_OBJECT_BOUNDARY,
      rightObjectBoundary: InverseSquareLawCommonConstants.RIGHT_OBJECT_BOUNDARY,

      // options that are specific to mass
      massDensity: InverseSquareLawCommonConstants.MASS_DENSITY,
      massConstantRadius: InverseSquareLawCommonConstants.MASS_CONSTANT_RADIUS,
      massRange: InverseSquareLawCommonConstants.MASS_RANGE

      // options that are specific to charge
      
    }, options );
    
    // NOTE: the following documents our game plan for a common InverseSquareLawCommonModel type
    // instantiate Properties that are common to gravity-force-lab, gravity-force-lab-basics, and coulombs-law
    
    // @private
    this.leftObjectBoundary = options.leftObjectBoundary;
    this.rightObjectBoundary = options.rightObjectBoundary;

    // @public
    this.showValuesProperty = new Property( true, {
      tandem: tandem.createTandem( 'showValuesProperty' ),
      phetioValueType: TBoolean
    } );
    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    } ); // @public

    if ( mode === InverseSquareLawCommonModes.MASS ) {
      var massOptions = {
        massConstantRadius: options.massConstantRadius,
        leftMassBoundary: options.leftMassBoundary,
        rightMassBoundary: options.rightMassBoundary
      };

      this.object1 = new Mass( value1, position1, options.massDensity, new Color( '#00f' ), this.constantRadiusProperty, tandem.createTandem( 'mass1' ), massOptions );
      this.object2 = new Mass( value2, position2, options.massDensity, new Color( '#f00' ), this.constantRadiusProperty, tandem.createTandem( 'mass2' ), massOptions );
    }
    else if ( mode === InverseSquareLawCommonModes.CHARGE ) {
      // make some charges
    }
    else {
      throw new Error( 'Unsuported mode for InverseSquareLawCommonModel' );
    }

    var forceConstant = mode === InverseSquareLawCommonModes.MASS ? InverseSquareLawCommonConstants.G : InverseSquareLawCommonConstants.k;
    
    // derived property that calculates the force based on changes to values and positions
    this.forceProperty = new DerivedProperty(
     [
       this.object1.valueProperty,
       this.object2.valueProperty,
       this.object1.positionProperty,
       this.object2.positionProperty
     ],
       function( v1, v2, x1, x2 ) {
         var distance = Math.abs( x2 - x1 );
         return forceConstant * v1 * v2 / ( distance * distance );
       }
    );
  }

  inverseSquareLawCommon.register( 'InverseSquareLawCommonModel', InverseSquareLawCommonModel );

  return inherit( Object, InverseSquareLawCommonModel );
} );
