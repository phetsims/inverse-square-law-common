// Copyright 2020, University of Colorado Boulder

/**
 * Uses the Web Speech API to produce speech from the browser. This is a prototype, DO NOT USE IN PRODUCTION CODE.
 * There is no speech output until the webSpeaker has been initialized. Supported voices will depend on platform.
 * For each voice, you can customize the rate and pitch. Only one webSpeaker should be active at a time and so this
 * type is a singleton.
 *
 * @author Jesse Greenberg
 */

import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import NumberProperty from '../../../axon/js/NumberProperty.js';
import Property from '../../../axon/js/Property.js';
import Range from '../../../dot/js/Range.js';
import stripEmbeddingMarks from '../../../phet-core/js/stripEmbeddingMarks.js';

class WebSpeaker {
  constructor() {

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
   * @public
   */
  initialize() {
    this.initialized = true;

    // try to populate voice options first
    this.populateVoices();
  }

  /**
   * Get the available voices for the synth, and set to default.
   * @private
   */
  populateVoices() {
    this.voices = this.synth.getVoices();
    this.voiceProperty.set( this.voices[ 0 ] );
  }

  /**
   * Use speech synthesis to speak an utterance. No-op unless webSpeaker is initialized.
   * @param {string} utterThis
   * @public
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
}

const webSpeaker = new WebSpeaker();

inverseSquareLawCommon.register( 'webSpeaker', webSpeaker );
export default webSpeaker;