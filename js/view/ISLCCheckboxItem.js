// Copyright 2017, University of Colorado Boulder

/**
 * A checkbox item displayed in an ISLCCheckboxPanel.  Conforms to the interface of values passed to VerticalCheckBoxGroup
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var DEFAULT_MAX_TEXT_WIDTH = 120;
  var DEFAULT_TEXT_SIZE = 14;

  /**
   * @param {string} label - the text that will appear next to the check box
   * @param {Property.<boolean>} property - the property that governs whether the checkbox is selected
   * @param {Object} options [options]
   * @constructor
   */
  function ISLCCheckboxItem( label, property, options ) {
    options = _.extend( {
      tandem: Tandem.required,
      textSize: DEFAULT_TEXT_SIZE,
      textMaxWidth: DEFAULT_MAX_TEXT_WIDTH
    }, options );

    // @public - the content of the check box
    this.content = new Text( label, {
        tandem: options.tandem.createTandem( 'labelNode' ),
        font: new PhetFont( options.textSize ),
        maxWidth: options.textMaxWidth
      }
    );

    // @public - the Property that governs whether the checkbox is selected or not
    this.property = property;

    // @public
    this.tandem = options.tandem;
  }

  inverseSquareLawCommon.register( 'ISLCCheckboxItem', ISLCCheckboxItem );

  return inherit( Object, ISLCCheckboxItem );
} );