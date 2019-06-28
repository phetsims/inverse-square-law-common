// Copyright 2018-2019, University of Colorado Boulder

/**
 * Responsible for logic associated with the formation of audio description strings related to the model
 * force and interactions associated with the changes in force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const ScientificNotationNode = require( 'SCENERY_PHET/ScientificNotationNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  // a11y strings
  const forceVectorArrowsString = ISLCA11yStrings.forceVectorArrows.value;
  const summaryVectorSizePatternString = ISLCA11yStrings.summaryVectorSizePattern.value;
  const summaryVectorSizeValueUnitsPatternString = ISLCA11yStrings.summaryVectorSizeValueUnitsPattern.value;
  const forceVectorMagnitudeUnitsPatternString = ISLCA11yStrings.forceVectorMagnitudeUnitsPattern.value;
  const forceAndVectorPatternString = ISLCA11yStrings.forceAndVectorPattern.value;
  const robotPullSummaryPatternString = ISLCA11yStrings.robotPullSummaryPattern.value;
  const robotPushSummaryPatternString = ISLCA11yStrings.robotPushSummaryPattern.value;
  const vectorsString = ISLCA11yStrings.vectors.value;
  const vectorsSizeClausePatternString = ISLCA11yStrings.vectorsSizeClausePattern.value;
  const forcesValueUnitsClausePatternString = ISLCA11yStrings.forcesValueUnitsClausePattern.value;

  const valuesInUnitsPatternString = ISLCA11yStrings.valuesInUnitsPattern.value;
  const forcesInScientificNotationString = ISLCA11yStrings.forcesInScientificNotation.value;

  const vectorChangePatternString = ISLCA11yStrings.vectorChangePattern.value;
  const vectorsCapitalizedString = ISLCA11yStrings.vectorsCapitalized.value;
  const vectorChangeForcesNowValuePatternString = ISLCA11yStrings.vectorChangeForcesNowValuePattern.value;
  const vectorChangeSentencePatternString = ISLCA11yStrings.vectorChangeSentencePattern.value;
  const vectorChangeClausePatternString = ISLCA11yStrings.vectorChangeClausePattern.value;
  const vectorChangeForcesNowClausePatternString = ISLCA11yStrings.vectorChangeForcesNowClausePattern.value;
  const vectorForceClausePatternString = ISLCA11yStrings.vectorForceClausePattern.value;
  const regionForceClausePatternString = ISLCA11yStrings.regionForceClausePattern.value;

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;

  const getBiggerString = ISLCA11yStrings.getBigger.value;
  const getSmallerString = ISLCA11yStrings.getSmaller.value;

  const veryHardString = ISLCA11yStrings.veryHard.value;
  const hardString = ISLCA11yStrings.hard.value;
  const moderatelyString = ISLCA11yStrings.moderately.value;
  const gentlyString = ISLCA11yStrings.gently.value;
  const lighlyString = ISLCA11yStrings.lightly.value;
  const aLittleString = ISLCA11yStrings.aLittle.value;
  const aTinyBitString = ISLCA11yStrings.aTinyBit.value;

  const SIZE_STRINGS = [
    tinyString,
    verySmallString,
    smallString,
    mediumSizeString,
    largeString,
    veryLargeString,
    hugeString
  ];
  const PULL_EFFORT_STINGS = [
    aTinyBitString,
    aLittleString,
    lighlyString,
    gentlyString,
    moderatelyString,
    hardString,
    veryHardString
  ];
  const CHANGE_DIRECTIONS = [ getSmallerString, null, getBiggerString ];

  // scientific notation
  const scientificNotationPatternString = ISLCA11yStrings.scientificNotationPattern.value;
  const scientificNotationPatternNoHtmlString = ISLCA11yStrings.scientificNotationPatternNoHtml.value;
  const negativeValuePatternString = ISLCA11yStrings.negativeValuePattern.value;
  const valuePatternString = ISLCA11yStrings.valuePattern.value;

  class ForceDescriber extends ISLCDescriber {

    /**
     * @param {ISLCModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {PositionDescriber} positionDescriber
     * @param {Object} options
     */
    constructor( model, object1Label, object2Label, positionDescriber, options ) {
      super( model, object1Label, object2Label );

      options = _.extend( {
        units: unitsNewtonsString,

        // in some scenarios, the force units change. convertForce allows subtypes to define conversion behavior
        // integrates with forceValueToString for necessary conversions (e.g. 300000000 -> 3)
        // always takes place before forceValueToString
        convertForce: force => force,

        // for adding natural language to the force (e.g. '3 billion' instead of 3000000000)
        forceValueToString: value => StringUtils.fillIn( valuePatternString, { value: value } ),

        // {string} - see getForceBetweenAndVectorText() for usage. Be careful that template vars are named correctly.
        forceAndVectorPatternString: forceAndVectorPatternString,

        // {string} - see getForceVectorMagnitudeText() for usage. Be careful that template vars are named correctly.
        forceVectorMagnitudeUnitsPatternString: forceVectorMagnitudeUnitsPatternString,

        // {string} - all options below used for simplification in GFLB
        forceVectorsCapitalizedString: forceVectorArrowsString,

        // different usage for GFLB than "vectorsString" see usages below as well as GFLBForceDescriber
        forceVectorsString: vectorsString,
        vectorsString: vectorsString,
        vectorsCapitalizedString: vectorsCapitalizedString
      }, options );

      // @private
      this.positionDescriber = positionDescriber;
      this.forceProperty = model.forceProperty;
      this.forceValuesProperty = model.forceValuesProperty;
      this.units = options.units;
      this.forceValueToString = options.forceValueToString;
      this.convertForce = options.convertForce;
      this.forceToPullIndex = new LinearFunction( model.getMinForce(), model.getMaxForce(), 0, 6, true );

      // @private {number} - // 1 -> growing, 0 -> no change, -1 -> shrinking
      this.vectorChangeDirection = 0;
      this.forceAndVectorPatternString = options.forceAndVectorPatternString;
      this.forceVectorMagnitudeUnitsPatternString = options.forceVectorMagnitudeUnitsPatternString;
      this.forceVectorsString = options.forceVectorsString;
      this.vectorsCapitalizedString = options.vectorsCapitalizedString;

      // @protected
      this.scientificNotationProperty = model.scientificNotationProperty;

      // @private - these string patterns can vary based on options
      this.summaryVectorSizePatternString = StringUtils.fillIn( summaryVectorSizePatternString, {
        forceVectorArrows: options.forceVectorsCapitalizedString
      } );
      this.summaryVectorSizeValueUnitsPatternString = StringUtils.fillIn( summaryVectorSizeValueUnitsPatternString, {
        forceVectorArrows: options.forceVectorsCapitalizedString
      } );
      this.vectorsSizeClausePatternString = StringUtils.fillIn( vectorsSizeClausePatternString, {
        vectors: options.forceVectorsString
      } );
      this.vectorChangeClausePatternString = StringUtils.fillIn( vectorChangeClausePatternString, {
        vectors: options.forceVectorsString
      } );
      this.vectorChangeForcesNowClausePatternString = StringUtils.fillIn( vectorChangeForcesNowClausePatternString, {
        vectors: options.forceVectorsString
      } );

      model.forceProperty.link( ( force, oldForce ) => {
        const forceDelta = force - oldForce;
        if ( forceDelta !== 0 ) {
          this.vectorChangeDirection = forceDelta / Math.abs( forceDelta ); // +1 or -1
        }
        else {
          this.vectorChangeDirection = 0;
        }
      } );
    }

    /**
     * @private
     * @returns {string}
     */
    getFormattedForce() {
      return this.forceValueToString( this.convertForce( this.forceProperty.get() ) );
    }

    /**
     * @public
     * @returns {string}
     */
    getForceVectorsSummaryText() {
      const fillObject = {};
      let pattern = this.summaryVectorSizePatternString;

      fillObject.size = this.getVectorSize();

      if ( this.forceValuesProperty.get() ) {
        pattern = this.summaryVectorSizeValueUnitsPatternString;
        fillObject.forceValue = this.getFormattedForce();
        fillObject.units = this.units;
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    /**
     * @param {string} thisObjectLabel
     * @param {string} otherObjectLabel
     * @returns {string}
     * @public
     */
    getForceVectorMagnitudeText( thisObjectLabel, otherObjectLabel ) {
      const pattern = this.forceVectorMagnitudeUnitsPatternString;
      const forceValue = this.getFormattedForce();
      const units = this.units;

      // In BASICS the object labels are used, in regular the fillin is a no-op because those keys aren't present.
      return StringUtils.fillIn( pattern, {
        forceValue: forceValue,
        units: units,
        thisObjectLabel: thisObjectLabel,
        otherObjectLabel: otherObjectLabel
      } );
    }

    /**
     * @param {string} thisObjectLabel
     * @param {string} otherObjectLabel
     * @returns {string}
     * @public
     */
    getForceBetweenAndVectorText( thisObjectLabel, otherObjectLabel ) {
      const pattern = this.forceAndVectorPatternString;
      const fillObject = {
        thisObjectLabel: thisObjectLabel,
        otherObjectLabel: otherObjectLabel,
        size: this.getVectorSize()
      };
      return StringUtils.fillIn( pattern, fillObject );
    }

    /**
     * @public
     * @returns {string}
     */
    getRobotEffortSummaryText() {
      const pattern = this.forceProperty.get() < 0 ?
                      robotPushSummaryPatternString :
                      robotPullSummaryPatternString;
      const effort = this.getRobotEffort();
      return StringUtils.fillIn( pattern, { effort: effort } );
    }

    /**
     * Retrieves the string to be rendered in an aria-live region when the Scientific Notation checkbox is altered.
     * One of the following:
     *    'Values in {{this.units}}.'
     *    'Values in newtons with scientific notation.'
     *
     * @returns {string}
     * @public
     */
    getScientificNotationAlertText() {
      if ( this.scientificNotationProperty.get() ) {
        return forcesInScientificNotationString;
      }

      return this.getValuesInUnitsText();
    }

    /**
     * Returns the filled-in string 'Values in {{units}}'.
     *
     * @returns {string}
     * @public
     */
    getValuesInUnitsText() {
      return StringUtils.fillIn( valuesInUnitsPatternString, { units: this.units } );
    }

    /**
     * Get text when an object has changed position, and the force value has as a result.
     * @param {ISLCObject} object - the object that changed position
     * @returns {string}
     * @public
     */
    getVectorChangeText( object ) {
      const changeDirection = this.getChangeDirection();
      const positionOrLandmark = this.positionDescriber.getPositionProgressOrLandmarkClause( object );

      // Fill in the base clause of the vector changing.
      const vectorChangeClause = StringUtils.fillIn( vectorChangePatternString, {

        // if no position progress, then capitalize the next piece
        vectors: positionOrLandmark ? this.forceVectorsString : this.vectorsCapitalizedString,
        positionProgressOrLandmarkClause: positionOrLandmark ? positionOrLandmark : '',
        changeDirection: changeDirection
      } );

      // Add info like "forces now" only if force values checkbox is enabled
      if ( this.forceValuesProperty.get() ) {
        const forceValue = this.getFormattedForce();
        const units = this.units;
        return StringUtils.fillIn( vectorChangeForcesNowValuePatternString, {
          vectorChangeClause: vectorChangeClause,
          forceValue: forceValue,
          units: units
        } );
      }
      else {

        // Make the vectorChangeClause into a sentence.
        return StringUtils.fillIn( vectorChangeSentencePatternString, {
          vectorChange: vectorChangeClause
        } );
      }
    }

    /**
     * Returns the filled-in string 'vectors {{changeDirection}}, forces now {{forceValue}} {{units}}' for use in larger
     * pattern strings.
     *
     * @param {boolean} forceBiggerOverride - manually specify that we want to "forces bigger" alert, see
     *                                        GravityForceLabAlertManager.alertMassValueChanged()
     * @returns {string}
     * @public
     */
    getVectorChangeClause( forceBiggerOverride ) {
      const directionChange = this.getChangeDirection( forceBiggerOverride );

      if ( !this.forceValuesProperty.value ) {
        return StringUtils.fillIn( this.vectorChangeClausePatternString, {
          changeDirection: directionChange
        } );
      }
      return StringUtils.fillIn( this.vectorChangeForcesNowClausePatternString, {
        changeDirection: directionChange,
        forceValue: this.getFormattedForce(),
        units: this.units
      } );
    }

    /**
     * Returns the qualitiative amount of pull/push the robots are currently exerting.
     *
     * @returns {string}
     * @private
     */
    getRobotEffort() {
      const effortIndex = Util.roundSymmetric( this.forceToPullIndex( this.forceProperty.get() ) );
      return PULL_EFFORT_STINGS[ effortIndex ];
    }

    /**
     * Returns the qualitative size of force vectors.
     *
     * @returns {string}
     * @private
     */
    getVectorSize() {
      return SIZE_STRINGS[ this.getForceVectorIndex( this.forceProperty.get(), SIZE_STRINGS.length ) ];
    }

    /**
     * Returns the appropriate changed direction for the vectors ('get bigger/smaller'), if no change, null is returned.
     *
     * @param {boolean} forceBiggerOverride - when true, just return the "get bigger" string.
     * @returns {string}
     * @private
     */
    getChangeDirection( forceBiggerOverride ) {
      const index = forceBiggerOverride ? 2 : this.vectorChangeDirection + 1;
      assert && assert( CHANGE_DIRECTIONS[ index ] !== null, 'Alert should not be called if no change in direction' );
      return CHANGE_DIRECTIONS[ index ];
    }

    /**
     * Alert text for when ISLCObject position does not change even though there was a drag.
     * @param {ISLCObject} object - the ISLCObject that was interacted with but didn't change position
     * @public
     * @returns {string}
     */
    getPositionUnchangedAlertText( object ) {

      // if not showing force values, this is the force clause
      let forceClause = StringUtils.fillIn( this.vectorsSizeClausePatternString, { size: this.getVectorSize() } );

      if ( this.forceValuesProperty.get() ) {
        const forceValuesClause = StringUtils.fillIn( forcesValueUnitsClausePatternString, {
          forceValue: this.getFormattedForce(),
          units: this.units
        } );
        forceClause = StringUtils.fillIn( vectorForceClausePatternString, {
          vectorClause: forceClause, // in GFLB this has nothing to do with "vectors" but instead "force arrows"
          forceValuesClause: forceValuesClause
        } );
      }

      return StringUtils.fillIn( regionForceClausePatternString, {
        otherObjectLabel: this.getOtherObjectLabelFromEnum( object.enum ),
        relativeDistance: this.positionDescriber.getCapitalizedQualitativeRelativeDistanceRegion(),
        forceClause: forceClause
      } );
    }

    /**
     *
     * @param {number} forceValue
     * @param {number} mantissaDecimalPlaces
     * @returns {number}
     * @public
     */
    static getForceInScientificNotation( forceValue, mantissaDecimalPlaces ) {
      return getScientificNotationTextFromPattern( forceValue, mantissaDecimalPlaces, scientificNotationPatternString );
    }

    /**
     * @param {number} forceValue
     * @param {number} mantissaDecimalPlaces
     * @returns {number}
     * @public
     */
    static getForceInScientificNotationNoHtml( forceValue, mantissaDecimalPlaces ) {
      return getScientificNotationTextFromPattern( forceValue, mantissaDecimalPlaces, scientificNotationPatternNoHtmlString );
    }

    /**
     * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
     * newtons, so it's necessary for sim-specific subtypes to specify this logic.
     *
     * @abstract
     * @param  {number} force
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number} - integer index to get value from SIZE_STRINGS
     * @protected
     */
    getForceVectorIndex( force, numberOfRegions ) {
      throw new Error( 'getForceVectorIndex MUST be implemented in subtypes.' );
    }

  }

  /**
   * Convert a number into scientific notation. The pattern expects a {{mantissa}} and {{exponent}} variables
   * @param {number} forceValue
   * @param {number} mantissaDecimalPlaces
   * @param {string} pattern
   * @returns {string}
   */
  const getScientificNotationTextFromPattern = ( forceValue, mantissaDecimalPlaces, pattern ) => {
    const { mantissa, exponent } = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces: mantissaDecimalPlaces } );
    const mantissaPattern = mantissa < 0 ? negativeValuePatternString : valuePatternString; // negative values are possible in Coulomb's Law
    const mantissaString = StringUtils.fillIn( mantissaPattern, { value: Math.abs( mantissa ) } );
    const exponentPattern = exponent < 0 ? negativeValuePatternString : valuePatternString;
    const exponentString = StringUtils.fillIn( exponentPattern, { value: Math.abs( exponent ) } );
    return StringUtils.fillIn( pattern, { mantissa: mantissaString, exponent: exponentString } );
  };

  return inverseSquareLawCommon.register( 'ForceDescriber', ForceDescriber );
} );