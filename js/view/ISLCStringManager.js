// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  // const LinearFunction = require( 'DOT/LinearFunction' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const massString = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass' );
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  const vectorSizePatternString = ISLCA11yStrings.vectorSizePattern.value;
  const vectorSizeValueUnitsPatternString = ISLCA11yStrings.vectorSizeValueUnitsPattern.value;
  const summaryInteractionHintPatternString = ISLCA11yStrings.summaryInteractionHintPattern.value;
  const distanceSpaceAndValueSummaryPatternString = ISLCA11yStrings.distanceSpaceAndValueSummaryPattern.value;
  const robotPullSummaryPatternString = ISLCA11yStrings.robotPullSummaryPattern.value;
  const robotPushSummaryPatternString = ISLCA11yStrings.robotPushSummaryPattern.value;

  // sphere strings
  // const spherePositionHelpTextString = ISLCA11yStrings.spherePositionHelpText.value;
  const forceVectorMagnitudePatternString = ISLCA11yStrings.forceVectorMagnitudePattern.value;
  const forceAndVectorPatternString = ISLCA11yStrings.forceAndVectorPattern.value;

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
  const somewhatCloseToString = ISLCA11yStrings.somewhatCloseTo.value;
  const closeToString = ISLCA11yStrings.closeTo.value;
  const veryCloseToString = ISLCA11yStrings.veryCloseTo.value;
  const nextToString = ISLCA11yStrings.nextTo.value;
  const rightNextToString = ISLCA11yStrings.rightNextTo.value;

  const veryHardString = ISLCA11yStrings.veryHard.value;
  const hardString = ISLCA11yStrings.hard.value;
  const moderatelyString = ISLCA11yStrings.moderately.value;
  const gentlyString = ISLCA11yStrings.gently.value;
  const lighlyString = ISLCA11yStrings.lighly.value;
  const aLittleString = ISLCA11yStrings.aLittle.value;
  const aTinyBitString = ISLCA11yStrings.aTinyBit.value;

  // TODO: create type to handle string arrays mapped from a given value
  const SIZE_STRINGS = [
    tinyString,
    verySmallString,
    smallString,
    mediumSizeString,
    largeString,
    veryLargeString,
    hugeString
  ];
  const DISTANCE_STRINGS = [
    extremelyFarFromString,
    veryFarFromString,
    notSoFarFromString,
    somewhatCloseToString,
    closeToString,
    veryCloseToString,
    nextToString,
    rightNextToString
  ];
  const PULL_EFFORT_STINGS = [
    veryHardString,
    hardString,
    moderatelyString,
    gentlyString,
    lighlyString,
    aLittleString,
    aTinyBitString
  ];

  class ISLCStringManager {
    constructor( model, object1Label, object2Label, options ) {

      // NOTE: consider options -> config
      //  - review dev meeting topic/issues for above
      options = _.extend( {
        modelValue: massString,
        valueUnits: unitsNewtonsString,
        distanceUnits: unitsMetersString,
        valueUnitConversion: 1
      }, options );

      // @private
      this._modelValue = options.modelValue;
      this._distanceUnits = options.distanceUnits;
      this._valueUnits = options.valueUnits;
      this._valueUnitConversion = options.valueUnitConversion;
      this._vectorSizeIndex = 0;
      this._distanceBetween = 0;
      this._effortIndex = 0;

      // @protected
      this.model = model;
      this.object1 = model.object1;
      this.object2 = model.object2;
      this.object1Label = object1Label;
      this.object2Label = object2Label;

      model.forceProperty.link( force => {
        this._vectorSizeIndex = this.getForceVectorIndex( force );
        this._effortIndex = this.getEffortIndex( force );
      } );

      Property.multilink(
        [ this.object1.positionProperty,
          this.object2.positionProperty ],
        ( x1, x2 ) => {
          // TODO: consider whether to calculate center to center or surface to surface or both
          this._distanceBetween = Util.toFixedNumber( Math.abs( x1 - x2 ), 2 );
        }
      );
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
                      vectorSizeValueUnitsPatternString :
                      vectorSizePatternString;

      fillObject.size = this.getForceVectorSize();

      if ( this.model.forceValuesProperty.get() ) {
        fillObject.units = this._valueUnits;
        fillObject.objectValue = this.getConvertedObjectValue();
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    getObjectDistanceSummary() {
      const fillObject = {
        object1Label: this.object1Label,
        object2Label: this.object2Label,
        qualitativeDistance: DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ],
        distance: this._distanceBetween,
        distanceUnits: this._distanceUnits
      };
      return StringUtils.fillIn( distanceSpaceAndValueSummaryPatternString, fillObject );
    }

    getRobotEffortSummaryText() {
      const pattern = this.model.forceProperty.get() < 0 ?
                      robotPushSummaryPatternString :
                      robotPullSummaryPatternString;
      const effort = PULL_EFFORT_STINGS[ this._effortIndex ];
      return StringUtils.fillIn( pattern, { effort } );
    }

    getForceVectorMagnitudeText() {
      const pattern = forceVectorMagnitudePatternString;
      const fillObject = {
        objectValue: this.getConvertedObjectValue(),
        units: this._valueUnits
      };
      return StringUtils.fillIn( pattern, fillObject );
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

    getSizeFromIndex( index ) {
      return SIZE_STRINGS[ index ];
    }

    getForceVectorSize() {
      return SIZE_STRINGS[ this._vectorSizeIndex ];
    }

    getConvertedObjectValue( decimalPlaces = 7 ) {
      return Util.toFixedNumber( this.model.forceProperty.get() * this._valueUnitConversion, decimalPlaces );
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