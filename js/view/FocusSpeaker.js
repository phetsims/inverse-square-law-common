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

  /**
   * TODO document
   * @param targetNode
   * @public
   */
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

  /**
   * TODO document
   * @param targetNode
   * @private
   */
  makeTargetFocusable( targetNode ) {
    assert && assert( targetNode.tagName === null, 'target should have no accessible content before becoming focusable for self-voicing' );
    assert && assert( targetNode.focusable === false, 'target should not be initially focusable' );

    targetNode.tagName = 'div';
    targetNode.focusable = true;
  }

  /**
   * TODO document
   * @param targetNode
   * @private
   */
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
