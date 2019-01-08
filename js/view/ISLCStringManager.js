// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  // const LinearFunction = require( 'DOT/LinearFunction' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Property = require( 'AXON/Property' );
  const ScientificNotationNode = require( 'SCENERY_PHET/ScientificNotationNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const massString = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass' );
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  const summaryVectorSizePatternString = ISLCA11yStrings.summaryVectorSizePattern.value;
  const summaryVectorSizeValueUnitsPatternString = ISLCA11yStrings.summaryVectorSizeValueUnitsPattern.value;
  const summaryInteractionHintPatternString = ISLCA11yStrings.summaryInteractionHintPattern.value;
  const distanceAndValueSummaryPatternString = ISLCA11yStrings.distanceAndValueSummaryPattern.value;
  const robotPullSummaryPatternString = ISLCA11yStrings.robotPullSummaryPattern.value;
  const robotPushSummaryPatternString = ISLCA11yStrings.robotPushSummaryPattern.value;

  const vectorSizePatternString = ISLCA11yStrings.vectorSizePattern.value;
  const forceVectorSizePatternString = ISLCA11yStrings.forceVectorSizePattern.value;
  const vectorSizeForcesValuePatternString = ISLCA11yStrings.vectorSizeForcesValuePattern.value;
  const vectorSizeForcesNowValuePatternString = ISLCA11yStrings.vectorSizeForcesNowValuePattern.value;

  // sphere strings
  const forceVectorMagnitudePatternString = ISLCA11yStrings.forceVectorMagnitudePattern.value;
  const forceAndVectorPatternString = ISLCA11yStrings.forceAndVectorPattern.value;
  const positionMeterMarkPatternString = ISLCA11yStrings.positionMeterMarkPattern.value;
  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value;
  const spherePositionRegionObjectPatternString = ISLCA11yStrings.spherePositionRegionObjectPattern.value;

  /* new from 12/11/18 */
  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const progressDistanceFromOtherObjectPatternString = ISLCA11yStrings.progressDistanceFromOtherObjectPattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const lastStopDistanceFromOtherObjectPatternString = ISLCA11yStrings.lastStopDistanceFromOtherObjectPattern.value;

  const getBiggerString = ISLCA11yStrings.getBigger.value;
  const getSmallerString = ISLCA11yStrings.getSmaller.value;

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;

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

  const veryHardString = ISLCA11yStrings.veryHard.value;
  const hardString = ISLCA11yStrings.hard.value;
  const moderatelyString = ISLCA11yStrings.moderately.value;
  const gentlyString = ISLCA11yStrings.gently.value;
  const lighlyString = ISLCA11yStrings.lighly.value;
  const aLittleString = ISLCA11yStrings.aLittle.value;
  const aTinyBitString = ISLCA11yStrings.aTinyBit.value;

  const scientificNotationPatternString = ISLCA11yStrings.scientificNotationPattern.value;
  const negativeValuePatternString = ISLCA11yStrings.negativeValuePattern.value;
  const valuePatternString = ISLCA11yStrings.valuePattern.value;
  const valuesInUnitsPatternString = ISLCA11yStrings.valuesInUnitsPattern.value;

  const SIZE_STRINGS = [
    tinyString,
    verySmallString,
    smallString,
    mediumSizeString,
    largeString,
    veryLargeString,
    hugeString
  ];
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

  // const RELATIVE_PROGRESS_STRINGS = [ closerToString, fartherAwayFromString ];
  // const PROGRESS_STRINGS = [ closerString, fartherAwayString ];

  const PULL_EFFORT_STINGS = [
    veryHardString,
    hardString,
    moderatelyString,
    gentlyString,
    lighlyString,
    aLittleString,
    aTinyBitString
  ];

  // const SPHERE_POSITION_PATTERN_STRINGS = [
  //   spherePositionRegionObjectPatternString,
  //   spherePositionRegionPatternString,
  //   spherePositionProgressObjectPatternString,
  //   spherePositionProgressPatternString
  // ];

  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  class ISLCStringManager {
    constructor( model, object1Label, object2Label, options ) {

      // NOTE: consider options -> config
      //  - review dev meeting topic/issues for above
      options = _.extend( {
        modelValue: massString,
        valueUnits: unitsNewtonsString,
        distanceUnits: unitsMetersString,
        valueUnitConversion: 1,
        centerOffset: 0,

        /**
         * Handles custom defined formatting of the underlying object value if needed by subtypes.
         * E.g. for converting 1e-6 newtons to 1 micronewton
         * @param  {Number} value the model's forceProperty
         * @returns {String}       value converted to value and units string
         */
        forceValueToString: value => `${value} newtons`,


        convertDistanceMetric: distance => distance
      }, options );

      // @private
      this._modelValue = options.modelValue;
      this._distanceUnits = options.distanceUnits;
      this._valueUnitConversion = options.valueUnitConversion;
      this._vectorSizeIndex = 0;
      this._distanceBetween = 0;
      this._effortIndex = 0;
      this._forceValueToString = options.forceValueToString;
      this._regionChanged = false;
      this._movedCloser = false;

      // @protected
      // TODO: consider always accessing model/object model properties through this.model
      // this would reserve this.object1 & this.object2
      this.model = model;
      this.object1 = model.object1;
      this.object2 = model.object2;
      this.object1Label = object1Label;
      this.object2Label = object2Label;
      this.convertDistanceMetric = options.convertDistanceMetric;
      this.valueUnits = options.valueUnits;

      this.object1ValueChangedAlertText = '';
      this.object2ValueChangedAlertText = '';

      model.forceProperty.link( force => {
        this._vectorSizeIndex = this.getForceVectorIndex( force );
        this._effortIndex = this.getEffortIndex( force );
      } );

      Property.multilink(
        [ this.object1.positionProperty, this.object2.positionProperty ],
        ( x1, x2 ) => {
          this._distanceBetween = Math.abs( x1 - x2 );
        }
      );

      model.object1.valueProperty.link( ( value, oldValue ) => {
        /*
         * set the alert text for object1
         * - how to check if the mass change will move the other object
         */
        // set all text related to object1

      } );

      model.object2.valueProperty.link( ( value, oldValue ) => {
        // set the alert text for object2
      } );
    }

    /////////////////////
    // Summary Strings //
    /////////////////////

    getSummaryInteractionHint() {
      return StringUtils.fillIn(
        summaryInteractionHintPatternString,
        { massOrCharge: this._modelValue }
      );
    }

    getForceVectorsSummaryText() {
      const fillObject = {};
      const pattern = this.model.forceValuesProperty.get() ?
                      summaryVectorSizeValueUnitsPatternString :
                      summaryVectorSizePatternString;

      fillObject.size = this.getForceVectorSize();

      if ( this.model.forceValuesProperty.get() ) {
        // fillObject.units = this.valueUnits;
        fillObject.objectValueUnits = this._forceValueToString( this.model.forceProperty.get() );
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    getObjectDistanceSummary() {
      const fillObject = {
        object1Label: this.object1Label,
        object2Label: this.object2Label,
        qualitativeDistance: this.getRelativeDistanceText(),
        distance: this.convertDistanceMetric( this._distanceBetween ),
        distanceUnits: this._distanceUnits
      };
      return StringUtils.fillIn( distanceAndValueSummaryPatternString, fillObject );
    }

    getRobotEffortSummaryText() {
      const pattern = this.model.forceProperty.get() < 0 ?
                      robotPushSummaryPatternString :
                      robotPullSummaryPatternString;
      const effort = PULL_EFFORT_STINGS[ this._effortIndex ];
      return StringUtils.fillIn( pattern, { effort } );
    }

    getForceVectorsChangedAlertText( vectorsGrowing ) {
      const changeOrSize = vectorsGrowing ? getBiggerString : getSmallerString;
      const valueAndUnits = this.getForceValueText();
      const fillObject = { changeOrSize };

      let pattern = vectorSizePatternString;

      if ( this.model.forceValuesProperty.get() ) {
        pattern = vectorSizeForcesNowValuePatternString;
        fillObject.valueAndUnits = valueAndUnits;
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    getForceVectorStateAlertText() {
      const size = this.getForceVectorSize();
      const fillObject = { size };
      let pattern = forceVectorSizePatternString;

      if ( this.model.forceValuesProperty.get() ) {
        pattern = vectorSizeForcesValuePatternString;
        fillObject.valueAndUnits = this.getForceValueText();
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    // TODO: string usage
    getPositionFocusAlertText() {
      const pattern = 'Force vectors {{size}}';
      const size = this.getForceVectorSize();
      return StringUtils.fillIn( pattern, { size } );
    }
    getForceVectorMagnitudeText() {
      const pattern = forceVectorMagnitudePatternString;
      const fillObject = {
        objectValueUnits: this.getForceValueText()
      };
      return StringUtils.fillIn( pattern, fillObject );
    }

    getForceValueText() {
      return this._forceValueToString( this.model.forceProperty.get() );
    }

    getForceBetweenAndVectorText( thisObject, otherObject ) {
      const pattern = forceAndVectorPatternString;
      const fillObject = {
        thisObject,
        otherObject,
        size: this.getForceVectorSize()
      };
      return StringUtils.fillIn( pattern, fillObject );
    }

    getForceValuesInUnitsText() {
      const pattern = valuesInUnitsPatternString;
      return StringUtils.fillIn( pattern, { units: this.valueUnits } );
    }

    getSpherePositionAriaValueText( thisObjectEnum, distance, pattern, additionalFillObject ) {
      const otherObjectLabel = this.getOtherObjectLabel( thisObjectEnum );
      distance = this.convertDistanceMetric( distance );
      const units = this._distanceUnits;
      const fillObject = { distance, units, otherObjectLabel };
      return StringUtils.fillIn( pattern, _.extend( fillObject, additionalFillObject ) );
    }

    getDistanceFromOtherObjectText( thisObjectEnum, distance ) {
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distance,
        distanceFromOtherObjectPatternString,
        {}
      );
    }

    getPositionAndDistanceFromOtherObjectText( thisObjectEnum, distance = this._distanceBetween ) {
      const { thisObject } = this.getObjectsFromEnum( thisObjectEnum );
      let position = this.convertDistanceMetric( thisObject.positionProperty.get() + this.centerOffset );
      position = this.formatPositionUnitMark( position );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distance,
        positionDistanceFromOtherObjectPatternString,
        { position }
      );
    }

    getProgressPositionAndDistanceFromOtherObjectText( thisObjectEnum, closer, distance = this._distanceBetween ) {
      const progress = closer ? closerString : fartherAwayString;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distance,
        progressDistanceFromOtherObjectPatternString,
        { progress }
      );
    }

    getLastStopDistanceFromOtherObjectText( thisObjectEnum, distance = this._distanceBetween ) {
      const region = this.getRegionTextFromDistance( distance );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distance,
        lastStopDistanceFromOtherObjectPatternString,
        { region }
      );
    }

    getOtherObjectLabel( thisObjectEnum ) {
      return thisObjectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
    }

    getObjectsFromEnum( objectEnum ) {
      let thisObject = this.object1;
      let otherObject = this.object2;
      if ( objectEnum === OBJECT_TWO ) {
        thisObject = this.object2;
        otherObject = this.object1;
      }
      return { thisObject, otherObject };
    }

    getObjectPositionsFromEnum( thisObjectEnum ) {
      const { thisObject, otherObject } = this.getObjectsFromEnum( thisObjectEnum );
      const thisObjectPosition = thisObject.positionProperty.get();
      const otherObjectPosition = otherObject.positionProperty.get();
      return { thisObjectPosition, otherObjectPosition };
    }

    getSpherePositionAndRegionText( position, objectEnum ) {
      position = this.formatPositionUnitMark( position );
      const otherObjectLabel = objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
      const region = RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ];
      const units = this._distanceUnits;
      const fillObject =  { position, otherObjectLabel, region, units };
      return StringUtils.fillIn( spherePositionRegionObjectPatternString, fillObject );
    }

    getRegionTextFromDistance( distance ) {
      return DISTANCE_STRINGS[ this.getDistanceIndex( distance ) ];
    }

    getDistanceRegionText() {
      const distanceBetween = Math.abs( this.object1.positionProperty.get() - this.object2.positionProperty.get() );
      return this.getRegionTextFromDistance( distanceBetween );
    }

    getRelativeDistanceText() {
      const distanceBetween = Math.abs( this.object1.positionProperty.get() - this.object2.positionProperty.get() );
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( distanceBetween ) ];
    }

    static getPositionMeterMarkText( positionUnit ) {
      return StringUtils.fillIn( positionMeterMarkPatternString, { positionUnit } );
    }

    static getObjectLabelPositionText( label ) {
      return StringUtils.fillIn( objectLabelPositionPatternString, { label } );
    }

    static getForceInScientificNotation( forceValue, mantissaDecimalPlaces ) {
      const { mantissa, exponent } = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces } );
      const mantissaPattern = mantissa < 0 ? negativeValuePatternString : valuePatternString; // negative values are possible in Coulomb's Law
      const mantissaString = StringUtils.fillIn( mantissaPattern, { value: Math.abs( mantissa ) } );
      const exponentPattern = exponent < 0 ? negativeValuePatternString : valuePatternString;
      const exponentString = StringUtils.fillIn( exponentPattern, { value: Math.abs( exponent ) } );
      const pattern = scientificNotationPatternString;
      return StringUtils.fillIn( pattern, { mantissa: mantissaString, exponent: exponentString } );
    }

    getSizeFromIndex( index ) {
      return SIZE_STRINGS[ index ];
    }

    getForceVectorSize() {
      return SIZE_STRINGS[ this._vectorSizeIndex ];
    }

    getConvertedObjectValue( decimalPlaces = 7 ) {
      return Util.toFixedNumber( this.model.forceProperty.get() * this._valueUnitConversion, decimalPlaces );
    }

    getPositionRegionChanged( newDistance, oldDistance ) {
      throw new Error( 'getPositionRegionChanged MUST be implemented in subtypes.' );
    }

    getForceVectorIndex( force ) {
      throw new Error( 'getForceVectorIndex MUST be implemented in subtypes.' );
    }

    getDistanceIndex( distance ) {
      throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
    }

    getEffortIndex( force ) {
      throw new Error( 'getEffortIndex MUST be implemented in subtypes.' );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCStringManager', ISLCStringManager );
} );