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

    // @public {BooleanProperty} - whether or not basic information is read on activation of help areas
    this.basicReadingProperty = new BooleanProperty( true );

    // @public {BooleanProperty} - whether or not 'object responses' are read as interactive components change
    this.objectChangesProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - whether or not "context responses" are read as simulation objects change
    this.contextChangesProperty = new BooleanProperty( false );

    // @public {BooleanProperty} - whether or not helpful or interaction hints are read to the user
    this.hintsProperty = new BooleanProperty( false );
  }
}

inverseSquareLawCommon.register( 'LevelSpeakerModel', LevelSpeakerModel );

const levelSpeakerModel = new LevelSpeakerModel();
export default levelSpeakerModel;
