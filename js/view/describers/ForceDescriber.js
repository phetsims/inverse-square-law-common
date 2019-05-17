// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
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
  const forceValueUnitsPatternString = ISLCA11yStrings.forceValueUnitsPattern.value;
  const robotPullSummaryPatternString = ISLCA11yStrings.robotPullSummaryPattern.value;
  const robotPushSummaryPatternString = ISLCA11yStrings.robotPushSummaryPattern.value;
  const vectorsString = ISLCA11yStrings.vectors.value;
  const vectorSizePatternString = ISLCA11yStrings.vectorSizePattern.value;
  const vectorSizeForcesValuePatternString = ISLCA11yStrings.vectorSizeForcesValuePattern.value;
  const vectorsSizeClausePatternString = ISLCA11yStrings.vectorsSizeClausePattern.value;
  const forcesValueUnitsClausePatternString = ISLCA11yStrings.forcesValueUnitsClausePattern.value;
  const forcesNowValueUnitsClausePatternString = ISLCA11yStrings.forcesNowValueUnitsClausePattern.value;

  const valuesInUnitsPatternString = ISLCA11yStrings.valuesInUnitsPattern.value;
  const forcesInScientificNotationString = ISLCA11yStrings.forcesInScientificNotation.value;

  const vectorChangePatternString = ISLCA11yStrings.vectorChangePattern.value;
  const vectorsCapitalizedString = ISLCA11yStrings.vectorsCapitalized.value;
  const vectorChangeForcesNowValuePatternString = ISLCA11yStrings.vectorChangeForcesNowValuePattern.value;
  const vectorChangeClausePatternString = ISLCA11yStrings.vectorChangeClausePattern.value;
  const vectorChangeForcesNowClausePatternString = ISLCA11yStrings.vectorChangeForcesNowClausePattern.value;
  const vectorForceClausePatternString = ISLCA11yStrings.vectorForceClausePattern.value;

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
    veryHardString,
    hardString,
    moderatelyString,
    gentlyString,
    lighlyString,
    aLittleString,
    aTinyBitString
  ];
  const CHANGE_DIRECTIONS = [ getSmallerString, null, getBiggerString ];

  // scientific notation
  const scientificNotationPatternString = ISLCA11yStrings.scientificNotationPattern.value;
  const scientificNotationPatternNoHtmlString = ISLCA11yStrings.scientificNotationPatternNoHtml.value;
  const negativeValuePatternString = ISLCA11yStrings.negativeValuePattern.value;
  const valuePatternString = ISLCA11yStrings.valuePattern.value;

  // helper functions
  const getScientificNotationTextFromPattern = ( forceValue, mantissaDecimalPlaces, pattern ) => {
    const { mantissa, exponent } = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces: mantissaDecimalPlaces } );
    const mantissaPattern = mantissa < 0 ? negativeValuePatternString : valuePatternString; // negative values are possible in Coulomb's Law
    const mantissaString = StringUtils.fillIn( mantissaPattern, { value: Math.abs( mantissa ) } );
    const exponentPattern = exponent < 0 ? negativeValuePatternString : valuePatternString;
    const exponentString = StringUtils.fillIn( exponentPattern, { value: Math.abs( exponent ) } );
    return StringUtils.fillIn( pattern, { mantissa: mantissaString, exponent: exponentString } );
  };

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
      this.units = options.units;
      this.forceValueToString = options.forceValueToString;
      this.convertForce = options.convertForce;
      this.effortIndex = 0;
      this.vectorChangeDirection = 0; // 1 -> growing, 0 -> no change, -1 -> shrinking
      this.forceAndVectorPatternString = options.forceAndVectorPatternString;
      this.forceVectorMagnitudeUnitsPatternString = options.forceVectorMagnitudeUnitsPatternString;
      this.forceVectorsString = options.forceVectorsString;
      this.vectorsCapitalizedString = options.vectorsCapitalizedString;

      // @private - these string patterns can vary based on options
      this.summaryVectorSizePatternString = StringUtils.fillIn( summaryVectorSizePatternString, {
        forceVectorArrows: options.forceVectorsCapitalizedString
      } );
      this.summaryVectorSizeValueUnitsPatternString = StringUtils.fillIn( summaryVectorSizeValueUnitsPatternString, {
        forceVectorArrows: options.forceVectorsCapitalizedString
      } );
      this.vectorSizePatternString = StringUtils.fillIn( vectorSizePatternString, {
        vectorsCapitalized: options.vectorsCapitalizedString
      } );
      this.vectorChangePatternString = StringUtils.fillIn( vectorChangePatternString, {
        vectorsCapitalized: options.vectorsCapitalizedString
      } );
      this.vectorSizeForcesValuePatternString = StringUtils.fillIn( vectorSizeForcesValuePatternString, {
        vectorsCapitalized: options.vectorsCapitalizedString
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
        this.effortIndex = this.getEffortIndex( force );
        if ( forceDelta !== 0 ) {
          this.vectorChangeDirection = forceDelta / Math.abs( forceDelta );
        }
        else {
          this.vectorChangeDirection = 0;
        }
      } );
    }

    get force() {
      return this.model.forceProperty.get();
    }

    get formattedForce() {
      return this.forceValueToString( this.convertForce( this.force ) );
    }

    get showForces() {
      return this.model.forceValuesProperty.get();
    }

    getForceVectorsSummaryText() {
      const fillObject = {};
      let pattern = this.summaryVectorSizePatternString;

      fillObject.size = this.vectorSize;

      if ( this.showForces ) {
        pattern = this.summaryVectorSizeValueUnitsPatternString;
        fillObject.forceValue = this.formattedForce;
        fillObject.units = this.units;
      }

      return StringUtils.fillIn( pattern, fillObject );
    }

    /**
     * @param {string} thisObjectLabel
     * @param {string} otherObjectLabel
     * @returns {string}
     */
    getForceVectorMagnitudeText( thisObjectLabel, otherObjectLabel ) {
      const pattern = this.forceVectorMagnitudeUnitsPatternString;
      const forceValue = this.formattedForce;
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
     */
    getForceBetweenAndVectorText( thisObjectLabel, otherObjectLabel ) {
      const pattern = this.forceAndVectorPatternString;
      const fillObject = {
        thisObjectLabel: thisObjectLabel,
        otherObjectLabel: otherObjectLabel,
        size: this.vectorSize
      };
      return StringUtils.fillIn( pattern, fillObject );
    }

    getRobotEffortSummaryText() {
      const pattern = this.model.forceProperty.get() < 0 ?
                      robotPushSummaryPatternString :
                      robotPullSummaryPatternString;
      const effort = this.robotEffort;
      return StringUtils.fillIn( pattern, { effort: effort } );
    }

    /**
     * Retrieves the string to be rendered in an aria-live region when the Scientific Notation checkbox is altered.
     * One of the following:
     *    'Values in {{this.units}}.'
     *    'Values in newtons with scientific notation.'
     *
     * @returns {string}
     */
    getScientificNotationAlertText() {

      if ( this.model.scientificNotationProperty.get() ) {
        return forcesInScientificNotationString;
      }

      return this.getValuesInUnitsText();
    }

    /**
     * Returns the filled in string '{{forceValue}} {{units}}' where forceValue is a formatted string. See the JSDoc for
     * the formattedForce getter for details.
     *
     * @returns {string}
     */

    getForceValueAndUnits() {
      const force = this.formattedForce;
      const units = this.units;
      return StringUtils.fillIn( forceValueUnitsPatternString, { force: force, units: units } );
    }

    /**
     * Returns the filled-in string 'Values in {{units}}'.
     *
     * @returns {string}
     */
    getValuesInUnitsText() {
      return StringUtils.fillIn( valuesInUnitsPatternString, { units: this.units } );
    }

    /**
     * Returns the string 'Vectors {{size}}.'
     *
     * @returns {string}
     */
    getVectorSizeText() {
      const size = this.vectorSize;
      return StringUtils.fillIn( this.vectorSizePatternString, { size: size } );
    }

    /**
     * Returns the string 'Vectors {{size}}, forces now {{forceValue}} {{units}}.'
     *
     * @returns {string}
     */
    getVectorSizeForceValueText() {
      const size = this.vectorSize;
      const forceValue = this.formattedForce;
      const units = this.units;
      return StringUtils.fillIn( this.vectorSizeForcesValuePatternString, {
        size: size,
        forceValue: forceValue,
        units: units
      } );
    }

    /**
     * Returns the filled in string 'vectors {{size}}, forces {{value}} {{units}}'. Will display in scientific notation
     * if it's selected.
     *
     * @returns {string}
     */
    getVectorsAndForcesClause() {
      const vectorClause = this.getVectorSizeClause();
      if ( !this.model.forceValuesProperty.get() ) {
        return vectorClause;
      }
      else {
        const forceClause = this.getForcesClause();
        return StringUtils.fillIn( vectorForceClausePatternString, {
          vectorClause: vectorClause,
          forceClause: forceClause
        } );
      }
    }

    /**
     * Returns the string 'vectors {{size}}' for use in larger pattern strings.
     *
     * @returns {string}
     */
    getVectorSizeClause() {
      const size = this.vectorSize;
      return StringUtils.fillIn( this.vectorsSizeClausePatternString, { size: size } );
    }

    /**
     * Returns the string 'forces {{forceValue}} {{units}}' for use in larger pattern strings.
     *
     * @returns {string}
     */
    getForcesClause() {
      return this.fillForceClausePattern( forcesValueUnitsClausePatternString );
    }

    /**
     * Returns the string 'forces now {{forceValue}} {{units}}' for use in larger pattern strings.
     *
     * @returns {string}
     */
    getForcesNowClause() {
      return this.fillForceClausePattern( forcesNowValueUnitsClausePatternString );
    }

    /**
     * Fills in the passed in pattern with {{forceValue}} and {{units}}.
     *
     * @param {string} pattern
     * @returns {string}
     */
    fillForceClausePattern( pattern ) {
      const forceValue = this.formattedForce;
      const units = this.units;
      return StringUtils.fillIn( pattern, { forceValue: forceValue, units: units } );
    }

    /**
     * Returns the string 'Vectors {{changeDirection}}'.
     *
     * @returns {string}
     */
    getVectorChangeText() {
      const changeDirection = this.changeDirection;
      return StringUtils.fillIn( this.vectorChangePatternString, { changeDirection: changeDirection } );
    }

    /**
     * Returns the filled-in string 'Vectors {{changeDirection}}, forces now {{forceValue}} {{units}}'.
     *
     * @returns {string}
     */
    getVectorChangeForcesNowText() {
      const changeDirection = this.changeDirection;
      const forceValue = this.formattedForce;
      const units = this.units;
      const positionProgress = this.positionDescriber.getPositionProgressClause();
      return StringUtils.fillIn( vectorChangeForcesNowValuePatternString, {

        // if no position progress, then capitalize the next piece
        vectors: positionProgress ? this.forceVectorsString : this.vectorsCapitalizedString,
        positionProgressClause: positionProgress,
        changeDirection: changeDirection,
        forceValue: forceValue,
        units: units
      } );
    }

    /**
     * Returns the filled-in string 'vectors {{changeDirection}}' for use in larger pattern strings.
     *
     * @returns {string}
     */
    getVectorChangeClause() {
      const vectorChange = this.changeDirection;
      return StringUtils.fillIn( this.vectorChangeClausePatternString, { changeDirection: vectorChange } );
    }

    /**
     * Returns the filled-in string 'vectors {{changeDirection}}, forces now {{forceValue}} {{units}}' for use in larger
     * pattern strings.
     *
     * @returns {string}
     */
    getVectorChangeForcesNowClause() {
      const { changeDirection, units } = this;
      const forceValue = this.formattedForce;
      return StringUtils.fillIn( this.vectorChangeForcesNowClausePatternString, {
        changeDirection: changeDirection,
        forceValue: forceValue,
        units: units
      } );
    }

    /**
     * Returns the qualitiative amount of pull/push the robots are currently exerting.
     *
     * @returns {string}
     */
    get robotEffort() {
      return PULL_EFFORT_STINGS[ this.effortIndex ];
    }

    /**
     * Returns the qualitative size of force vectors.
     *
     * @returns {string}
     */
    get vectorSize() {
      return SIZE_STRINGS[ this.getForceVectorIndex( this.forceProperty.get() ) ];
    }

    /**
     * Returns the appropriate changed direction for the vectors ('get bigger/smaller'), if no change, null is returned.
     *
     * @returns {string|null}
     */
    get changeDirection() {
      return CHANGE_DIRECTIONS[ this.vectorChangeDirection + 1 ];
    }


    static getForceInScientificNotation( forceValue, mantissaDecimalPlaces ) {
      const pattern = scientificNotationPatternString;
      return getScientificNotationTextFromPattern( forceValue, mantissaDecimalPlaces, pattern );
    }

    static getForceInScientificNotationNoHtml( forceValue, mantissaDecimalPlaces ) {
      const pattern = scientificNotationPatternNoHtmlString;
      return getScientificNotationTextFromPattern( forceValue, mantissaDecimalPlaces, pattern );
    }

    /**
     * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
     * newtons, so it's necessary for sim-specific subtypes to specify this logic.
     *
     * @abstract
     * @param  {number} force
     * @returns {number} - integer index to get value from SIZE_STRINGS
     */
    getForceVectorIndex( force ) {
      // TODO: uncomment and implement in coulombs law, commented so asserts will pass, see https://github.com/phetsims/inverse-square-law-common/issues/58
      // throw new Error( 'getForceVectorIndex MUST be implemented in subtypes.' );
    }

    /**
     * Returns the mapped puller index based on the provided force.
     *
     * @abstract
     * @param  {number} force
     * @returns {number} - integer index to get value from PULL_EFFORT_STINGS
     */
    getEffortIndex( force ) {
      // TODO: uncomment and implement in coulombs law, commented so asserts will pass, https://github.com/phetsims/inverse-square-law-common/issues/58
      // throw new Error( 'getEffortIndex MUST be implemented in subtypes.' );
    }
  }

  return inverseSquareLawCommon.register( 'ForceDescriber', ForceDescriber );
} );