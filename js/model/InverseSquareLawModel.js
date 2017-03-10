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
  var InverseSquareLawModes = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawModes' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Color = require( 'SCENERY/util/Color' );
  var Util = require( 'DOT/Util' );
  var inherit = require( 'PHET_CORE/inherit' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  // constants
  var MIN_SEPARATION_BETWEEN_MASSES = 0.1; // in meters
  var PULL_OBJECT_WIDTH = 1.62; // empirically determined for model space in meters
  var DISTANCE_DECIMAL_PRECISION = 3; // limit precision so small changes are not propogated to the force

  /**
   * @constructor
   * @param {string} mode - one of {'MASS'|'CHARGE'}  
   * @param {number} value1 - value of the first object, either in kg or C, depending on mode
   * @param {number} value2 - value of the first object, either in kg or C, depending on mode
   * @param {Vector2} position1 - initial position of the left object
   * @param {Vector2} position2 - initial position of the right object
   * @param {object} options
   */
  function InverseSquareLawModel( mode, value1, value2, position1, position2, tandem, options ) {

    options = _.extend( {

      // boundary locations for the objects (in meters)
      leftObjectBoundary: InverseSquareLawCommonConstants.LEFT_OBJECT_BOUNDARY,
      rightObjectBoundary: InverseSquareLawCommonConstants.RIGHT_OBJECT_BOUNDARY,

      valueRange: InverseSquareLawCommonConstants.MASS_RANGE,

      // options that are specific to mass
      massDensity: InverseSquareLawCommonConstants.MASS_DENSITY,

      // options that are specific to charge
      
    }, options );
    
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

    if ( mode === InverseSquareLawModes.MASS ) {
      var massOptions = {
        massConstantRadius: options.massConstantRadius,
        leftMassBoundary: options.leftMassBoundary,
        rightMassBoundary: options.rightMassBoundary
      };

      this.object1 = new Mass( value1, position1, options.valueRange, options.massDensity, new Color( '#00f' ), this.constantRadiusProperty, tandem.createTandem( 'mass1' ), massOptions );
      this.object2 = new Mass( value2, position2, options.valueRange, options.massDensity, new Color( '#f00' ), this.constantRadiusProperty, tandem.createTandem( 'mass2' ), massOptions );
    }
    else if ( mode === InverseSquareLawModes.CHARGE ) {
      // make some charges
      throw new Error( 'Charge mode is not supported yet.' );
    }
    else {
      throw new Error( 'Unsuported mode for InverseSquareLawModel' );
    }

    var forceConstant = mode === InverseSquareLawModes.MASS ? InverseSquareLawCommonConstants.G : InverseSquareLawCommonConstants.k;
    
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

  inverseSquareLawCommon.register( 'InverseSquareLawModel', InverseSquareLawModel );

  return inherit( Object, InverseSquareLawModel, {

    /**
     * step function makes sure masses doesn't goes out of bounds and don't overlap each other at each time step
     * @public
     */
    step: function() {
      var minX = this.leftObjectBoundary + PULL_OBJECT_WIDTH + this.object1.radiusProperty.get();
      var maxX = this.rightObjectBoundary - PULL_OBJECT_WIDTH - this.object2.radiusProperty.get();
      var locationMass1 = this.object1.positionProperty.get();
      var locationMass2 = this.object2.positionProperty.get();

      var change_factor = 0.0001; // this is empirically determined larger change factor may make masses farther but converges faster
      var sumRadius = this.object1.radiusProperty.get() + this.object2.radiusProperty.get() + MIN_SEPARATION_BETWEEN_MASSES;
      var changed = false;

      // for loop is to make sure after checking the boundaries constraints masses don't overlap
      for ( var i = 0; i < 10; i++ ) {

        // check for overlap and move both masses so that they don't overlap
        if ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
          while ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
            locationMass1 = locationMass1 - change_factor;
            locationMass2 = locationMass2 + change_factor;

            changed = true;
          }
        }

        // make sure mass1 doesn't go out of left boundary
        if ( locationMass1 < minX ) {
          locationMass1 = Math.max( minX, locationMass1 );
          changed = true;
        }

        // make sure mass2 doesn't go out of right boundary
        if ( locationMass2 > maxX ) {
          locationMass2 = Math.min( maxX, locationMass2 );

          changed = true;
        }
        if ( !changed ) {
          break;
        }
      }

      // round to the nearest thousandths so that very small changes in distance do not show up as changes during
      // these corrections
      locationMass1 = Util.toFixedNumber( locationMass1, DISTANCE_DECIMAL_PRECISION );
      locationMass2 = Util.toFixedNumber( locationMass2, DISTANCE_DECIMAL_PRECISION );

      this.object1.positionProperty.set( locationMass1 );
      this.object2.positionProperty.set( locationMass2 );

      // Force might not have been changed but positions might have changed, therefore to ensure everything is in bounds
      // inside the view
      this.forceProperty.notifyObserversStatic();
    },

    // @public
    reset: function() {
      this.showValuesProperty.reset();
      this.constantRadiusProperty.reset();
      this.object1.reset();
      this.object2.reset();
    }
  }, {

    // statics
    MIN_SEPARATION_BETWEEN_MASSES: MIN_SEPARATION_BETWEEN_MASSES
  } );
} );
