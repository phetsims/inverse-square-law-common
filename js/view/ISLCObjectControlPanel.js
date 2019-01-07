// Copyright 2017-2018, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  var GroupFocusHighlightFromNode = require( 'SCENERY/accessibility/GroupFocusHighlightFromNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern0Value1UnitsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/pattern_0value_1units' );

  // constants
  var THUMB_SIZE = new Dimension2( 22, 42 );
  var TITLE_MAX_WIDTH = 120; // max widths are set empirically to handle long strings
  var VALUE_MAX_WIDTH = 110;

  /**
   * @param {string} titleString
   * @param {string} unitString
   * @param {Property.<number>} objectProperty
   * @param {Range} valueRange
   * @param {Object} [options]
   * @constructor
   */
  function ISLCObjectControlPanel( titleString, unitString, objectProperty, valueRange, options ) {

    options = _.extend( {

      // panel options
      fill: '#EDEDED',
      xMargin: 10,
      yMargin: 4,
      resize: false,
      align: 'right',

      // a11y
      tagName: 'div',

      numberControlOptions: null,
      tickLabelOptions: {},

      tandem: Tandem.required
    }, options );

    var tandem = options.tandem;

    // define first because they are used by numberControlOptions
    options.tickLabelOptions = _.extend( {
      pickable: false
    }, options.tickLabelOptions );

    // options that are passed along to the number control
    options.numberControlOptions = _.extend( {
      numberDisplayOptions: null,

      sliderOptions: null,
      arrowButtonOptions: {
        scale: 1
      },

      additionalTicks: [],

      // layout options
      layoutFunction: NumberControl.createLayoutFunction3( { xSpacing: 10 } ),

      // title and value text options
      titleFont: new PhetFont( 12 ),
      titleMaxWidth: TITLE_MAX_WIDTH,
      onFocus: function( event ) {},

      // phet-io
      tandem: tandem.createTandem( 'numberControl' )
    }, options.numberControlOptions );

    options.numberControlOptions.numberDisplayOptions = _.extend( {
      // Don't fill in the {0}, it will be filled in by NumberControl
      valuePattern: StringUtils.fillIn( pattern0Value1UnitsString, { value: '{0}', units: unitString } ),
      font: new PhetFont( 12 ),
      align: 'right',
      xMargin: 10,
      yMargin: 4,
      backgroundStroke: 'black',
      maxWidth: VALUE_MAX_WIDTH,
      cornerRadius: 3
    }, options.numberControlOptions.numberDisplayOptions );

    options.numberControlOptions.sliderOptions = _.extend( {
      minorTickSpacing: 2,
      minorTickLength: 6,
      trackFillEnabled: 'black',
      thumbSize: THUMB_SIZE,

      // tick options
      majorTicks: [ {
        value: valueRange.min,
        label: new Text(
          valueRange.min,
          _.extend( { tandem: options.tandem.createTandem( 'majorTickMinLabel' ) }, options.tickLabelOptions )
        )
      }, {
        value: valueRange.max,
        label: new Text(
          valueRange.max,
          _.extend( { tandem: options.tandem.createTandem( 'majorTickMaxLabel' ) }, options.tickLabelOptions )
        )
      } ],
      tickLabelSpacing: 1,
      majorTickLength: 8
    }, options.numberControlOptions.sliderOptions );

    for ( var i = 0; i < options.numberControlOptions.additionalTicks.length; i++ ) {
      var tick = {
        value: options.numberControlOptions.additionalTicks[ i ].value,
        label: new Text( options.numberControlOptions.additionalTicks[ i ].value, _.extend( {
          tandem: options.tandem.createTandem( options.numberControlOptions.additionalTicks[ i ].tandemLabel )
        }, options.tickLabelOptions ) )
      };
      options.numberControlOptions.sliderOptions.majorTicks.push( tick );
    }

    var numberControl = new NumberControl( titleString, objectProperty, valueRange, options.numberControlOptions );

    Panel.call( this, numberControl, options );
    // debugger;
    numberControl.addInputListener( {
      focus: options.numberControlOptions.onFocus
    } );
    // a11y - it looks nicer if the entire panel has a group focus highlight rather than the NumberControl
    assert && assert( options.numberControlOptions.groupFocusHighlight === undefined, 'ISLCObjectControlPanel sets group focus highlight' );
    numberControl.groupFocusHighlight = false;

    // a11y - creates highlight that appears around this node when any ancestor (like the
    // NumberControl) has focus
    // this.groupFocusHighlight = new GroupFocusHighlightFromNode( this, {
    //   useLocalBounds: true,
    //   dilationCoefficient: 3.7,
    //   outerStroke: FocusHighlightPath.OUTER_DARK_GROUP_FOCUS_COLOR,
    //   innerStroke: FocusHighlightPath.INNER_DARK_GROUP_FOCUS_COLOR
    // } );
  }

  inverseSquareLawCommon.register( 'ISLCObjectControlPanel', ISLCObjectControlPanel );

  return inherit( Panel, ISLCObjectControlPanel );
} );