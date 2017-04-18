// Copyright 2013-2015, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author  Jesse Greenberg
 * @author  Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var pattern0Value1UnitsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/pattern_0value_1units' );

  // constants
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );

  /**
   * @param {string} titleString
   * @param {Property.<number>} objectProperty
   * @param {Range} valueRange
   * @param {Color} thumbColor
   * @param {Tandem} tandem
   * @constructor
   */
  function ObjectControl( titleString, unitString, objectProperty, valueRange, thumbColor, tandem, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,
      maxWidth: 224,
      minWidth: 224,
      resize: false,
      align: 'right',
      tandem: tandem
    }, options );

    // major ticks
    var tickLabelOptions = { font: new PhetFont( 14 ), pickable: false };

    var numberControl = new NumberControl( titleString, objectProperty, valueRange, {
      titleFont: new PhetFont( 24 ),
      valueFont: new PhetFont( 18 ),

      // Don't fill in the {0}, it will be filled in by NumberControl
      valuePattern: StringUtils.format( pattern0Value1UnitsString, '{0}', unitString ),
      majorTicks: [ {
        value: valueRange.min,
        label: new Text(
          valueRange.min,
          _.extend( { tandem: tandem.createTandem( 'majorTickMinLabel' ) }, tickLabelOptions )
        )
      }, {
        value: valueRange.max,
        label: new Text(
          valueRange.max,
          _.extend( { tandem: tandem.createTandem( 'majorTickMaxLabel' ) }, tickLabelOptions )
        )
      } ],
      layoutFunction: NumberControl.createLayoutFunction3( { xSpacing: 10 } ),
      thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
      thumbFillHighlighted: thumbColor,
      arrowButtonScale: 1,
      trackSize: TRACK_SIZE,
      trackFillEnabled: 'black',
      thumbSize: THUMB_SIZE,
      majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
      valueXMargin: 20,
      valueYMargin: 4,
      valueBackgroundStroke: 'black',
      valueBackgroundCornerRadius: 3,
      tickLabelSpacing: 2,
      tandem: tandem.createTandem( 'numberControl' )
    } );

    Panel.call( this, numberControl, options );
  }

  inverseSquareLawCommon.register( 'ObjectControl', ObjectControl );

  return inherit( Panel, ObjectControl );
} );
