// Copyright 2020, University of Colorado Boulder

/**
 * Uses the Web Speech API to produce speech from the browser. This is a prototype, DO NOT USE IN PRODUCTION CODE.
 * There is no speech output until the webSpeaker has been initialized. Supported voices will depend on platform.
 * For each voice, you can customize the rate and pitch. Only one webSpeaker should be active at a time and so this
 * type is a singleton.
 *
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import Enumeration from '../../../phet-core/js/Enumeration.js';
import EnumerationProperty from '../../../axon/js/EnumerationProperty.js';
import NumberProperty from '../../../axon/js/NumberProperty.js';
import Property from '../../../axon/js/Property.js';
import Range from '../../../dot/js/Range.js';
import stripEmbeddingMarks from '../../../phet-core/js/stripEmbeddingMarks.js';

const Verbosity = Enumeration.byKeys( [ 'BRIEF', 'VERBOSE' ] );

class WebSpeaker {
  constructor() {

    // @public {BooleanProperty} - if true, content will be read to the user as they scan for what is in the simulation
    // before actually interacting with anything
    this.exploreModeProperty = new BooleanProperty( true );

    // @public {BooleanProperty} - if true, content will be read to the user while interacting with various objects
    this.interactiveModeProperty = new BooleanProperty( true );

    // {Property.<Verbosity>} - the "interactive mode" self voicing content can be brief or more "verbose",
    // debending on user selection
    this.interactiveModeVerbosityProperty = new EnumerationProperty( Verbosity, Verbosity.VERBOSE );

    // {EnumerationProperty.<Verbosity>} - the "explore mode" self voicing content can be brief or verbose, depending
    // on user selection
    this.exploreModeVerbosityProperty = new EnumerationProperty( Verbosity, Verbosity.VERBOSE );

    // @public {null|SpeechSynthesisVoice}
    this.voiceProperty = new Property( null );

    // @public {NumberProperty} - controls the speaking rate of Web Speech
    this.voiceRateProperty = new NumberProperty( 1.4, { range: new Range( 1, 1.8 ) } );

    // {NumberProperty} - controls the pitch of the synth
    this.voicePitchProperty = new NumberProperty( 1.02, { range: new Range( 1, 1.1 ) } );

    // create the synthesizer
    this.synth = window.speechSynthesis;

    // @public {SpeechSynthesisVoice[]} - possible voices for Web Speech synthesis
    this.voices = [];

    // @public {boolean} - is the WebSpeaker initialized for use? This is prototypal so it isn't always initialized
    this.initialized = false;

    // @public {boolean} - is the WebSpeaker enabled? If not, there will be no speech output from this speaker
    this.enabled = true;

    // On chrome, synth.getVoices() returns an empty array until the onvoiceschanged event, so we have to
    // wait to populate
    const populateVoicesListener = () => {
      this.populateVoices();

      // remove the listener after they have been populated once from this event
      this.synth.onvoiceschanged = null;
    };
    this.synth.onvoiceschanged = populateVoicesListener;
  }

  /**
   * Indicate that the webSpeaker is ready for use, and attempt to populate voices (if they are ready yet).
   */
  initialize() {
    this.initialized = true;

    // try to populate voice options first
    this.populateVoices();
  }

  /**
   * Get the available voices for the synth, and set to default.
   * @rivate
   */
  populateVoices() {
    this.voices = this.synth.getVoices();
    this.voiceProperty.set( this.voices[ 0 ] );
  }

  /**
   * Use speech synthesis to speak an utterance. No-op unless webSpeaker is initialized.
   * @param {string} utterThis
   */
  speak( utterThis ) {
    if ( this.initialized && this.enabled ) {
      this.synth.cancel();

      // embidding marks (for i18n) impact the output, strip before speaking
      const utterance = new SpeechSynthesisUtterance( stripEmbeddingMarks( utterThis ) );
      utterance.voice = this.voiceProperty.value;
      utterance.pitch = this.voicePitchProperty.value;
      utterance.rate = this.voiceRateProperty.value;

      this.synth.speak( utterance );
    }
  }

  /**
   * Returns true if "explore" mode is active and we are in "verbose" mode under that setting.
   */
  getExploreModeVerbose() {
    return this.exploreModeProperty.get() && this.exploreModeVerbosityProperty.get() === Verbosity.VERBOSE;
  }

  getExploreModeBrief() {
    return this.exploreModeProperty.get() && this.exploreModeVerbosityProperty.get() === Verbosity.BRIEF;
  }

  getInteractiveModeVerbose() {
    return this.interactiveModeProperty.get() && this.interactiveModeVerbosityProperty.get() === Verbosity.VERBOSE;
  }

  getInteractiveModeBrief() {
    return this.interactiveModeProperty.get() && this.interactiveModeVerbosityProperty.get() === Verbosity.BRIEF;
  }
}

const webSpeaker = new WebSpeaker();

// @public
// @static
webSpeaker.Verbosity = Verbosity;
inverseSquareLawCommon.register( 'WebSpeaker', webSpeaker );
export default webSpeaker;