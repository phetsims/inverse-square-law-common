// Copyright 2019, University of Colorado Boulder

/**
 * islcSoundOptionsDialogContent is a Scenery node that presents a set of options for choosing between various sound
 * options. This file is meant to exist temporarily, just long enough for the sound design to be worked out.  This
 * node should never be seen by end users.
 *
 * The dialog content node is implemented as a singleton so that the values it manages can be obtained in multiple
 * places.
 *
 * TODO: Delete this dialog and all usages thereof once the sound design is finalized, see
 * https://github.com/phetsims/gravity-force-lab/issues/208
 *
 * @author John Blanco
 */

define( require => {
  'use strict';

  // modules
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Panel = require( 'SUN/Panel' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );

  // constants
  const SELECTOR_TITLE_TEXT_OPTIONS = { font: new PhetFont( 16 ), weight: 'bold' };
  const RADIO_BUTTON_TEXT_OPTIONS = { font: new PhetFont( 12 ) };

  class ISLCSoundOptionsDialogContent {

    /**
     * @constructor
     * @public
     */
    constructor() {

      // @public (read-only)
      this.rulerPickupSoundProperty = new NumberProperty( 1 );
      this.rulerDropSoundProperty = new NumberProperty( 1 );

      // @private {Node} - dialog content, created when requested, see explanation below
      this.dialogContent = null;
    }

    /**
     * Get the content, which consists of the UI controls to set the sound options.  This can't be created during
     * construction because the creation process references the phet.joist.sim.supportsSound flag, which isn't availabe
     * at RequireJS load time.
     * @returns {Node}
     * @public
     */
    getContent() {

      if ( !this.dialogContent ) {

        this.dialogContent = new Node();

        // create the radio button selection groups
        const rulerPickupRadioButtonGroup = new VerticalAquaRadioButtonGroup(
          this.rulerPickupSoundProperty,
          createNumberedRadioButtonDescriptorSet( 5 )
        );
        const rulerPickupSoundSelectionPanel = new Panel(
          new VBox( {
            children: [
              new Text( 'Ruler Pick Up Sound', SELECTOR_TITLE_TEXT_OPTIONS ),
              rulerPickupRadioButtonGroup
            ]
          } )
        );

        const rulerDropRadioButtonGroup = new VerticalAquaRadioButtonGroup(
          this.rulerDropSoundProperty,
          createNumberedRadioButtonDescriptorSet( 5 )
        );
        const rulerDropSoundSelectionPanel = new Panel(
          new VBox( {
            children: [
              new Text( 'Ruler Drop Sound', SELECTOR_TITLE_TEXT_OPTIONS ),
              rulerDropRadioButtonGroup
            ]
          } )
        );

        // and the selection panels to the root node
        this.dialogContent.addChild( new VBox( {
          children: [
            rulerPickupSoundSelectionPanel,
            rulerDropSoundSelectionPanel
          ],
          spacing: 5
        } ) );
      }
      return this.dialogContent;
    }
  }

  // helper function for creating descriptors for numbered radio buttons
  function createNumberedRadioButtonDescriptorSet( numChoices ) {
    const descriptorArray = [];
    _.times( numChoices, index => {
      const value = index + 1;
      descriptorArray.push( {
        node: new Text( value.toString(), RADIO_BUTTON_TEXT_OPTIONS ),
        value: value
      } );
    } );
    return descriptorArray;
  }

  const islcSoundOptionsDialogContent = new ISLCSoundOptionsDialogContent();

  inverseSquareLawCommon.register( 'islcSoundOptionsDialogContent', islcSoundOptionsDialogContent );

  // return the singleton instance
  return islcSoundOptionsDialogContent;
} );
