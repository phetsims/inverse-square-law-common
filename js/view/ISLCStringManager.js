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

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;

  const extremelyFarFromString = ISLCA11yStrings.extremelyFarFrom.value;
  const veryFarFromString = ISLCA11yStrings.veryFarFrom.value;
  const farFromString = ISLCA11yStrings.farFrom.value;
  const notSoCloseToString = ISLCA11yStrings.notSoCloseTo.value;
  const closeToString = ISLCA11yStrings.closeTo.value;
  const veryCloseToString = ISLCA11yStrings.veryCloseTo.value;
  const extremelyCloseToString = ISLCA11yStrings.extremelyCloseTo.value;

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
  const DISTANCE_STRINGS = [
    extremelyFarFromString,
    veryFarFromString,
    farFromString,
    notSoCloseToString,
    closeToString,
    veryCloseToString,
    extremelyCloseToString
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


        convertDistanceApart: distance => distance
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

      // @protected
      // TODO: consider always accessing model/object model properties through this.model
      // this would reserve this.object1 & this.object2
      this.model = model;
      this.object1 = model.object1;
      this.object2 = model.object2;
      this.object1Label = object1Label;
      this.object2Label = object2Label;
      this.convertDistanceApart = options.convertDistanceApart;

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
        distance: this.convertDistanceApart(this._distanceBetween),
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
      return this._convertForceValue( this.model.forceProperty.get() ) ;
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

    getSpherePositionAriaValueText( newPosition, oldPosition, objectNode ) {
      // if this is the first interaction after focus then we need the otherObject options
      // how to determine this? There will likely need to be something on the ISLCObjectNode to track
      // the number of interactions.
      /*
      addAccessibleInputListener: {
        focus: () => { this._justFocused = true; this._interactionCount = 0; },
        keydown: () => { this._interactionCount++; }
      }
      then, in the StringManager, we check if the interaction count < 2
      - if yes, first interaction, includeOtherObject = true
      - else, includeOtherObject = false

      then, we need to check the changed value has crossed a boundary
      this.positionRegionChanged( newValue, oldValue );
      if positionRegionChanged, use regionPattern, else, use progressPattern
       */
      const thisObjectEnum = objectNode.enum;
      const otherObjectLabel = thisObjectEnum === OBJECT_ONE ? 'object 1' : 'object 2';
      const includeOtherObject = objectNode.interactionCount < 2;
      const useRegionPattern = true;
      // const useRegionPattern = this.positionRegionChanged( newPosition, oldPosition );
      const movedCloser = thisObjectEnum === OBJECT_ONE ? newPosition > oldPosition : oldPosition > newPosition;
      const fillObject = {
        position: newPosition,
        size: this.getForceVectorSize()
      };

      let index = 0;

      if ( includeOtherObject ) {
        // use from/to language => impacts both progress and region
        index = 0;
        fillObject.otherObjectLabel = otherObjectLabel;
      }
      else {
        index = 1;
      }

      if ( useRegionPattern ) {
        index += 0;
        fillObject.region = this.getPositionRegionText( newPosition );
      }
      else {
        index += 2;
        fillObject.progress = movedCloser ? 'closer' : 'farther';
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
      return DISTANCE_STRINGS[ this.getDistanceIndex( this._distanceBetween ) ];
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