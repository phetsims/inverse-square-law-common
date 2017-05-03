// Copyright 2013-2015, University of Colorado Boulder

/**
 * control that allows the user to show or hide the force values
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  // var constantRadiusString = require( 'string!GRAVITY_FORCE_LAB/constantRadius' );
  // var showValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/showValues' );

  // constants
  // var MAX_CAPTION_WIDTH = 120; // empirically determined through testing with long strings

  /**
   * @param {items} list of item objects to attach
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCheckboxPanel( items, tandem, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left',
      textSize: 14,
      tandem: tandem
    }, options );

    var verticalCheckBoxItems = [];

    items.forEach( function( item ) {
      var itemLabel = new Text(
        item.content,
        {
          tandem: tandem.createTandem( item.textTandemLabel ),
          font: new PhetFont( options.textSize )
        }
      );

      verticalCheckBoxItems.push({
        content: itemLabel,
        property: item.property,
        tandemName: item.checkboxTandemLabel
      });

    });

    var checkboxGroup = new VerticalCheckBoxGroup( verticalCheckBoxItems );

    Panel.call( this, checkboxGroup, options );
  }

  inverseSquareLawCommon.register( 'ISLCheckboxPanel', ISLCheckboxPanel );

  return inherit( Panel, ISLCheckboxPanel );
} );