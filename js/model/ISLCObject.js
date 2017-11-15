// Copyright 2017, University of Colorado Boulder

/**
 * Common type for items in inverse square law sims.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Range = require( 'DOT/Range' );
  var Tandem = require( 'TANDEM/Tandem' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );

  // phet-io modules
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * @constructor
   * @param {number} initialValue
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  function ISLCObject( initialValue, initialPosition, valueRange, constantRadiusProperty, tandem, options ) {

    var self = this;

    options = _.extend( {
      leftObjectBoundary: ISLCConstants.LEFT_OBJECT_BOUNDARY,
      rightObjectBoundary: ISLCConstants.RIGHT_OBJECT_BOUNDARY,

      tandem: Tandem.tandemRequired(), // tandem optional until sim is instrumented - TODO: come back to this
      tandemUnits: 'kilograms',
    }, options );

    // @public
    this.positionProperty = new NumberProperty( initialPosition, {
      tandem: tandem.createTandem( 'positionProperty' ),
      units: 'meters',
      range: new Range( options.leftObjectBoundary, options.rightObjectBoundary )
    } );

    // @public
    this.valueProperty = new NumberProperty( initialValue, {
      tandem: tandem.createTandem( 'valueProperty' ),
      units: options.tandemUnits,
      range: valueRange
    } );

    // @public - mass radius will change with value
    // since ISLCObjects are never destroyed, we do not need to dispose of this property
    this.radiusProperty = new DerivedProperty(
      [ this.valueProperty, constantRadiusProperty ],
      function( valueProperty, constantRadius ) {
        return constantRadius ? options.constantRadius : self.calculateRadius( valueProperty );
      }, {
        tandem: tandem.createTandem( 'radiusProperty' ),
        units: 'meters',
        phetioType: DerivedPropertyIO( TNumber )
      }
    );

    // @public - flag to check if the object is being dragged by the user
    //           set in the drag handler
    this.isDragging = false;

    // @public - flag to check whether object's radius was updated, used to determine positioning
    this.radiusLastChanged = false;

    this.valueRange = valueRange;
  }

  inverseSquareLawCommon.register( 'ISLCObject', ISLCObject );

  return inherit( Object, ISLCObject, {

    /**
     * Calculate radius for the object - must be implemented in subtypes.
     */
    calculateRadius: function() {
      throw new Error( 'calculateRadius must be implemented in descendent types' );
    }
  } );

} );
