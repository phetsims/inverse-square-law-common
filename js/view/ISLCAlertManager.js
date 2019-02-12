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

  let manager = null;

  class ISLCAlertManager {

    /**
     * @param {ISLCModel} model
     */
    constructor( model ) {
      this.model = model;
      this.forceDescriber = ForceDescriber.getDescriber();
    }

    static alertForceValues( showValues ) {
      const forceDescriber = ForceDescriber.getDescriber();
      let alert = '';
      if ( showValues ) {
        alert = forceDescriber.getValuesInUnitsText();
      }
      else {
        alert = forceValuesHiddenString;
      }
      const utterance = new Utterance( { alert, uniqueGroupId: 'forceValues' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionChanged( endAtEdge ) {
      const alert = this.getPositionChangedAlertText( endAtEdge );
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionUnchanged() {
      const alert = this.getPositionUnchangedAlertText();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    getPositionChangedAlertText( endAtEdge ) {
      let alertText = this.forceDescriber.getVectorChangeText();
      let edgeAlertText = this.forceDescriber.getVectorSizeText();

      // if force values checkbox is enabled
      if ( this.model.forceValuesProperty.get() ) {
        alertText = this.forceDescriber.getVectorChangeForcesNowText();
        edgeAlertText = this.forceDescriber.getVectorSizeForceValueText();
      }

      return endAtEdge ? edgeAlertText : alertText;
    }

    getPositionUnchangedAlertText() {
      const positionDescriber = PositionDescriber.getDescriber();
      const forceClause = this.forceDescriber.getVectorsAndForcesClause();
      const region = positionDescriber.qualitativeDistance;
      return StringUtils.fillIn( regionForceClausePatternString, { region, forceClause } );
    }

    static getManager() {
      assert && assert( manager, 'AlertManagers must be initialized prior to use' );
      return manager;
    }

    static initialize( subtype ) {
      manager = subtype;
      return manager;
    }
  }

  return inverseSquareLawCommon.register( 'ISLCAlertManager', ISLCAlertManager );
} );