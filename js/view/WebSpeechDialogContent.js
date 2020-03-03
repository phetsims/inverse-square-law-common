// Copyright 2020, University of Colorado Boulder

/**
 * Content for an "Options" dialog, only used if the ?selfVoicing query parameter is used to explor prototypal "self voicing"
 * feature set. This dialog allows control of output verbosity and settings for the speech synthesizer.
 *
 * @author Jesse Greenberg
 */

import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import Utils from '../../../../dot/js/Utils.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import HSlider from '../../../../sun/js/HSlider.js';
import VerticalAquaRadioButtonGroup from '../../../../sun/js/VerticalAquaRadioButtonGroup.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import webSpeaker from '../../../inverse-square-law-common/js/view/webSpeaker.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';

// constants
const TITLE_FONT = new PhetFont( { size: 16 } );
const LABEL_FONT = new PhetFont( { size: 12 } );
const INPUT_SPACING = 8;

class WebSpeechDialogContent extends VBox {
  constructor() {

    // controls for verbosity, the output designed by PhET
    const verbosityControls = new VerticalAquaRadioButtonGroup( webSpeaker.verbosityProperty,
      [
        {
          node: new Text( 'Verbose', { font: LABEL_FONT } ),
          value: webSpeaker.Verbosity.VERBOSE,
          labelContent: 'Verbose'
        },
        {
          node: new Text( 'Brief', { font: LABEL_FONT } ),
          value: webSpeaker.Verbosity.BRIEF,
          labelContent: 'Brief'
        }
      ], {
        spacing: 5
      }
    );
    const labelledVerbosityControls = new VBox( {
      children: [
        new Text( 'Verbosity', { font: TITLE_FONT } ),
        verbosityControls
      ],
      align: 'center',
      spacing: INPUT_SPACING
    } );

    // controls for speech synthesis, such as the rate, pitch, and voice
    const voiceRateSlider = WebSpeechDialogContent.createLabelledSlider( webSpeaker.voiceRateProperty, 'Rate', 'New Voice Rate' );
    const voicePitchSlider = WebSpeechDialogContent.createLabelledSlider( webSpeaker.voicePitchProperty, 'Pitch', 'New Voice Pitch' );

    const comboBoxItems = [];

    // only grab the first 12 options for the ComboBox, its all we have space for
    webSpeaker.voices.splice( 0, 12 ).forEach( voice => {
      comboBoxItems.push( new ComboBoxItem( new Text( voice.name, { font: LABEL_FONT } ), voice ) );
    } );
    const voiceComboBox = new ComboBox( comboBoxItems, webSpeaker.voiceProperty, phet.joist.sim.topLayer, {
      listPosition: 'above'
    } );

    const voiceControls = new VBox( {
      children: [ voiceRateSlider, voicePitchSlider, voiceComboBox ],
      spacing: INPUT_SPACING
    } );

    const labelledVoiceControls = new VBox( {
      children: [
        new Text( 'Voice', { font: TITLE_FONT } ),
        voiceControls
      ],
      align: 'center',
      spacing: INPUT_SPACING
    } );

    super( {
      children: [ labelledVerbosityControls, labelledVoiceControls ],
      spacing: 30
    } );

    webSpeaker.voiceProperty.lazyLink( voice => {
      webSpeaker.speak( 'New voice selected' );
    } );
  }
}

// @private
// @static
WebSpeechDialogContent.createLabelledSlider = ( numberProperty, label, changeSuccessDescription ) => {
  const changeSuccessPatternString = '{{successDescription}}, {{newValue}}';

  const slider = new HSlider( numberProperty, numberProperty.range, {
    endDrag: () => {
      const utterance = StringUtils.fillIn( changeSuccessPatternString, {
        successDescription: changeSuccessDescription,
        newValue: Utils.toFixed( webSpeaker.voicePitchProperty.get(), 2 )
      } );
      webSpeaker.speak( utterance );
    }
  } );
  return new HBox( {
    children: [ new Text( label, { font: LABEL_FONT } ) , slider ],
    spacing: INPUT_SPACING
  } );
};

inverseSquareLawCommon.register( 'WebSpeechDialogContent', WebSpeechDialogContent );

export default WebSpeechDialogContent;
