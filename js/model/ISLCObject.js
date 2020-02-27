// Copyright 2017-2020, University of Colorado Boulder

/**
 * Common type for model items in inverse square law sims.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../axon/js/DerivedPropertyIO.js';
import Emitter from '../../../axon/js/Emitter.js';
import NumberProperty from '../../../axon/js/NumberProperty.js';
import Property from '../../../axon/js/Property.js';
import PropertyIO from '../../../axon/js/PropertyIO.js';
import Range from '../../../dot/js/Range.js';
import RangeIO from '../../../dot/js/RangeIO.js';
import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import NumberIO from '../../../tandem/js/types/NumberIO.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import ISLCConstants from '../ISLCConstants.js';
import ISLCObjectEnum from '../view/ISLCObjectEnum.js';

/**
 * @param {number} initialMass
 * @param {Vector2} initialPosition
 * @param {Range} valueRange
 * @param {Property.<boolean>} constantRadiusProperty
 * @param {function(mass:number):number} calculateRadius - function to get the radius based on the mass
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function ISLCObject( initialMass, initialPosition, valueRange, constantRadiusProperty, calculateRadius, tandem, options ) {

  options = merge( {

    // in meters
    leftObjectBoundary: ISLCConstants.LEFT_OBJECT_BOUNDARY,
    rightObjectBoundary: ISLCConstants.RIGHT_OBJECT_BOUNDARY,
    constantRadius: ISLCConstants.CONSTANT_RADIUS, // radius when constant

    valueUnits: 'kilograms',
    valueStep: null
  }, options );

  // @public
  this.positionProperty = new NumberProperty( initialPosition, {
    tandem: tandem.createTandem( 'positionProperty' ),
    units: 'meters',
    range: new Range( options.leftObjectBoundary, options.rightObjectBoundary ),
    phetioDocumentation: 'The position of the object along the track, in meters. The origin is in the center between the two objects.',
    phetioStudioControl: false // temporary workaround until we support dynamic ranges in https://github.com/phetsims/gravity-force-lab/issues/172
  } );

  // @public {Property.<number>} - the mass or charge of the object in kilograms or coulombs
  this.valueProperty = new NumberProperty( initialMass, {
    tandem: tandem.createTandem( 'valueProperty' ),
    range: valueRange,
    units: options.valueUnits,
    phetioDocumentation: 'The value of the object',
    step: options.valueStep
  } );

  // @public (read-only) {function(mass:number):number}
  this.calculateRadius = calculateRadius;

  // @public {Property.<number>} - the radius of the mass or charge in meters
  // since ISLCObjects are never destroyed, no need to dispose
  this.radiusProperty = new DerivedProperty( [ this.valueProperty, constantRadiusProperty ],
    ( objectValue, constantRadius ) => {
      return constantRadius ? options.constantRadius : calculateRadius( objectValue );
    }, {
      tandem: tandem.createTandem( 'radiusProperty' ),
      phetioDocumentation: 'The radius of the object',
      units: 'meters',
      phetioType: DerivedPropertyIO( NumberIO )
    }
  );

  const enabledRange = new Range( options.leftObjectBoundary, options.rightObjectBoundary );

  // @public {Property.<Range>}- set by ISLCModel when the force changes, the range for position of the objects
  // based on their radius and position
  this.enabledRangeProperty = new Property( enabledRange, {
    tandem: tandem.createTandem( 'enabledRangeProperty' ),
    phetioDocumentation: 'The range for position of this object based on the radius and position of both objects',
    phetioType: PropertyIO( RangeIO ),
    phetioReadOnly: true
  } );

  // @public (read-only) - Emitter that fires whenever the position changes as a result of an object's value changing.
  // Emits with the objectEnum that caused the position change.
  this.positionChangedFromSecondarySourceEmitter = new Emitter( { parameters: [ { valueType: ISLCObjectEnum } ] } );

  // @public - flag to check if the object is being dragged by the user
  //           set in the drag handler
  this.isDragging = false;

  // @public - flag to check whether object's radius was updated, used to determine positioning
  this.radiusLastChanged = false;

  // @private - flag flipped when the value change is updated. This is used to check if a position change is caused
  // from a value change. See https://github.com/phetsims/gravity-force-lab-basics/issues/168
  this.valueChangedSinceLastStep = false;

  // @public (read-only) - flag flipped when the constant radius boolean is toggled. This is used to check if a position change is
  // caused from the constant radius toggling. See https://github.com/phetsims/gravity-force-lab-basics/issues/168
  this.constantRadiusChangedSinceLastStep = false;

  // @public
  this.valueRange = valueRange;

  // @public {ISLCObjectEnum|null} - filled in by ISLCModel
  this.enum = null;

  // @public {Property.<Color>} - filled in by subtypes
  // - object node color is will change with value (linked in ISLCObjectNode.js)
  //   - color Property will be updated based on a boolean value (negative vs positive)
  //   - brightness will be set according to the Mass/Charge magnitude
  this.baseColorProperty = null;

  // @public (read-only) {number} - the radius of the object when radius is constant.
  this.constantRadius = options.constantRadius;

  // Link these flags to their associatedProperties
  this.valueProperty.link( () => { this.valueChangedSinceLastStep = true; } );
  constantRadiusProperty.link( () => { this.constantRadiusChangedSinceLastStep = true; } );
}

inverseSquareLawCommon.register( 'ISLCObject', ISLCObject );

export default inherit( Object, ISLCObject, {

  /**
   * Clear flags that keep track of data that needs to be kept track of until the next step function is called.
   * @public
   */
  onStepEnd: function() {
    this.valueChangedSinceLastStep = false;
    this.constantRadiusChangedSinceLastStep = false;
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