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
  const positionMeterMarkPatternString = ISLCA11yStrings.positionMeterMarkPattern.value;
  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value;
  const spherePositionProgressObjectPatternString = ISLCA11yStrings.spherePositionProgressObjectPattern.value;
  const spherePositionProgressPatternString = ISLCA11yStrings.spherePositionProgressPattern.value;
  const spherePositionRegionObjectPatternString = ISLCA11yStrings.spherePositionRegionObjectPattern.value;
  const spherePositionRegionPatternString = ISLCA11yStrings.spherePositionRegionPattern.value;
  const spherePositionRegionLastStopPatternString = ISLCA11yStrings.spherePositionRegionLastStopPattern.value;

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
  const closerToString = ISLCA11yStrings.closerTo.value;
  const fartherFromString = ISLCA11yStrings.fartherFrom.value;

  const extremelyFarString = ISLCA11yStrings.extremelyFar.value;
  const veryFarString = ISLCA11yStrings.veryFar.value;
  const notSoFarString = ISLCA11yStrings.notSoFar.value;
  const notSoCloseString = ISLCA11yStrings.notSoClose.value;
  const closeString = ISLCA11yStrings.close.value;
  const veryCloseString = ISLCA11yStrings.veryClose.value;
  const extremelyCloseString = ISLCA11yStrings.extremelyClose.value;
  const closerString = ISLCA11yStrings.closer.value;
  const fartherString = ISLCA11yStrings.farther.value;

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

  const RELATIVE_PROGRESS_STRINGS = [ closerToString, fartherFromString ];
  const PROGRESS_STRINGS = [ closerString, fartherString ];

  const PULL_EFFORT_STINGS = [
    veryHardString,
    hardString,
    moderatelyString,
    gentlyString,
    lighlyString,
    aLittleString,
    aTinyBitString
  ];

  const SPHERE_POSITION_PATTERN_STRINGS = [
    spherePositionRegionObjectPatternString,
    spherePositionRegionPatternString,
    spherePositionProgressObjectPatternString,
    spherePositionProgressPatternString
  ];

  const { OBJECT_ONE } = ISLCObjectEnum;

  class ISLCStringManager {
    constructor( model, object1Label, object2Label, options ) {

      // NOTE: consider options -> config
      //  - review dev meeting topic/issues for above
      options = _.extend( {
        modelValue: massString,
        valueUnits: unitsNewtonsString,
        distanceUnits: unitsMetersString,
        valueUnitConversion: 1,

        /**
         * Handles custom defined formatting of the underlying object value if needed by subtypes.
         * E.g. for converting 1e-6 newtons to 1 micronewton
         * @param  {Number} value the model's forceProperty
         * @return {String}       value converted to value and units string
         */
        convertForceValue: value => `${value} newtons`,


        convertDistanceMetric: distance => distance
      }, options );

      // @private
      this._modelValue = options.modelValue;
      this._distanceUnits = options.distanceUnits;
      this._valueUnits = options.valueUnits;
      this._valueUnitConversion = options.valueUnitConversion;
      this._vectorSizeIndex = 0;
      this._distanceBetween = 0;
      this._effortIndex = 0;
      this._convertForceValue = options.convertForceValue;
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

      this.object1ValueChangedAlertText = '';
      this.object2ValueChangedAlertText = '';

      model.forceProperty.link( force => {
        this._vectorSizeIndex = this.getForceVectorIndex( force );
        this._effortIndex = this.getEffortIndex( force );
      } );

      Property.multilink(
        [ this.object1.positionProperty,
          this.object2.positionProperty ],
        ( x1, x2 ) => {
          // TODO: consider whether to calculate center to center or surface to surface or both
          var newDistance = Math.abs( x1 - x2 );
          this._regionChanged = this.getPositionRegionChanged( newDistance, this._distanceBetween );
          this._movedCloser = newDistance < this._distanceBetween;
          this._distanceBetween = newDistance;
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
                      vectorSizeValueUnitsPatternString :
                      vectorSizePatternString;

      fillObject.size = this.getForceVectorSize();

      if ( this.model.forceValuesProperty.get() ) {
        // fillObject.units = this._valueUnits;
        fillObject.objectValueUnits = this._convertForceValue( this.model.forceProperty.get() );
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    getObjectDistanceSummary() {
      const fillObject = {
        object1Label: this.object1Label,
        object2Label: this.object2Label,
        qualitativeDistance: this.getQualitativeDistance(),
        distance: this.convertDistanceMetric( this._distanceBetween ),
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

    // objectValue may need to handle returning the value and units
    getForceVectorMagnitudeText() {
      const pattern = forceVectorMagnitudePatternString;
      const fillObject = {
        objectValueUnits: this.getForceValueText()
      };
      return StringUtils.fillIn( pattern, fillObject );
    }

    getForceValueText() {
      return this._convertForceValue( this.model.forceProperty.get() );
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
      return StringUtils.fillIn( pattern, { units: this._valueUnits } );
    }

    getSpherePositionAndRegionText( position, objectEnum ) {
      position = this.formatPositionUnitMark( position );
      const otherObjectLabel = objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
      const region = RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ];
      const units = this._distanceUnits;
      const fillObject =  { position, otherObjectLabel, region, units };
      return StringUtils.fillIn( spherePositionRegionObjectPatternString, fillObject );
    }

    getSpherePositionAriaValueText( formattedPosition, objectNode ) {
      const thisObject = objectNode.enum === OBJECT_ONE ? this.object1 : this.object2;
      const otherObjectLabel = objectNode.enum === OBJECT_ONE ? this.object2Label : this.object1Label;
      const includeOtherObject = objectNode.interactionCount < 2;
      const regionStringArray = includeOtherObject ? RELATIVE_DISTANCE_STRINGS : DISTANCE_STRINGS;
      const progressStringArray = includeOtherObject ? RELATIVE_PROGRESS_STRINGS : PROGRESS_STRINGS;
      const fillObject = { position: this.formatPositionUnitMark( formattedPosition ) };

      const objectPosition = thisObject.positionProperty.get();
      const { min, max } = thisObject.enabledRangeProperty.get();
      if ( objectPosition === min || objectPosition === max ) {
        fillObject.region = DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ];
        return StringUtils.fillIn( spherePositionRegionLastStopPatternString, fillObject );
      }

      // TODO: document logic
      let index = 0;

      if ( includeOtherObject ) {
        fillObject.otherObjectLabel = otherObjectLabel;
      }
      else {
        index = 1;
      }

      if ( this._regionChanged ) {
        fillObject.region = regionStringArray[ this.getDistanceIndex( this._distanceBetween ) ];
      }
      else {
        index += 2;
        fillObject.progress = this._movedCloser ? progressStringArray[ 0 ] : progressStringArray[ 1 ];
      }

      const pattern = SPHERE_POSITION_PATTERN_STRINGS[ index ];

      return StringUtils.fillIn( pattern, fillObject );
    }

    getPositionRegionText( position ) {
      if ( position > 4 ) {
        return 'very far';
      }
      else {
        return 'extremely close';
      }
    }

    getQualitativeDistance() {
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ];
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