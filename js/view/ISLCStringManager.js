// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  // const LinearFunction = require( 'DOT/LinearFunction' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const massString = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass' );
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  const vectorSizePatternString = ISLCA11yStrings.vectorSizePattern.value;
  const vectorSizeValueUnitsPatternString = ISLCA11yStrings.vectorSizeValueUnitsPattern.value;
  const summaryInteractionHintPatternString = ISLCA11yStrings.summaryInteractionHintPattern.value;

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;
  const sizeStrings = [ tinyString, verySmallString, smallString, mediumSizeString,
                        largeString, veryLargeString, hugeString ];

  class ISLCStringManager {
    constructor( model, options ) {

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

      // @protected
      this.model = model;

      model.forceProperty.link( force => {
        this._vectorSizeIndex = this.getForceVectorIndex( force );
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

      fillObject.size = sizeStrings[ this._vectorSizeIndex ];

      if ( this.model.forceValuesProperty.get() ) {
        fillObject.units = this._valueUnits;
        fillObject.objectValue = Util.toFixedNumber( this.model.forceProperty.get() * this._valueUnitConversion, 7 );
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    // getObjectDistanceSummary() {
    //   return distanceSpaceAndValueSummaryPatternString;
    // }

    getForceVectorIndex( force ) {
      throw new Error( 'getForceVectorIndex must be implemented in subtypes' );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCStringManager', ISLCStringManager );
} );