// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const forceValuesHiddenString = ISLCA11yStrings.forceValuesHidden.value;

  class ISLCAlertManager {
    constructor( model, stringManager ) {
      this.model = model;
      this.stringManager = stringManager;
      // model.forceValuesProperty.lazyLink( showValues => {
      //   this.alertForceValues( showValues );
      // } );
    }

    alertForceValues( showValues ) {
      let alert = '';
      if ( showValues ) {
        alert = this.stringManager.getForceValuesInUnitsText();
      }
      else {
        alert = forceValuesHiddenString;
      }
      const utterance = new Utterance( { alert, uniqueGroupId: 'forceValues' } );
      utteranceQueue.addToBack( utterance );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCAlertManager', ISLCAlertManager );
} );