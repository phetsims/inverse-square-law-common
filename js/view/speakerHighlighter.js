// Copyright 2020, University of Colorado Boulder

/**
 * Manages highlights to indicate the state of self-voicing speech, as well as what objects have self-voicing content.
 * This is coupled with SelfVoicingInputListener, which updates the Properties tracking the pointer's over Trail.
 *
 * Very rough, prototype code. Uncertain whether this design will be around long-term.
 * For now, goes through FocusOverlay to display the highlight for a Node, but does so by accessing private things.
 * If we want to continue with this feature, we should reconsider the solution. Either FocusOverlay should
 * be changed to support this more thoroghly, or a different strategy should be used entirely.
 *
 * @author Jesse Greenberg
 */

import levelSpeakerModel from '../../../scenery-phet/js/accessibility/speaker/levelSpeakerModel.js';
import SelfVoicingFocusHighlight from '../../../scenery-phet/js/accessibility/speaker/SelfVoicingFocusHighlight.js';
import webSpeaker from '../../../scenery/js/accessibility/speaker/webSpeaker.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import Property from '../../../axon/js/Property.js';
import Display from '../../../scenery/js/display/Display.js';

class SpeakerHighlighter {
  constructor() {

    // @private {Property.<boolean|null>} - the current trail which has a Pointer over it - updated in
    // SelfVoicingInputListener
    this.overTrailProperty = new Property( null );

    // @private {Property.<boolean|null>} - the current trail to wich the webSpeaker is curently speaking about
    // the 'overTrail' becomes the 'speakingTrail' when the webSpeaker starts speaking while there
    // is an 'overTrail'.
    this.speakingTrailProperty = new Property( null );
  }

  /**
   * Initialize the highlighter, attaching listeners that control visibility of highlights.
   * @public
   */
  initialize() {

    // the current Trail for which there is an active Pointer over or focused on a Node
    let activeHighlightTrail = null;

    // if there is an activeHighlightTrail, the speakingHighlightTrail becomes defined when the webSpeaker
    // begins to speak
    webSpeaker.speakingProperty.link( speaking => {
      if ( speaking && activeHighlightTrail ) {
        this.speakingTrailProperty.value = activeHighlightTrail;
      }
      else {
        this.speakingTrailProperty.value = null;
      }
    } );

    Property.multilink( [ this.overTrailProperty, this.speakingTrailProperty ], ( overTrail, speakingTrail ) => {

      // prioritize the speakingHighlightTrail as long as the webSpeaker is speaking - otherwise show highlights
      // under the over trail
      const trailToHighlight = speakingTrail || overTrail;
      if ( trailToHighlight ) {
        if ( phet.joist.sim.display._focusOverlay.hasHighlight() ) {
          assert && assert( activeHighlightTrail, 'trail to active highlight required' );
          phet.joist.sim.display._focusOverlay.deactivateHighlight( activeHighlightTrail );
        }

        // SelfVoicingFocusHighlights are always show, but only show default highlights if option is selected by user
        const instanceOfSelfVoicingHighlight = trailToHighlight.lastNode().focusHighlight instanceof SelfVoicingFocusHighlight;
        const showHighlight = instanceOfSelfVoicingHighlight || levelSpeakerModel.showHoverHighlightsProperty.get();

        activeHighlightTrail = trailToHighlight;
        if ( showHighlight ) {
          Display.focusedNode && Display.focusedNode.blur();
          phet.joist.sim.display._focusOverlay.activateHighlight( activeHighlightTrail );
        }
      }
      else {
        if ( phet.joist.sim.display._focusOverlay.hasHighlight() ) {
          assert && assert( activeHighlightTrail, 'trail to active highlight required' );
          phet.joist.sim.display._focusOverlay.deactivateHighlight( activeHighlightTrail );

          activeHighlightTrail = null;
        }
      }
    } );
  }
}

const speakerHighlighter = new SpeakerHighlighter();

inverseSquareLawCommon.register( 'speakerHighlighter', speakerHighlighter );
export default speakerHighlighter;
