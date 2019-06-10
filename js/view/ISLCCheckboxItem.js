// Copyright 2018-2019, University of Colorado Boulder

/**
 * A checkbox that is displayed in an ISLCCheckboxPanel.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulatins)
 */
define( function( require ) {
  'use strict';

  // modules
  var Checkbox = require( 'SUN/Checkbox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var DEFAULT_MAX_TEXT_WIDTH = 125;
  var DEFAULT_TEXT_SIZE = 14;

  /**
   * @param {string} label - the text that will appear next to the checkbox
   * @param {Property.<boolean>} property - the property that governs whether the checkbox is selected
   * @param {Object} options [options]
   * @constructor
   */
  function ISLCCheckboxItem( label, property, options ) {
    options = _.extend( {

      textSize: DEFAULT_TEXT_SIZE,
      textMaxWidth: DEFAULT_MAX_TEXT_WIDTH,
      spacing: 10,
      padding: 8,
      boxWidth: 16,
      appendLabel: false,
      tandem: Tandem.required
    }, options );

    var labelContent = new Text( label, {
        tandem: options.tandem.createTandem( 'labelNode' ),
        font: new PhetFont( options.textSize ),
        maxWidth: options.textMaxWidth
      }
    );

    var maxWidth = Math.max( DEFAULT_MAX_TEXT_WIDTH, labelContent.width );

    var content = new Node( {
      children: [ new HStrut( maxWidth + options.padding ), labelContent ]
    } );

    Checkbox.call( this, content, property,
      _.pick( options, [
        'boxWidth',
        'tandem',
        'accessibleName',
        'descriptionContent',
        'appendLabel'
       ] ) );
  }

  inverseSquareLawCommon.register( 'ISLCCheckboxItem', ISLCCheckboxItem );

  return inherit( Checkbox, ISLCCheckboxItem );
} );