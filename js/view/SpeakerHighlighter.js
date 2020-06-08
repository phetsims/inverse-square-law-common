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
   * TODO document
   * @private
   */
  activateSpeakablePath() {
    this.speakablePath.visible = true;
    this.speakablePath.shape = this.highlightShape;

    this.speakableActivated = true;
  }

  /**
   * TODO document
   * @private
   */
  deactivateSpeakablePath() {
    this.speakablePath.visible = false;
    this.speakablePath.shape = null;

    this.speakableActivated = false;
  }

  /**
   * TODO document
   * @private
   */
  activateSpeakingPath() {
    this.speakingPath.visible = true;
    this.speakingPath.shape = this.highlightShape;
  }

  /**
   * TODO document
   * @private
   */
  deactivateSpeakingPath() {
    this.speakingPath.visible = false;
    this.speakingPath.shape = null;
  }
}

inverseSquareLawCommon.register( 'SpeakerHighlighter', SpeakerHighlighter );

export default SpeakerHighlighter;
