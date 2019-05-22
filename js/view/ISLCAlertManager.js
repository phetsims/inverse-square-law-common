// Copyright 2017-2019, University of Colorado Boulder

/**
 * Base type for all AlertManager instances. In general AlertManagers are responsible for sending alerts through the
 * utteranceQueue powering the aria-live alerts. This base type covers alerting that occurs due to changes in the
 * ISLCModel. Subtype alert managers are likely needed to alert state that is added in ISLCModel subtypes.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'SCENERY_PHET/accessibility/ActivationUtterance' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );
  const ValueChangeUtterance = require( 'SCENERY_PHET/accessibility/ValueChangeUtterance' );

  // strings
  const forceValuesHiddenString = ISLCA11yStrings.forceValuesHidden.value;

  class ISLCAlertManager {

    /**
     * @param {ISLCModel} model
     * @param {ForceDescriber} forceDescriber
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, forceDescriber, positionDescriber ) {

      assert && assert( positionDescriber instanceof PositionDescriber );
      // @protected
      this.forceDescriber = forceDescriber;
      this.positionDescriber = positionDescriber;
      this.model = model;

      // @public {Utterance} - utterances to be added to utteranceQueue, can be used to leverage
      // alertStable feature so this alert content doesn't hit the user too frequently
      this.showForceValuesUtterance = new ActivationUtterance();
      this.positionUtterance = new ValueChangeUtterance();
    }

    /**
     * Alert for when the show force values Property changes
     * @param {boolean} showForceValues
     * @public
     */
    alertShowForceValues( showForceValues ) {
      let alert = '';
      if ( showForceValues ) {
        alert = this.forceDescriber.getValuesInUnitsText();
      }
      else {
        alert = forceValuesHiddenString;
      }

      this.showForceValuesUtterance.alert = alert;
      utteranceQueue.addToBack( this.showForceValuesUtterance );
    }

    /**
     * Alert for when the attempted movement of an ISLCObject's position results in a positional movement.
     * @public
     * @param {ISLCObject} object - the ISLCObject that changed position
     */
    alertPositionChanged( object) {
      this.positionUtterance.alert = this.forceDescriber.getVectorChangeText( object );
      utteranceQueue.addToBack( this.positionUtterance );
    }

    /**
     * Alert for when the attempted movement of an ISLCObject's position results in no positional movement.
     * @public
     */
    alertPositionUnchanged() {
      this.positionUtterance.alert = this.forceDescriber.getPositionUnchangedAlertText();
      utteranceQueue.addToBack( this.positionUtterance );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCAlertManager', ISLCAlertManager );
} );