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
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern0Value1UnitsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/pattern_0value_1units' );

  // constants
  var THUMB_SIZE = new Dimension2( 22, 42 );

  /**
   * @param {string} titleString
   * @param {Property.<number>} objectProperty
   * @param {Range} valueRange
   * @param {Tandem} tandem
   * @constructor
   */
  function ISLCObjectControl( titleString, unitString, objectProperty, valueRange, tandem, options ) {

    // major ticks
    var tickLabelOptions = options.tickLabelOptions ? _.extend( { pickable: false }, options.tickLabelOptions ) : { pickable: false };
    options = _.extend( {
      fill: '#EDEDED',
      xMargin: 10,
      yMargin: 4,
      // minWidth: 224,
      resize: false,
      align: 'right',

      titleFont: new PhetFont( options.titleFontSize ),
      valueFont: new PhetFont( options.valueFontSize ),

      // Don't fill in the {0}, it will be filled in by NumberControl
      valuePattern: StringUtils.format( pattern0Value1UnitsString, '{0}', unitString ),
      layoutFunction: NumberControl.createLayoutFunction3( { xSpacing: 10 } ),
      minorTickSpacing: 2,
      minorTickLength: 6,
      arrowButtonScale: 1,
      trackFillEnabled: 'black',
      thumbSize: THUMB_SIZE,
      additionalTicks: [],
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
      majorTickLength: 8,
      valueAlign: 'right',
      valueXMargin: 10,
      valueYMargin: 4,
      valueBackgroundStroke: 'black',
      valueBackgroundCornerRadius: 3,
      tickLabelSpacing: 1,
    } , options );

    for (var i = 0; i < options.additionalTicks.length; i++) {
      var tick = {
        value: options.additionalTicks[i].value,
        label: new Text(
          options.additionalTicks[i].value,
          _.extend( { tandem: tandem.createTandem( options.additionalTicks[i].tandemLabel ) }, tickLabelOptions )
        )
      };
      options.majorTicks.push(tick);
    }

    var optionsFilter = ['fill', 'xMargin', 'yMargin', 'resize', 'align', 'right', 'top'];

    var panelOptions = _.pick(options, optionsFilter);

    options = _.omit(options, optionsFilter);

    var numberControl = new NumberControl( titleString, objectProperty, valueRange, _.extend( { tandem: tandem.createTandem( 'numberControl' ) }, options ) );

    Panel.call( this, numberControl, _.extend( { tandem: tandem }, panelOptions) );
  }

  inverseSquareLawCommon.register( 'ISLCObjectControl', ISLCObjectControl );

  return inherit( Panel, ISLCObjectControl );
} );
