// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const forceValuesHiddenString = ISLCA11yStrings.forceValuesHidden.value;

  let manager = null;

  class ISLCAlertManager {
    constructor( model ) {
      this.model = model;
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