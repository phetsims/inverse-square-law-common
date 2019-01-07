// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  // const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  // const Util = require( 'DOT/Util' );

  // strings
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsMeterString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meter' );

  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value; // [object] position
  const distanceAndValueSummaryPatternString = ISLCA11yStrings.distanceAndValueSummaryPattern.value;

  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const progressDistanceFromOtherObjectPatternString = ISLCA11yStrings.progressDistanceFromOtherObjectPattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const lastStopDistanceFromOtherObjectPatternString = ISLCA11yStrings.lastStopDistanceFromOtherObjectPattern.value;

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
          this.distanceBetween = Math.abs( x1 - x2 );
          this.movedCloser = this.distanceBetween < this.oldDistanceBetween;
        }
      );
    }

    getObjectDistanceSummary() {
      const distance = this.convertedDistance;
      const { object1Label, object2Label, qualitativeDistance, units } = this;
      return StringUtils.fillIn(
        distanceAndValueSummaryPatternString,
        { object1Label, object2Label, qualitativeDistance, distance, units }
      );
    }

    getSpherePositionAriaValueText( thisObjectEnum, pattern, additionalFillObject ) {
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );
      const distance = this.convertedDistance;
      const units = this._distanceUnits;
      const fillObject = { distance, units, otherObjectLabel };
      return StringUtils.fillIn( pattern, _.extend( fillObject, additionalFillObject ) );
    }

    getDistanceFromOtherObjectText( thisObjectEnum ) {
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distanceFromOtherObjectPatternString,
        { units: this.units }
      );
    }

    getPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const position = this.getConvertedPositionFromEnum( thisObjectEnum );
      const unit = this.unit;
      const units = this.units;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        positionDistanceFromOtherObjectPatternString,
        { position, unit, units }
      );
    }

    getProgressPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const progress = this.movedCloser ? closerString : fartherAwayString;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        progressDistanceFromOtherObjectPatternString,
        { progress }
      );
    }

    getLastStopDistanceFromOtherObjectText( thisObjectEnum ) {
      const region = this.qualitativeDistance;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        lastStopDistanceFromOtherObjectPatternString,
        { region }
      );
    }

    // the createAriaValueText function is called AFTER the underlying property (position in this case) is updated
    // the PositionDescriber links to the position properties of the objects before initializeAccessibleSlider, thus
    // from the call of the returned function below, this.distanceBetween will be set to the latest value before the aria-valuetext
    // is set from AccessibleSlider
    ariaValueTextCreator( objectEnum ) {
      return ( formattedValue, oldValue ) => {
        const thisObject = this.getObjectFromEnum( objectEnum );
        let newAriaValueText = this.getDistanceFromOtherObjectText( objectEnum );

        if ( this.lastMoveCloser !== this.movedCloser ) {
          newAriaValueText = this.getProgressPositionAndDistanceFromOtherObjectText( objectEnum );
        }
        if ( thisObject.isAtEdgeOfRange() ) {
          // last stop
          newAriaValueText = this.getLastStopDistanceFromOtherObjectText( objectEnum );
        }
        return newAriaValueText;
      };
    }

    /***********************
     * Getters and setters *
     ***********************/

    /**
     * Returns the distance between the objects with the user-defined conversion applied.
     * @return {String}
     */
    get convertedDistance() {
      return this.convertDistanceMetric( this.distanceBetween );
    }

    /**
     * Returns the qualitative distance
     * @return {[type]} [description]
     */
    get qualitativeDistance() {
      return DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    get qualitativeRelativeDistance() {
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    getConvertedPositionFromEnum( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      return this.convertDistanceMetric( object.positionProperty.get() + this.centerOffset );
    }

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
     * @return {Integer}
     */
    getDistanceIndex( distance ) {
      throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
    }
  }

  return inverseSquareLawCommon.register( 'PositionDescriber', PositionDescriber );
} );