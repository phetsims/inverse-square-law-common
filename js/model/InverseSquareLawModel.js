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
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Util = require( 'DOT/Util' );
  var inherit = require( 'PHET_CORE/inherit' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  // constants
  var PULL_OBJECT_WIDTH = 1.62; // empirically determined for model space in meters
  var DISTANCE_DECIMAL_PRECISION = 3; // limit precision so small changes are not propogated to the force

  /**
   * @constructor
   * @param {number} forceConstant the appropriate force constant (e.g. G or k)
   * @param {object} object1 - the first Mass or Charge object
   * @param {object} object2 - the second Mass or Charge object
   * @param {Vector2} leftBoundary - absolute boundary for the left object
   * @param {Vector2} rightBoundary - absolute boundary for the right object
   * @param {Tandem} tandem
   * @param {object} options
   */
  function InverseSquareLawModel( forceConstant, object1, object2, leftBoundary, rightBoundary, tandem, options ) {

    options = _.extend( {
      snapObjectsToNearest: null, // {number} if defined, objects will snap to nearest value in model coordinates
      minSeparationBetweenObjects: 0.1 // in meters
    }, options );
    
    // @private
    this.leftObjectBoundary = leftBoundary;
    this.rightObjectBoundary = rightBoundary;

    // @public
    this.showValuesProperty = new Property( true, {
      tandem: tandem.createTandem( 'showValuesProperty' ),
      phetioValueType: TBoolean
    } );

    // @public
    this.object1 = object1;
    this.object2 = object2;

    // @privates
    this.snapObjectsToNearest = options.snapObjectsToNearest;

    // @private
    this.minSeparationBetweenObjects = options.minSeparationBetweenObjects;
    
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

         assert && assert( distance > 0, 'must have non zero distance between objects' );
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
      var sumRadius = this.object1.radiusProperty.get() + this.object2.radiusProperty.get() + this.minSeparationBetweenObjects;
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

      // if objects are limitted to a certain precision, round position values to that precision
      if ( this.snapObjectsToNearest ) {
        locationMass1 = Util.roundSymmetric( locationMass1 / this.snapObjectsToNearest ) * this.snapObjectsToNearest;
        locationMass2 = Util.roundSymmetric( locationMass2 / this.snapObjectsToNearest ) * this.snapObjectsToNearest;
      }

      this.object1.positionProperty.set( locationMass1 );
      this.object2.positionProperty.set( locationMass2 );

      // Force might not have been changed but positions might have changed, therefore to ensure everything is in bounds
      // inside the view
      this.forceProperty.notifyObserversStatic();
    },

    // @public
    reset: function() {
      this.showValuesProperty.reset();
      if ( this.object2.positionProperty.get() === this.object1.positionProperty.initialValue ) {
        this.object2.reset();
        this.object1.reset();
      } else {
        this.object1.reset();
        this.object2.reset();
      }
    }
  } );
} );
