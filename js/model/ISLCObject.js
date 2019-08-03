// Copyright 2017-2019, University of Colorado Boulder

/**
 * Common type for model items in inverse square law sims.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const Emitter = require( 'AXON/Emitter' );
  const inherit = require( 'PHET_CORE/inherit' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const NumberIO = require( 'TANDEM/types/NumberIO' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const PropertyIO = require( 'AXON/PropertyIO' );
  const Range = require( 'DOT/Range' );
  const RangeIO = require( 'DOT/RangeIO' );

  /**
   * @param {number} initialMass
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCObject( initialMass, initialPosition, valueRange, constantRadiusProperty, tandem, options ) {

    options = _.extend( {

      // in meters
      leftObjectBoundary: ISLCConstants.LEFT_OBJECT_BOUNDARY,
      rightObjectBoundary: ISLCConstants.RIGHT_OBJECT_BOUNDARY,
      constantRadius: ISLCConstants.CONSTANT_RADIUS, // radius when constant

      valueUnits: 'kilograms'
    }, options );

    // @public
    this.positionProperty = new NumberProperty( initialPosition, {
      tandem: tandem.createTandem( 'positionProperty' ),
      units: 'meters',
      range: new Range( options.leftObjectBoundary, options.rightObjectBoundary ),
      phetioDocumentation: 'The position of the object along the track, in meters.'
    } );

    // @public {Property.<number>} - the mass or charge of the object in kilograms or coulombs
    this.valueProperty = new NumberProperty( initialMass, {
      tandem: tandem.createTandem( 'valueProperty' ),
      range: valueRange,
      units: options.valueUnits,
      phetioDocumentation: 'The value of the object'
    } );

    // @public {Property.<number>} - the radius of the mass or charge in meters
    // since ISLCObjects are never destroyed, no need to dispose
    this.radiusProperty = new DerivedProperty( [ this.valueProperty, constantRadiusProperty ],
      ( objectValue, constantRadius ) => {
        return constantRadius ? options.constantRadius : this.calculateRadius( objectValue );
      }, {
        tandem: tandem.createTandem( 'radiusProperty' ),
        phetioDocumentation: 'The radius of the object',
        units: 'meters',
        phetioType: DerivedPropertyIO( NumberIO )
      }
    );

    const enabledRange = new Range( options.leftObjectBoundary, options.rightObjectBoundary );

    // @public {Property.<Range>}- set by ISLCModel when the force changes, the range for position of the objects
    // based on their radius and location
    this.enabledRangeProperty = new Property( enabledRange, {
      tandem: tandem.createTandem( 'enabledRangeProperty' ),
      phetioDocumentation: 'The range for position of this object based on the radius and location of both objects',
      phetioType: PropertyIO( RangeIO )
    } );

    // @public (read-only) - Emitter that fires whenever the position changes as a result of an object's value changing.
    // Emits with the objectEnum that caused the position change.
    this.valueChangedPositionEmitter = new Emitter( { parameters: [ { valueType: ISLCObjectEnum } ] } );

    // @public - flag to check if the object is being dragged by the user
    //           set in the drag handler
    this.isDragging = false;

    // @public - flag to check whether object's radius was updated, used to determine positioning
    this.radiusLastChanged = false;

    // @public
    this.valueRange = valueRange;

    // @public {ISLCObjectEnum} - filled in by the model
    this.enum = null;

    // @public {Property.<Color>} - filled in by subtypes
    // - object node color is will change with value (linked in ISLCObjectNode.js)
    //   - color Property will be updated based on a boolean value (negative vs positive)
    //   - brightness will be set according to the Mass/Charge magnitude
    this.baseColorProperty = null;

    // @public (read-only) {number} - the radius of the object when radius is constant.
    this.constantRadius = options.constantRadius;
  }

  inverseSquareLawCommon.register( 'ISLCObject', ISLCObject );

  return inherit( Object, ISLCObject, {

    /**
     * Calculate radius for the object - must be implemented in subtypes.
     *
     * @public
     * @abstract
     * @param {number} value
     */
    calculateRadius: function( value ) {
      assert && assert( false, 'calculateRadius must be implemented in descendent types' );
    },

    /**
     * Resets object model properties.
     *
     * @public
     */
    reset: function() {
      this.valueProperty.reset();
      this.positionProperty.reset();
    }
  } );
} );