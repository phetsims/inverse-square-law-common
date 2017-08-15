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
  var Emitter = require( 'AXON/Emitter' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  // constants
  // var DISTANCE_DECIMAL_PRECISION = 3; // limit precision so small changes are not propogated to the force

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
      phetioValueType: TBoolean
    } );

    // @public
    this.object1 = object1;
    this.object2 = object2;

    // @privates
    this.snapObjectsToNearest = options.snapObjectsToNearest;

    // @private
    this.minSeparationBetweenObjects = options.minSeparationBetweenObjects;

    // @public - emits an event when the model is updated in by step
    this.stepEmitter = new Emitter();
    
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

    Property.multilink( [
      this.object1.radiusProperty,
      this.object2.radiusProperty ],
      function ( object1Radius, object2Radius ) {
        self.object1.isDragging = false;
        self.object2.isDragging = false;
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
      var minX = this.leftObjectBoundary + this.object1.radiusProperty.get();
      var maxX = this.rightObjectBoundary - this.object2.radiusProperty.get();
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

      // round to the nearest thousandths so that very small changes in distance do not show up as changes during
      // these corrections
      // locationMass1 = Util.toFixedNumber( locationMass1, DISTANCE_DECIMAL_PRECISION );
      // locationMass2 = Util.toFixedNumber( locationMass2, DISTANCE_DECIMAL_PRECISION );

      // // if objects are limited to a certain precision, round position values to that precision
      locationMass1 = this.snapToGrid( locationMass1 );
      locationMass2 = this.snapToGrid( locationMass2 );

      // only update the locations if they have changed
      // if ( this.object1.positionProperty.get() !== locationMass1 ) {
        
      // }
      // if ( this.object2.positionProperty.get() !== locationMass2 ) {
        
      // }

      if ( this.object1.isDragging ) {
        this.object1.positionProperty.set( locationMass1 );
      } else if ( this.object2.isDragging ) {
        this.object2.positionProperty.set( locationMass2 );
      } else {
        // neither object is dragging, radius must have changed
        this.object1.positionProperty.set( locationMass1 );
        this.object2.positionProperty.set( locationMass2 );
      }

      // Force might not have been changed but positions might have changed, therefore to ensure everything is in
      // bounds inside the view
      this.forceProperty.notifyListenersStatic();

      // broadcast a message that we have updated the model
      this.stepEmitter.emit();
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
     * @param  {} object
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
        maxX = this.rightObjectBoundary - this.object2.radiusProperty.get();
      }

      return this.snapToGrid( maxX );
    },

    /**
     * Get the absolute minimum horizontal position for an object.
     * 
     * @param  {InverseSquareLawObject} object 
     * @return {number}
     */
    getObjectMinPosition: function( object ) {

      var sumRadius = this.getSumRadiusWithSeparation();
      var minX;
      if ( object.positionProperty.get() === this.object1.positionProperty.get() ) {
        
        // the min value for the left object is the left edge plus the puller width and the radius of the object
        minX = this.leftObjectBoundary + this.object1.radiusProperty.get();
      }
      else if ( object.positionProperty.get() === this.object2.positionProperty.get() ) {

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
      // snappedPosition = Math.min( snappedPosition, this.rightObjectBoundary );
      // snappedPosition = Math.max( snappedPosition, this.leftObjectBoundary );

      return snappedPosition;
    },

    /**
     * Switches between which object is the 'dragging' object. Used to lock the non-dragging object's position.
     * @param  {ISLObject} object
     * @return {void}
     */
    toggleDraggingObject: function( object ) {
      if ( object === this.object1 ) {
        this.object2.isDragging = !this.object1.isDragging;
      } else if ( object === this.object2 ) {
        this.object1.isDragging = !this.object2.isDragging;
      }
    },

    // @public
    reset: function() {
      this.showValuesProperty.reset();

      // TODO: explain why the resetting order matters or change this code
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
