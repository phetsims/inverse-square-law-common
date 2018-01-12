// Copyright 2017, University of Colorado Boulder

/**
 * Panel with a vertical check box group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Panel = require( 'SUN/Panel' );
  var Tandem = require( 'TANDEM/Tandem' );
  var VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  /**
   * @param {ISLCCheckboxItem[]} checkboxItems
   * @param {Object} [options]
   * @constructor
   */
  function ISLCCheckboxPanel( checkboxItems, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left',
      tandem: Tandem.required
    }, options );

    // the check boxes in the group will be as wide as the labels are tall
    var checkboxWidth = _.max( checkboxItems.map( function( item ) {
      return item.content.height;
    } ) );

    assert && assert( checkboxWidth > 0, 'checkbox width must be positive' );

    var checkboxGroup = new VerticalCheckboxGroup( checkboxItems, {
      boxWidth: checkboxWidth
    } );

    Panel.call( this, checkboxGroup, options );
  }

  inverseSquareLawCommon.register( 'ISLCCheckboxPanel', ISLCCheckboxPanel );

  return inherit( Panel, ISLCCheckboxPanel );
} );