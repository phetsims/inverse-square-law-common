// Copyright 2020-2022, University of Colorado Boulder

/**
 * @author Jesse Greenberg
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import EnumerationDeprecatedProperty from '../../../axon/js/EnumerationDeprecatedProperty.js';
import EnumerationDeprecated from '../../../phet-core/js/EnumerationDeprecated.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

const Verbosity = EnumerationDeprecated.byKeys( [ 'BRIEF', 'VERBOSE' ] );

class CursorSpeakerModel {
  constructor() {

    // @public {BooleanProperty} - if true, content will be read to the user as they scan for what is in the simulation
    // before actually interacting with anything
    this.exploreModeProperty = new BooleanProperty( true );

    // @public {BooleanProperty} - if true, content will be read to the user while interacting with various objects
    this.interactiveModeProperty = new BooleanProperty( true );

    // {Property.<Verbosity>} - the "interactive mode" voicing content can be brief or more "verbose",
    // debending on user selection
    this.interactiveModeVerbosityProperty = new EnumerationDeprecatedProperty( Verbosity, Verbosity.VERBOSE );

    // {EnumerationDeprecatedProperty.<Verbosity>} - the "explore mode" voicing content can be brief or verbose, depending
    // on user selection
    this.exploreModeVerbosityProperty = new EnumerationDeprecatedProperty( Verbosity, Verbosity.VERBOSE );
  }

  /**
   * Returns true if "explore" mode is active and we are in "verbose" mode under that setting.
   * @public
   */
  getExploreModeVerbose() {
    return this.exploreModeProperty.get() && this.exploreModeVerbosityProperty.get() === Verbosity.VERBOSE;
  }

  /**
   * @public
   * @returns {boolean}
   */
  getExploreModeBrief() {
    return this.exploreModeProperty.get() && this.exploreModeVerbosityProperty.get() === Verbosity.BRIEF;
  }

  /**
   * @public
   * @returns {boolean}
   */
  getInteractiveModeVerbose() {
    return this.interactiveModeProperty.get() && this.interactiveModeVerbosityProperty.get() === Verbosity.VERBOSE;
  }

  /**
   * @public
   * @returns {boolean}
   */
  getInteractiveModeBrief() {
    return this.interactiveModeProperty.get() && this.interactiveModeVerbosityProperty.get() === Verbosity.BRIEF;
  }
}

const cursorSpeakerModel = new CursorSpeakerModel();

// @public
// @static
cursorSpeakerModel.Verbosity = Verbosity;

inverseSquareLawCommon.register( 'cursorSpeakerModel', cursorSpeakerModel );

export default cursorSpeakerModel;
