// Copyright 2020, University of Colorado Boulder

/**
 * Content for an "Options" dialog, only used if the ?selfVoicing query parameter is used to explor prototypal "self voicing"
 * feature set. This dialog allows control of output verbosity and settings for the speech synthesizer.
 *
 * @author Jesse Greenberg
 */

import Utils from '../../../dot/js/Utils.js';
import webSpeaker from '../../../scenery/js/accessibility/speaker/webSpeaker.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../scenery/js/nodes/HBox.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Text from '../../../scenery/js/nodes/Text.js';
import VBox from '../../../scenery/js/nodes/VBox.js';
import Checkbox from '../../../sun/js/Checkbox.js';
import ComboBox from '../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../sun/js/ComboBoxItem.js';
import HSlider from '../../../sun/js/HSlider.js';
import VerticalAquaRadioButtonGroup from '../../../sun/js/VerticalAquaRadioButtonGroup.js';
import VerticalCheckboxGroup from '../../../sun/js/VerticalCheckboxGroup.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import ISLCQueryParameters from '../ISLCQueryParameters.js';
import cursorSpeakerModel from './CursorSpeakerModel.js';
import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import levelSpeakerModel from './levelSpeakerModel.js';

// constants
const TITLE_FONT = new PhetFont( { size: 16, weight: 'bold' } );
const LABEL_FONT = new PhetFont( { size: 12 } );
const INPUT_SPACING = 8;

class WebSpeechDialogContent extends VBox {
  constructor() {

    const modeControls = ISLCQueryParameters.selfVoicing === 'paradigm1' ? new CursorModeControls() : new LevelModeControls();

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
        new Text( 'Voice Options', { font: TITLE_FONT } ),
        voiceControls
      ],
      align: 'center',
      spacing: INPUT_SPACING
    } );

    super( {
      children: [ modeControls, labelledVoiceControls ],
      spacing: 30,
      pickable: true
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
        newValue: Utils.toFixed( numberProperty.get(), 2 )
      } );
      webSpeaker.speak( utterance );
    }
  } );
  return new HBox( {
    children: [ new Text( label, { font: LABEL_FONT } ), slider ],
    spacing: INPUT_SPACING
  } );
};

class ModeVerbosityControls extends Node {

  /**
   * @param {EnumerationProperty.<Verbosity>} modeProperty
   * @param {BooleanProperty} verbosityProperty
   * @param {string} modeLabel
   */
  constructor( modeProperty, verbosityProperty, modeLabel ) {
    const checkbox = new Checkbox( new Text( modeLabel, { font: LABEL_FONT } ), modeProperty );
    const radioButtons = new VerticalAquaRadioButtonGroup( verbosityProperty,
      [
        {
          node: new Text( 'Verbose', { font: LABEL_FONT } ),
          value: cursorSpeakerModel.Verbosity.VERBOSE,
          labelContent: 'Verbose'
        },
        {
          node: new Text( 'Brief', { font: LABEL_FONT } ),
          value: cursorSpeakerModel.Verbosity.BRIEF,
          labelContent: 'Brief'
        }
      ], {
        spacing: 5
      }
    );

    //layout
    radioButtons.leftTop = checkbox.leftBottom.plusXY( 20, 8 );

    // VerticalAquaRadioButtonGroup doesn't have a general `enabled` setter
    modeProperty.link( exploreMode => {
      radioButtons.opacity = exploreMode ? 1 : 0.4;
      radioButtons.pickable = exploreMode;
    } );

    super( {
      children: [ checkbox, radioButtons ]
    } );
  }
}

/**
 * Controls for the "cursor" prototype of self voicing controls, including controls for things like verbosity
 * and "explore" vs "interactive" modes.
 */
class CursorModeControls extends VBox {
  constructor() {
    const exploreModeControls = new ModeVerbosityControls( cursorSpeakerModel.exploreModeProperty, cursorSpeakerModel.exploreModeVerbosityProperty, 'Explore' );
    const interactiveModeControls = new ModeVerbosityControls( cursorSpeakerModel.interactiveModeProperty, cursorSpeakerModel.interactiveModeVerbosityProperty, 'Interactive' );
    super( {
      children: [
        new Text( 'Speech Output', { font: TITLE_FONT } ),
        exploreModeControls,
        interactiveModeControls
      ],
      align: 'center',
      spacing: INPUT_SPACING
    } );
  }
}

class LevelModeControls extends VBox {
  constructor() {
    const checkboxGroup = new VerticalCheckboxGroup( [
      {
        node: new Text( 'Voice Object Changes & Screen Text', { font: LABEL_FONT } ),
        property: levelSpeakerModel.objectChangesProperty,
        options: { enabledProperty: new BooleanProperty( true ) }
      },
      {
        node: new Text( 'Voice Context Changes', { font: LABEL_FONT } ),
        property: levelSpeakerModel.contextChangesProperty,
        options: { enabledProperty: new BooleanProperty( true ) }

      },
      {
        node: new Text( 'Voice Helpful Hints', { font: LABEL_FONT } ),
        property: levelSpeakerModel.hintsProperty,
        options: { enabledProperty: new BooleanProperty( true ) }
      }
    ] );

    // options for the highlighting behavior
    const showHighlightsCheckbox = new Checkbox(
      new Text( 'Show interactive highlights', { font: LABEL_FONT } ),
      levelSpeakerModel.showHoverHighlights
    );
    const visualOptionsHeading = new Text( 'Visual Options', { font: TITLE_FONT } );

    const visualOptionsBox = new VBox( {
      children: [
        visualOptionsHeading,
        showHighlightsCheckbox
      ],
      spacing: 10
    } );

    const speechOutputBox = new VBox( {
      children: [
        new Text( 'Speech Output Levels', { font: TITLE_FONT } ),
        checkboxGroup
      ],
      spacing: 10
    } );


    super( {
      children: [
        visualOptionsBox,
        speechOutputBox
      ],
      spacing: 20
    } );
  }
}

inverseSquareLawCommon.register( 'WebSpeechDialogContent', WebSpeechDialogContent );

export default WebSpeechDialogContent;
