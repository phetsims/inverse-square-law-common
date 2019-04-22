// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const forceValuesHiddenString = ISLCA11yStrings.forceValuesHidden.value;
  const regionForceClausePatternString = ISLCA11yStrings.regionForceClausePattern.value;

  class ISLCAlertManager {

    /**
     * @param {ISLCModel} model
     */
    constructor( model ) {
      this.model = model;

      // @protected
      this.forceDescriber = ForceDescriber.getDescriber();

      // @public {Utterance} - utterances to be added to utteranceQueue, can be used to leverage
      // alertStable feature so this alert content doesn't hit the user too frequently
      this.forceUtterance = new Utterance();
      this.positionUtterance = new Utterance();
    }

    alertForceValues( showValues ) {
      const forceDescriber = ForceDescriber.getDescriber();
      let alert = '';
      if ( showValues ) {
        alert = forceDescriber.getValuesInUnitsText();
      }
      else {
        alert = forceValuesHiddenString;
      }

      this.forceUtterance.alert = alert;
      utteranceQueue.addToBack( this.forceUtterance );
    }

    alertPositionChanged( objectsTouching ) {
      const alert = this.getPositionChangedAlertText( objectsTouching );
      this.positionUtterance.alert = alert;
      utteranceQueue.addToBack( this.positionUtterance );
    }

    alertPositionUnchanged() {
      const alert = this.getPositionUnchangedAlertText();
      this.positionUtterance.alert = alert;
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
      const positionDescriber = PositionDescriber.getDescriber();
      const forceClause = this.forceDescriber.getVectorsAndForcesClause();
      const region = positionDescriber.qualitativeDistance;
      return StringUtils.fillIn( regionForceClausePatternString, { region: region, forceClause: forceClause } );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCAlertManager', ISLCAlertManager );
} );