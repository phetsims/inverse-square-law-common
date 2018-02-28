// Copyright 2017, University of Colorado Boulder

/**
 * Main model for a system of two objects that exert forces on each other.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var Emitter = require( 'AXON/Emitter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Util = require( 'DOT/Util' );

  // phet-io modules
  var BooleanIO = require( 'ifphetio!PHET_IO/types/BooleanIO' );
  var NumberIO = require( 'ifphetio!PHET_IO/types/NumberIO' );

  /**
   * @param {number} forceConstant the appropriate force constant (e.g. G or k)
   * @param {object} object1 - the first Mass or Charge object
   * @param {object} object2 - the second Mass or Charge object
   * @param {Vector2} leftBoundary - absolute boundary for the left object
   * @param {Vector2} rightBoundary - absolute boundary for the right object
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCModel( forceConstant, object1, object2, leftBoundary, rightBoundary, tandem, options ) {

    var self = this;

    options = _.extend( {
      snapObjectsToNearest: null, // {number} if defined, objects will snap to nearest value in model coordinates
      minSeparationBetweenObjects: 0.1 // in meters
    }, options );

    // @public (read-only)
    this.leftObjectBoundary = leftBoundary;
    this.rightObjectBoundary = rightBoundary;

    // @public
    this.showValuesProperty = new Property( true, {
      tandem: tandem.createTandem( 'showValuesProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // @public
    this.object1 = object1;
    this.object2 = object2;

    // @private
    this.snapObjectsToNearest = options.snapObjectsToNearest;

    // @private
    this.minSeparationBetweenObjects = options.minSeparationBetweenObjects;

    // @private
    this.forceConstant = forceConstant;

    // @public - emits an event when the model is updated by step
    this.stepEmitter = new Emitter();

    // @public
    // derived property that calculates the force based on changes to values and positions
    // objects are never destroyed, so forceProperty does not require disposal
    this.forceProperty = new DerivedProperty( [
        this.object1.valueProperty, // could be mass or charge
        this.object2.valueProperty,
        this.object1.positionProperty,
        this.object2.positionProperty
      ], function( v1, v2, x1, x2 ) {
        var distance = Math.abs( x2 - x1 );
        return self.calculateForce( v1, v2, distance );
      }, {
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: tandem.createTandem( 'forceProperty' ),
        units: 'Newtons' // TODO: this appears unused in instance-proxies
      }
    );

    var updateRange = function( object ) {
      var maxPosition = self.getObjectMaxPosition( object );
      var minPosition = self.getObjectMinPosition( object );

      object.enabledRangeProperty.set( new RangeWithValue( minPosition, maxPosition ) );
    };

    // a11y - necessary to reset the enabledRangeProperty to prevent object overlap, disposal not necessary
    // We need to update the available range for each mass when the opposing value, or position changes.
    // However, we know the force will change when either of these attributes change, so we can link to that instead of
    // linking to the four underlying attributes. Radius can change without changing force, so it must be linked to
    // radius of each object
    this.forceProperty.link( function() {
      updateRange( object1 );
      updateRange( object2 );
    } );

    // when sim is reset, we only reset the position properties of each object to their initial values
    // thus, there is no need ot dispose of the listeners below
    this.object1.radiusProperty.link( function() {
      self.object1.radiusLastChanged = true;
      self.object2.radiusLastChanged = false;

      // update range if radius changes with constant radius
      updateRange( object1 );
    } );

    this.object2.radiusProperty.link( function() {
      self.object2.radiusLastChanged = true;
      self.object1.radiusLastChanged = false;

      updateRange( object2 );
    } );
  }

  inverseSquareLawCommon.register( 'ISLCModel', ISLCModel );

  return inherit( Object, ISLCModel, {

    /**
     * Step function makes sure masses doesn't goes out of bounds and don't overlap each other at each time step
     * @public
     */
    step: function() {
      var minX = this.leftObjectBoundary;
      var maxX = this.rightObjectBoundary;
      var locationMass1 = this.object1.positionProperty.get();
      var locationMass2 = this.object2.positionProperty.get();

      // bounds for the left object are the left boundary and the right edge of object 2 minus half the min separation
      var minPositionObject1 = minX;
      var maxPositionObject1 = this.getObjectMaxPosition( this.object1 );

      // bounds for the right object are the right edge of object 1 plus half the separation distance and the right edge
      var minPositionObject2 = this.getObjectMinPosition( this.object2 );
      var maxPositionObject2 = maxX;

      // make sure that the objects don't go beyond the boundaries
      locationMass1 = Math.max( minPositionObject1, locationMass1 );
      locationMass2 = Math.min( locationMass2, maxPositionObject2 );

      // make sure objects don't overlap
      locationMass1 = Math.min( locationMass1, maxPositionObject1 );
      locationMass2 = Math.max( minPositionObject2, locationMass2 );

      // if objects are limited to a certain precision, round position values to that precision
      locationMass1 = this.snapToGrid( locationMass1 );
      locationMass2 = this.snapToGrid( locationMass2 );

      if ( this.object1.isDragging ) {
        this.object1.positionProperty.set( locationMass1 );
      }
      else if ( this.object2.isDragging ) {
        this.object2.positionProperty.set( locationMass2 );
      }
      else {
        // neither object is dragging, radius must have changed
        if ( this.object1.radiusLastChanged ) {
          if ( locationMass2 !== maxX ) {
            // object2 is not at the edge update its position
            this.object2.positionProperty.set( locationMass2 );
          }
          else {
            // object2 is at the edge update object1 position
            this.object1.positionProperty.set( locationMass1 );
          }
        }
        else if ( this.object2.radiusLastChanged ) {
          if ( locationMass1 !== minX ) {
            // object1 is not at boundary, update position
            this.object1.positionProperty.set( locationMass1 );
          }
          else {
            this.object2.positionProperty.set( locationMass2 );
          }
        }
      }

      // broadcast a message that we have updated the model
      this.stepEmitter.emit();
    },

    /**
     * Helper function to for accessing and mapping force ranges in the inheriting sims' views
     *
     * @public
     * @return {number} the smallest possible force magnitude
     */
    getMinForce: function() {
      var maxDistance = Math.abs( this.rightObjectBoundary - this.leftObjectBoundary );

      // Since we're checking for magnitude, negative values for charges will need
      // to be set to zero.
      var minValue = this.object1.valueRange.min < 0 ? 0 : this.object1.valueRange.min;

      // ensure we always return a positive force value or zero
      return Math.abs( this.calculateForce( minValue, minValue, maxDistance ) );
    },

    /**
     * Helper function to for accessing and mapping force ranges in the inheriting sims' views
     *
     * @public
     * @return {number} the largest possible force magnitude
     */
    getMaxForce: function() {
      var maxValue = this.object1.valueRange.max;
      return Math.abs( this.calculateForce( maxValue, maxValue, this.getMinDistance( maxValue ) ) );
    },

    /**
     * Get the minimum possible separation between the objects' centers given a defined value for each of their
     * main properties.
     *
     * @public
     * @param  {number} value - the object's mass or charges
     * @return {number} the distance between the objects' centers
     */
    getMinDistance: function( value ) {
      // calculate radius for masses and charges at maximum mass/charge
      var minRadius = this.object1.calculateRadius( value );
      return ( 2 * minRadius ) + this.minSeparationBetweenObjects;
    },

    /**
     * Helper function to calculate the force within the model
     *
     * @public
     * @param  {number} v1 - the first object's mass or charge
     * @param  {number} v2 - the second object's mass or charge
     * @param  {number} distance - the distance between the objects' centers
     * @return {number} the force between the two objects
     */
    calculateForce: function( v1, v2, distance ) {
      assert && assert( distance > 0, 'must have non zero distance between objects' );
      return this.forceConstant * v1 * v2 / ( distance * distance );
    },

    /**
     * Returns the sum of the radii of the two spherical objects in this sim, plus the model's min separation between
     * the two objects.  This is used throughout the model.
     *
     * @public
     * @return {number}
     */
    getSumRadiusWithSeparation: function() {
      return this.snapToGrid(
        this.object1.radiusProperty.get() + this.object2.radiusProperty.get() + this.minSeparationBetweenObjects
      );
    },

    /**
     * Get the absolute maximum horizontal position for an object, relative to the object's center.
     *
     * @private
     * @param  {ISLCObject} object
     * @return {number}
     */
    getObjectMaxPosition: function( object ) {

      var sumRadius = this.getSumRadiusWithSeparation();
      var maxX;
      if ( object === this.object1 ) {

        // the max value for the left object is the position of the right object minius the sum of radii
        maxX = this.object2.positionProperty.get() - sumRadius;
      }
      else if ( object === this.object2 ) {

        // the max value for the right object is the right edge minus the puller width and the radius of the obejct
        maxX = this.rightObjectBoundary;
      }

      return this.snapToGrid( maxX );
    },

    /**
     * Get the absolute minimum horizontal position for an object.
     *
     * @private
     * @param  {ISLCObject} object
     * @return {number}
     */
    getObjectMinPosition: function( object ) {

      var sumRadius = this.getSumRadiusWithSeparation();
      var minX;
      if ( object === this.object1 ) {

        // the min value for the left object is the left edge plus the puller width and the radius of the object
        minX = this.leftObjectBoundary;
      }
      else if ( object === this.object2 ) {

        // min value for the right object is the position of the left object plus the sum of radii between the two
        // object plus the min distance
        minX = this.object1.positionProperty.get() + sumRadius;
      }

      return this.snapToGrid( minX );
    },

    /**
     * If this model constrains the objects to a grid, this snaps the position to the nearest spot in the grid.
     *
     * @private
     * @param  {number} position
     * @return {number}
     */
    snapToGrid: function( position ) {
      var snappedPosition = position;
      if ( this.snapObjectsToNearest ) {
        snappedPosition = Util.roundSymmetric( position / this.snapObjectsToNearest ) * this.snapObjectsToNearest;
      }

      // now make sure that the snapped position is within the left and right boundaries for this model
      snappedPosition = Math.min( snappedPosition, this.rightObjectBoundary );
      snappedPosition = Math.max( snappedPosition, this.leftObjectBoundary );

      return snappedPosition;
    },

    // @public
    reset: function() {
      this.showValuesProperty.reset();

      // if the position of object2 is equal to object1's initial position, an error will result when we 
      // reset object1's position. Thus, we need to check for that one edge case prior to reset
      if ( this.object2.positionProperty.get() === this.object1.positionProperty.initialValue ) {
        this.object2.reset();
        this.object1.reset();
      }
      else {
        this.object1.reset();
        this.object2.reset();
      }
    }
  } );
} );