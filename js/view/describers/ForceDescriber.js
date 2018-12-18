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
  const summaryVectorSizePatternString = ISLCA11yStrings.summaryVectorSizePattern.value;
  const summaryVectorSizeValueUnitsPatternString = ISLCA11yStrings.summaryVectorSizeValueUnitsPattern.value;

  const forceValueUnitsPatternString = ISLCA11yStrings.forceValueUnitsPattern.value;

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;
  const SIZE_STRINGS = [
    tinyString, verySmallString, smallString, mediumSizeString, largeString, veryLargeString, hugeString
  ];

  // scientific notation
  const scientificNotationPatternString = ISLCA11yStrings.scientificNotationPattern.value;
  const scientificNotationPatternNoHtmlString = ISLCA11yStrings.scientificNotationPatternNoHtml.value;
  const negativeValuePatternString = ISLCA11yStrings.negativeValuePattern.value;
  const valuePatternString = ISLCA11yStrings.valuePattern.value;

  let describer = null;

  class ForceDescriber extends ISLCDescriber {
    constructor( model, object1Label, object2Label, options ) {
      super( model, object1Label, object2Label );

      options = _.extend( {
        units: unitsNewtonsString,

        // for adding natural language to the force (e.g. '3 billion' instead of 3000000000)
        forceValueToString: force => StringUtils.fillIn( '{{force}}', { force } ),

        // in some scenarios, the force units change. convertForce allows subtypes to define conversion behavior
        // integrates with forceValueToString for necessary conversions (e.g. 300000000 -> 3)
        // always takes place before forceValueToString
        convertForce: force => force
      }, options );

      this.units = options.units;
      this.forceValueToString = options.forceValueToString;
      this.convertForce = options.convertForce;
      this.oldForce = model.forceProperty.get();
      this.lastForceDelta = 0;
      this.vectorSizeIndex = 0;
      this.effortIndex = 0;

      model.forceProperty.link( ( force, oldForce ) => {
        this.vectorSizeIndex = this.getForceVectorIndex( force );
        this.effortIndex = this.getEffortIndex( force );
        this.oldForce = oldForce;
        this.lastForceDelta = Math.abs( force - oldForce );
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
      let pattern = summaryVectorSizePatternString;

      fillObject.size = this.getForceVectorSize();

      if ( this.showForces ) {
        pattern = summaryVectorSizeValueUnitsPatternString;
        fillObject.forceValue = this.formattedForce;
        fillObject.units = this.units;
      }

      return StringUtils.fillIn( pattern, fillObject );
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

    static getForceInScientificNotationNoHtml( forceValue, mantissaDecimalPlaces ) {
      const { mantissa, exponent } = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces } );
      const mantissaPattern = mantissa < 0 ? negativeValuePatternString : valuePatternString; // negative values are possible in Coulomb's Law
      const mantissaString = StringUtils.fillIn( mantissaPattern, { value: Math.abs( mantissa ) } );
      const exponentPattern = exponent < 0 ? negativeValuePatternString : valuePatternString;
      const exponentString = StringUtils.fillIn( exponentPattern, { value: Math.abs( exponent ) } );
      const pattern = scientificNotationPatternNoHtmlString;
      return StringUtils.fillIn( pattern, { mantissa: mantissaString, exponent: exponentString } );
    }

    getForceValueAndUnits() {
      const force = this.forceValueToString( this.convertForce( this.force ) );
      const units = this.units;
      return StringUtils.fillIn( forceValueUnitsPatternString, { force, units } );
    }

    getForceVectorSize() {
      return SIZE_STRINGS[ this._vectorSizeIndex ];
    }

    /**
     * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
     * newtons, so it's necessary for sim-specific subtypes to specify this logic.
     *
     * @abstract
     * @param  {Number} force
     * @return {Integer}
     */
    getForceVectorIndex( force ) {
      throw new Error( 'getForceVectorIndex MUST be implemented in subtypes.' );
    }

    /**
     * Returns the mapped puller index based on the provided force.
     *
     * @abstract
     * @param  {Number} force
     * @return {Integer}
     */
    getEffortIndex( force ) {
      throw new Error( 'getEffortIndex MUST be implemented in subtypes.' );
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
    static initialize( model, object1Label, object2Label, options ) {
      describer = new ForceDescriber( model, object1Label, object2Label, options );
    }
  }

  return inverseSquareLawCommon.register( 'ForceDescriber', ForceDescriber );
} );