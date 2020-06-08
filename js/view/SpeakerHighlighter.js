// Copyright 2020, University of Colorado Boulder

/**
 * Manages highlights to indicate the state of self-voicing speech, as well as what has self voicing content.
 * Some view componnents will have different highlights while information about the object is being spoken,
 * others will have a unique highlight when the object has focus or when a Pointer is over it to indicate
 * that it has self voicing content.
 *
 * Very rough, prototype code. Uncertain whether this design will be around for a while. But if it does, it
 * would be done in scenery as an overlay presumably (like the FocusOverlay).
 *
 * @author Jesse Greenberg
 */

import Shape from '../../../kite/js/Shape.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Path from '../../../scenery/js/nodes/Path.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

class SpeakerHighlighter extends Node {
  constructor( shapeHitDetector, webSpeaker ) {
    super();

    // the shape for the highlight
    this.highlightShape = new Shape();

    this.speakingPath = new Path( null, {
      fill: 'rgba(255,255,0,0.5)',
      stroke: 'black'
    } );

    this.speakablePath = new Path( null, {
      fill: 'rgba(0,255,255,0.5)',
      stroke: 'black',
      lineWidth: 0.5
    } );

    this.speakableActivated = false;

    shapeHitDetector.hitShapeEmitter.addListener( hitTarget => {
      if ( hitTarget !== null ) {
        this.highlightShape = Shape.bounds( hitTarget.globalBounds );
        this.activateSpeakablePath();
      }
      else {
        this.deactivateSpeakablePath();
      }
    } );

    webSpeaker.startSpeakingEmitter.addListener( () => {
      if ( this.speakableActivated ) {
        this.deactivateSpeakablePath();
        this.activateSpeakingPath();
      }
    } );

    webSpeaker.endSpeakingEmitter.addListener( () => {
      this.deactivateSpeakingPath();
      this.activateSpeakablePath();
    } );

    this.children = [ this.speakingPath, this.speakablePath ];
  }

  /**
   * "Activate" the path during speaking, making it visible and giving it the active highlight shape. This is
   * the path that indicates that the object has some content to be read.
   * @private
   */
  activateSpeakablePath() {
    this.speakablePath.visible = true;
    this.speakablePath.shape = this.highlightShape;

    this.speakableActivated = true;
  }

  /**
   * The highlight path becomes invisible, removing any highlighting around the target hittble of the
   * shapeHitDetector. This is the path that indicates that the object has some content to be read.
   */
  deactivateSpeakablePath() {
    this.speakablePath.visible = false;
    this.speakablePath.shape = null;

    this.speakableActivated = false;
  }

  /**
   * "Activate" the path during speaking, making it visible and giving it the active highlight shape. This path
   * indicates that the target of the shapeHitDetector is active and the web speaker is actively speaking
   * about it.
   * @private
   */
  activateSpeakingPath() {
    this.speakingPath.visible = true;
    this.speakingPath.shape = this.highlightShape;
  }

  /**
   * The highlight for the speaking path becomes invisible, and is removed. Indicates that the webSpeaker is done
   * speaking.
   * @private
   */
  deactivateSpeakingPath() {
    this.speakingPath.visible = false;
    this.speakingPath.shape = null;
  }
}

inverseSquareLawCommon.register( 'SpeakerHighlighter', SpeakerHighlighter );

export default SpeakerHighlighter;
