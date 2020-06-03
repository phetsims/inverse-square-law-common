// Copyright 2020, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import levelSpeakerModel from './levelSpeakerModel.js';

class FocusSpeaker {
  constructor() {

    // @private {Node} - so they can potentially be removed later
    this.targetNodes = [];
  }

  addNode( targetNode ) {
    this.targetNodes.push( targetNode );

    levelSpeakerModel.basicReadingProperty.link( basicReading => {
      if ( basicReading ) {
        this.makeTargetFocusable( targetNode );
      }
      else {
        this.makeTargetNonFocusable( targetNode );
      }
    } );
  }

  makeTargetFocusable( targetNode ) {
    assert && assert( targetNode.tagName === null, 'target should have no accessible content before becoming focusable for self-voicing' );
    assert && assert( targetNode.focusable === false, 'target should not be initially focusable' );

    targetNode.tagName = 'div';
    targetNode.focusable = true;
  }

  makeTargetNonFocusable( targetNode ) {
    assert && assert( targetNode.tagName === 'div', 'target should only have default tagname, no other semantics' );
    assert && assert( targetNode.focusable === true, 'target should be initially focusable' );

    targetNode.tagName = null;
    targetNode.focusable = false;
  }
}

const focusSpeaker = new FocusSpeaker();
inverseSquareLawCommon.register( 'focusSpeaker', focusSpeaker );

export default focusSpeaker;
