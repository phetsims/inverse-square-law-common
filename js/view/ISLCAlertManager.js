// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'SCENERY_PHET/accessibility/ActivationUtterance' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );
  const ValueChangeUtterance = require( 'SCENERY_PHET/accessibility/ValueChangeUtterance' );

  // strings
  const forceValuesHiddenString = ISLCA11yStrings.forceValuesHidden.value;
  const regionForceClausePatternString = ISLCA11yStrings.regionForceClausePattern.value;

  class ISLCAlertManager {

    /**
     * @param {ISLCModel} model
     * @param {ForceDescriber} forceDescriber
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, forceDescriber, positionDescriber ) {
      this.model = model;

      assert && assert( positionDescriber instanceof PositionDescriber );
      // @protected
      this.forceDescriber = forceDescriber;
      this.positionDescriber = positionDescriber;

      // @public {Utterance} - utterances to be added to utteranceQueue, can be used to leverage
      // alertStable feature so this alert content doesn't hit the user too frequently
      this.showForceValuesUtterance = new ActivationUtterance();
      this.positionUtterance = new ValueChangeUtterance();
    }

    alertShowForceValues( showValues ) {
      let alert = '';
      if ( showValues ) {
        alert = this.forceDescriber.getValuesInUnitsText();
      }
      else {
        alert = forceValuesHiddenString;
      }

      this.showForceValuesUtterance.alert = alert;
      utteranceQueue.addToBack( this.showForceValuesUtterance );
    }

    alertPositionChanged( objectsTouching ) {
      this.positionUtterance.alert = this.getPositionChangedAlertText( objectsTouching );
      utteranceQueue.addToBack( this.positionUtterance );
    }

    alertPositionUnchanged() {
      this.positionUtterance.alert = this.getPositionUnchangedAlertText();
      utteranceQueue.addToBack( this.positionUtterance );
    }

    getPositionChangedAlertText( objectsTouching ) {
      let alertText = this.forceDescriber.getVectorChangeText();
      let edgeAlertText = this.forceDescriber.getVectorSizeText();

      // if force values checkbox is enabled
      if ( this.model.forceValuesProperty.get() ) {
        alertText = this.forceDescriber.getVectorChangeForcesNowText();
        edgeAlertText = this.forceDescriber.getVectorSizeForceValueText();
      }

      return objectsTouching ? edgeAlertText : alertText;
    }

    getPositionUnchangedAlertText() {
      const forceClause = this.forceDescriber.getVectorsAndForcesClause();
      const region = this.positionDescriber.qualitativeDistance;
      return StringUtils.fillIn( regionForceClausePatternString, { region: region, forceClause: forceClause } );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCAlertManager', ISLCAlertManager );
} );