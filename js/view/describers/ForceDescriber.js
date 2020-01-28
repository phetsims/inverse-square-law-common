// Copyright 2018-2020, University of Colorado Boulder

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
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const merge = require( 'PHET_CORE/merge' );
  const ScientificNotationNode = require( 'SCENERY_PHET/ScientificNotationNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  // a11y strings
  const forceVectorArrowsString = ISLCA11yStrings.forceVectorArrows.value;
  const summaryVectorSizePatternString = ISLCA11yStrings.summaryVectorSizePattern.value;
  const summaryVectorSizeValueUnitsPatternString = ISLCA11yStrings.summaryVectorSizeValueUnitsPattern.value;
  const forceVectorMagnitudeUnitsPatternString = ISLCA11yStrings.forceVectorMagnitudeUnitsPattern.value;
  const forceAndVectorPatternString = ISLCA11yStrings.forceAndVectorPattern.value;
  const forceVectorSizePatternString = ISLCA11yStrings.forceVectorSizePattern.value;
  const robotPullSummaryPatternString = ISLCA11yStrings.robotPullSummaryPattern.value;
  const robotPushSummaryPatternString = ISLCA11yStrings.robotPushSummaryPattern.value;
  const vectorsString = ISLCA11yStrings.vectors.value;
  const vectorsSizeClausePatternString = ISLCA11yStrings.vectorsSizeClausePattern.value;
  const forcesValueUnitsClausePatternString = ISLCA11yStrings.forcesValueUnitsClausePattern.value;
  const forceMagnitudeString = ISLCA11yStrings.forceMagnitude.value;
  const forceVectorCapitalizedString = ISLCA11yStrings.forceVectorCapitalized.value;
  const forceVectorsSizePatternString = ISLCA11yStrings.forceVectorsSizePattern.value;

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
  const negativeValuePatternString = ISLCA11yStrings.negativeValuePattern.value;
  const valuePatternString = ISLCA11yStrings.valuePattern.value;

  class ForceDescriber extends ISLCDescriber {

    /**
     * @param {ISLCModel} model - supports subtypes with forceValuesDisplayProperty gracefully
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {PositionDescriber} positionDescriber
     * @param {Object} options
     */
    constructor( model, object1Label, object2Label, positionDescriber, options ) {
      super( model, object1Label, object2Label );

      options = merge( {
        units: unitsNewtonsString,

        // in some scenarios, the force units change. convertForce allows subtypes to define conversion behavior
        // integrates with forceValueToString for necessary conversions (e.g. 300000000 -> 3)
        // always takes place before forceValueToString
        convertForce: _.identity,

        // for adding natural language to the force (e.g. '3 billion' instead of 3000000000)
        forceValueToString: value => StringUtils.fillIn( valuePatternString, { value: value } ),

        // {string} - all options below used for simplification in GFLB
        forceVectorsCapitalizedString: forceVectorArrowsString,

        // In GFL, we like "vector" but in GFLB prefer "arrow", see usages below as well as GFLBForceDescriber
        forceVectorsString: vectorsString,
        vectorsString: vectorsString,
        vectorsCapitalizedString: vectorsCapitalizedString,
        forceVectorCapitalizedString: forceVectorCapitalizedString,
        forceMagnitudeString: forceMagnitudeString
      }, options );

      // @private
      this.positionDescriber = positionDescriber;
      this.forceProperty = model.forceProperty;
      this.showForceValuesProperty = model.showForceValuesProperty;
      this.units = options.units;
      this.forceValueToString = options.forceValueToString;
      this.convertForce = options.convertForce;

      // @private
      this.vectorChangeDirection = 0; // {number} - // 1 -> growing, 0 -> no change, -1 -> shrinking
      this.forceVectorsString = options.forceVectorsString; // {string}
      this.vectorsCapitalizedString = options.vectorsCapitalizedString; // {string}
      this.forceVectorCapitalizedString = options.forceVectorCapitalizedString; // {string}

      // @protected
      this.forceValuesDisplayProperty = model.forceValuesDisplayProperty || null;

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
      this.vectorChangeCapitalizedClausePatternString = StringUtils.fillIn( vectorChangeClausePatternString, {
        vectors: options.forceVectorsCapitalizedString
      } );
      this.vectorChangeForcesNowClausePatternString = StringUtils.fillIn( vectorChangeForcesNowClausePatternString, {
        vectors: options.forceVectorsString
      } );
      this.vectorChangeCapitalizedForcesNowClausePatternString = StringUtils.fillIn( vectorChangeForcesNowClausePatternString, {
        vectors: options.forceVectorsCapitalizedString
      } );
      this.forceVectorMagnitudeUnitsPatternString = StringUtils.fillIn( forceVectorMagnitudeUnitsPatternString, {
        forceMagnitude: options.forceMagnitudeString
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

      if ( this.showForceValuesProperty.get() ) {
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
      return StringUtils.fillIn( this.forceVectorMagnitudeUnitsPatternString, {
        forceValue: this.getFormattedForce(),
        units: this.units,
        thisObjectLabel: thisObjectLabel,
        otherObjectLabel: otherObjectLabel
      } );
    }

    /**
     * Get the size of the vectors clause.
     * @public
     * @returns {string}
     */
    getForceVectorsSize() {
      return StringUtils.fillIn( forceVectorsSizePatternString, {
        size: this.getVectorSize(),
        forceVectors: this.forceVectorsString
      } );
    }

    /**
     * @param {string} thisObjectLabel
     * @param {string} otherObjectLabel
     * @returns {string}
     * @public
     */
    getForceBetweenAndVectorText( thisObjectLabel, otherObjectLabel ) {
      return StringUtils.fillIn( forceAndVectorPatternString, {
        thisObjectLabel: thisObjectLabel,
        otherObjectLabel: otherObjectLabel,
        forceVectorSize: StringUtils.fillIn( forceVectorSizePatternString, {
          size: this.getVectorSize(),
          forceVector: this.forceVectorCapitalizedString
        } )
      } );
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
      assert && assert( this.forceValuesDisplayProperty, 'forceValuesDisplayProperty expected for this alert' );
      if ( this.forceValuesDisplayProperty.value === ForceValuesDisplayEnum.SCIENTIFIC ) {
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
      if ( this.showForceValuesProperty.get() ) {
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
     * @param {boolean} capitalize - capitalize the clause
     * @returns {string}
     * @public
     */
    getVectorChangeClause( forceBiggerOverride, capitalize ) {
      const directionChange = this.getChangeDirection( forceBiggerOverride );

      if ( !this.showForceValuesProperty.value ) {
        return StringUtils.fillIn( capitalize ?
                                   this.vectorChangeCapitalizedClausePatternString :
                                   this.vectorChangeClausePatternString, {
          changeDirection: directionChange
        } );
      }
      return StringUtils.fillIn( capitalize ?
                                 this.vectorChangeCapitalizedForcesNowClausePatternString :
                                 this.vectorChangeForcesNowClausePatternString, {
        changeDirection: directionChange,
        forceValue: this.getFormattedForce(),
        units: this.units
      } );
    }

    /**
     * Returns the qualitiative amount of pull/push the robots are currently exerting. This uses the same range as
     * the force vector (or "arrow" in GFLB) size regions.
     *
     * @returns {string}
     * @private
     */
    getRobotEffort() {
      return PULL_EFFORT_STINGS[ this.getForceVectorIndex( this.forceProperty.get(), PULL_EFFORT_STINGS.length ) ];
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

      if ( this.showForceValuesProperty.get() ) {
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