// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  // const Util = require( 'DOT/Util' );

  // strings
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsMeterString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meter' );

  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value; // [object] position
  const distanceAndValueSummaryPatternString = ISLCA11yStrings.distanceAndValueSummaryPattern.value;
  const centersExactlyPatternString = ISLCA11yStrings.centersExactlyPattern.value;
  const quantitativeAndQualitativePatternString = ISLCA11yStrings.quantitativeAndQualitativePattern.value;

  const positionMarkPatternString = ISLCA11yStrings.positionMarkPattern.value;
  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const progressDistanceFromOtherObjectPatternString = ISLCA11yStrings.progressDistanceFromOtherObjectPattern.value;
  const farthestFromOtherObjectPatternString = ISLCA11yStrings.farthestFromOtherObjectPattern.value;
  const closestToOtherObjectPatternString = ISLCA11yStrings.closestToOtherObjectPattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const edgePositionDistanceFromOtherObjectPatternString = ISLCA11yStrings.edgePositionDistanceFromOtherObjectPattern.value;
  const lastStopDistanceFromOtherObjectPatternString = ISLCA11yStrings.lastStopDistanceFromOtherObjectPattern.value;

  const leftString = ISLCA11yStrings.left.value;
  const rightString = ISLCA11yStrings.right.value;
  const extremelyFarFromString = ISLCA11yStrings.extremelyFarFrom.value;
  const veryFarFromString = ISLCA11yStrings.veryFarFrom.value;
  const notSoFarFromString = ISLCA11yStrings.notSoFarFrom.value;
  const notSoCloseToString = ISLCA11yStrings.notSoCloseTo.value;
  const closeToString = ISLCA11yStrings.closeTo.value;
  const veryCloseToString = ISLCA11yStrings.veryCloseTo.value;
  const extremelyCloseToString = ISLCA11yStrings.extremelyCloseTo.value;

  const extremelyFarString = ISLCA11yStrings.extremelyFar.value;
  const veryFarString = ISLCA11yStrings.veryFar.value;
  const notSoFarString = ISLCA11yStrings.notSoFar.value;
  const notSoCloseString = ISLCA11yStrings.notSoClose.value;
  const closeString = ISLCA11yStrings.close.value;
  const veryCloseString = ISLCA11yStrings.veryClose.value;
  const extremelyCloseString = ISLCA11yStrings.extremelyClose.value;
  const closerString = ISLCA11yStrings.closer.value;
  const fartherAwayString = ISLCA11yStrings.fartherAway.value;

  const RELATIVE_DISTANCE_STRINGS = [
    extremelyFarFromString,
    veryFarFromString,
    notSoFarFromString,
    notSoCloseToString,
    closeToString,
    veryCloseToString,
    extremelyCloseToString
  ];

  const DISTANCE_STRINGS = [
    extremelyFarString,
    veryFarString,
    notSoFarString,
    notSoCloseString,
    closeString,
    veryCloseString,
    extremelyCloseString
  ];

  const { OBJECT_ONE } = ISLCObjectEnum;

  let describer = null;

  class PositionDescriber extends ISLCDescriber {
    constructor( model, object1Label, object2Label, options ) {
      super( model, object1Label, object2Label );

      options = _.extend( {
        unit: unitsMeterString,
        units: unitsMetersString,
        centerOffset: 0,
        convertDistanceMetric: distance => distance
      }, options );

      this.unit = options.unit;
      this.units = options.units;
      this.centerOffset = options.centerOffset;
      this.pushedObjectEnum = null;
      this.convertDistanceMetric = options.convertDistanceMetric;

      this.distanceBetween = 0;
      this.oldDistanceBetween = 0;
      this.lastMoveCloser = false;
      this.movedCloser = false;

      Property.multilink(
        [ this.object1.positionProperty, this.object2.positionProperty ],
        ( x1, x2 ) => {
          // set former values
          this.oldDistanceBetween = this.distanceBetween;
          this.lastMoveCloser = this.movedCloser;

          // update current values
          this.distanceBetween = this.convertDistanceMetric( Math.abs( x1 - x2 ) );

          // only set movedCloser if the user is manipulating the value, null otherwise for comparison on focus
          if ( this.object1.isDragging || this.object2.isDragging ) {
            this.movedCloser = this.distanceBetween < this.oldDistanceBetween;
          }
          else {
            this.movedCloser = null;
          }
        }
      );
    }

    /**
     * Returns the string used in the screen summary item displaying position information:
     * '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{units}} apart.'
     *
     * @param {boolean} [withoutQuantitative] - whether or not to omit the quantitative clause
     * @returns {string}
     */
    getObjectDistanceSummary( withoutQuantitative ) {
      const distance = this.convertedDistance;
      const { object1Label, object2Label, qualitativeDistance, units } = this;

      const qualitativeClause = StringUtils.fillIn(
        distanceAndValueSummaryPatternString,
        { object1Label, object2Label, qualitativeDistance }
      );
      const quantitativeClause = StringUtils.fillIn(
        centersExactlyPatternString,
        { distance, units }
      );

      return StringUtils.fillIn( quantitativeAndQualitativePatternString, {
          qualitativeClause: qualitativeClause,
          quantitativeClause: withoutQuantitative ? '' : quantitativeClause
        }
      );
    }

    /**
     * Helper function for dynamically creating the desired strings to set the aria-valuetext property for the desired
     * HTML objects.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @param  {string}  pattern
     * @param  {object}  additionalFillObject
     * @returns {string}
     * @private
     */
    getSpherePositionAriaValueText( thisObjectEnum, pattern, additionalFillObject ) {
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );
      const distance = this.convertedDistance;
      const units = this.units;
      const fillObject = { distance, units, otherObjectLabel };
      return StringUtils.fillIn( pattern, _.extend( fillObject, additionalFillObject ) );
    }

    /**
     * Returns the filled in string '{{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getDistanceFromOtherObjectText( thisObjectEnum ) {
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distanceFromOtherObjectPatternString
      );
    }

    /**
     * fillIn just the position mark clause of some sentences
     * @param {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getPositionMark( thisObjectEnum ) {
      const position = this.getConvertedPositionFromEnum( thisObjectEnum );
      const unit = this.unit;
      return StringUtils.fillIn( positionMarkPatternString, {
        position, unit
      } );
    }

    /**
     * Returns the string filled in string '{{position}} {{unit}} mark, {{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const positionMark = this.getPositionMark( thisObjectEnum );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        positionDistanceFromOtherObjectPatternString,
        { positionMark }
      );
    }

    /**
     * Returns the filled in string '{{progress}}, {{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getProgressPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const progress = this.movedCloser ? closerString : fartherAwayString;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        progressDistanceFromOtherObjectPatternString,
        { progress }
      );
    }

    /**
     * Returns the filled in string '{{position}} {{unit}} mark, {{side}} edge, {{distance}} {{units}} from {{otherObjectLabel}}'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getPositionAtEdgeAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const side = thisObjectEnum === OBJECT_ONE ? leftString : rightString;
      const positionMark = this.getPositionMark( thisObjectEnum );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        edgePositionDistanceFromOtherObjectPatternString,
        { positionMark, side }
      );
    }

    /**
     * Returns the filled in string 'Closest to {{otherObjectLabel}}, {{distance}} {{units}} away.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getClosestToOtherObjectText( thisObjectEnum ) {
      const positionMark = this.getPositionMark( thisObjectEnum );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        closestToOtherObjectPatternString,
        { positionMark }
      );
    }

    /**
     * Returns the filled in string 'Farthest from {{otherObjectLabel}}, {{distance}} {{units}} away.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getFarthestFromOtherObjectText( thisObjectEnum ) {
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        farthestFromOtherObjectPatternString
      );
    }

    /**
     * Returns the string '{{region}}, last stop, {{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getLastStopDistanceFromOtherObjectText( thisObjectEnum ) {
      const region = this.qualitativeDistance;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        lastStopDistanceFromOtherObjectPatternString,
        { region }
      );
    }

    /**
     * Returns the desired value for the ISLCObjectNodes' aria-valuetext attributes when they receive keyboard focus.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getFocusAriaValueText( thisObjectEnum ) {
      let text = this.getPositionAndDistanceFromOtherObjectText( thisObjectEnum );

      if ( this.objectAtEdge( thisObjectEnum ) ) {
        text = this.getPositionAtEdgeAndDistanceFromOtherObjectText( thisObjectEnum );
      }

      if ( this.objectsClosest ) {
        text = this.getClosestToOtherObjectText( thisObjectEnum );
      }

      return text;
    }

    /**
     * Returns a function used by AccessibleSlider to format its aria-valuetext attribute. Of note is that this function
     * is called AFTER the Slider's position Property has been set. Since, the PositionDescriber links to the PositionProperty
     * prior to the call to initializeAccessibleSlider, we can ensure that PositionDescribers dynamic properties (e.g. distanceBetween )
     * will be accurate when the below function is called.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {Function~inner}
     */
    ariaValueTextCreator( objectEnum ) {

      /**
       * Function passed to initializeAccessibleSlider as an option to format its aria-valuetext attribute when the underlying
       * property is changed via keyboard input.
       *
       * @param  {number} formattedValue - the position of the ISLCObject, trimmed to the appropriate number of decimal places
       * @param  {number} oldValue       - the old position
       * @returns {string}                - the string that will fill the aria-valuetext attribute
       */
      return ( formattedValue, oldValue ) => {
        let newAriaValueText = this.getDistanceFromOtherObjectText( objectEnum );

        if ( this.lastMoveCloser !== this.movedCloser ) {
          newAriaValueText = this.getProgressPositionAndDistanceFromOtherObjectText( objectEnum );
        }

        if ( this.objectAtEdge( objectEnum ) ) {
          newAriaValueText = this.getFarthestFromOtherObjectText( objectEnum );
        }

        if ( this.objectsClosest ) {
          newAriaValueText = this.getClosestToOtherObjectText( objectEnum );
        }

        return newAriaValueText;
      };
    }

    /**
     * Returns true if the model object associated with the passed-in enum is at the left/right boundary of the sim.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {Boolean}
     */
    objectAtEdge( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      const { min, max } = object.enabledRangeProperty.get();
      const edgeValue = objectEnum === OBJECT_ONE ? min : max;
      return object.positionProperty.get() === edgeValue;
    }

    /**
     * Returns true only if the objects are the minimum possible width apart given their current radii.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    get objectsClosest() {
      return this.distanceBetween === this.model.getSumRadiusWithSeparation();
    }

    /***********************
     * Getters and setters *
     ***********************/

    /**
     * Returns the distance between the objects with the user-defined conversion applied.
     * @returns {string}
     */
    get convertedDistance() {
      return this.distanceBetween;
    }

    /**
     * Returns the qualitative distance (e.g. 'close')
     * @returns {string}
     */
    get qualitativeDistance() {
      return DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    /**
     * The qualitative distance relative to another object (e.g. 'very far from')
     *
     * @returns {string}
     */
    get qualitativeRelativeDistance() {
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    /**
     * Returns the adjusted position of the passed object. Conversion function and offset are determined by PositionDescriber
     * constructor options.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {number}
     */
    getConvertedPositionFromEnum( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      return this.convertDistanceMetric( object.positionProperty.get() + this.centerOffset );
    }

    /**
     * Returns the filled in string '{{label}} position'.
     *
     * @param  {string} label
     * @returns {string}
     */
    static getObjectLabelPositionText( label ) {
      return StringUtils.fillIn( objectLabelPositionPatternString, { label } );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {ForceDescriber}
     */
    static getDescriber() {
      assert && assert( describer, 'describer has not yet been initialized' );
      return describer;
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( subtype ) {
      assert && assert( subtype, 'cannot initialize ForceDescriber without a subtype' );
      describer = subtype;
      return describer;
    }

    /**
     * Returns the mapped integer corresponding to the appropriate qualitative distance value. Since distances range from
     * km to pm, subtypes must implement this method.
     *
     * @abstract
     * @param  {Number} distance
     * @returns {Integer}
     */
    getDistanceIndex( distance ) {
      // TODO: uncomment and implement in Coulomb's Law
      // NOTE: as of 1/10/19, this only hits when using keyboard to move a ChargeNode when it's at its left/right boundary
      // throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
    }
  }

  return inverseSquareLawCommon.register( 'PositionDescriber', PositionDescriber );
} );