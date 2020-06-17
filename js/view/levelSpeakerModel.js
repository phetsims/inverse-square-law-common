// Copyright 2020, University of Colorado Boulder

/**
 * A model for the "Speaking Levels" prototype of the self-voicing output. User can layer on different levels
 * of helpful output. See the Properties below for the kinds of output that is added on in each level.
 *
 * This is a singleton model as it controls output for the entire simulation.
 *
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

class LevelSpeakerModel {
  constructor() {

    // @public {BooleanProperty} - whether or not 'object responses' are read as interactive components change
    this.objectChangesProperty = new BooleanProperty( true );

    // @public {BooleanProperty} - whether or not "context responses" are read as simulation objects change
    this.contextChangesProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - whether or not helpful or interaction hints are read to the user
    this.hintsProperty = new BooleanProperty( false );
  }

  /**
   * On the "levels" prototype, there is different behavior for highlighting and output depending on whether a Node
   * is interactive or not. That information is registered on the Node here.
   *
   * NOTE: I am not sure the best place to do this yet, but this will do for rapid prototyping.
   * - Another Mixin with this (and other) data?
   * @public
   *
   * - property for Node directly?
   * @param {Node} node
   * @param {boolean} interactive
   */
  setNodeInteractive( node, interactive ) {
    node.consideredInteractive = interactive;
  }

  /**
   * Get whether the node is considered "interactive" for the self voicing prototype, which will indiciate that
   * it has different behavior for highlighting and voicing.
   * @public
   *
   * @param {Node} node
   * @returns {boolean|undefined} - could be undefined until there is a value set (or its built in more thoroughly)
   */
  getNodeInteractive( node ) {
    return node.consideredInteractive;
  }
}

inverseSquareLawCommon.register( 'LevelSpeakerModel', LevelSpeakerModel );

const levelSpeakerModel = new LevelSpeakerModel();
export default levelSpeakerModel;
