// Copyright 2017-2019, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations
 */
define( function( require ) {
  'use strict';

  // modules
  var FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  var GroupFocusHighlightFromNode = require( 'SCENERY/accessibility/GroupFocusHighlightFromNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var merge = require( 'PHET_CORE/merge' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern0Value1UnitsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/pattern_0value_1units' );

  // constants
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

    options = merge( {

      // panel options
      fill: '#EDEDED',
      xMargin: 10,
      yMargin: 4,
      resize: false,
      align: 'right',

      numberControlOptions: null, // filled in below

      // filled in here because they are used by numberControlOptions below
      tickLabelOptions: {
        pickable: false
      },
      additionalTicks: [],

      // a11y
      tagName: 'div', // this optional structure is added for nicer formatting of value-text in the a11y view

      // phet-io
      tandem: Tandem.required
    }, options );

    var tandem = options.tandem;

    // options that are passed along to the number control
    var numberControlOptions = merge( {

      // layout options
      layoutFunction: NumberControl.createLayoutFunction3( { xSpacing: 10 } ),
      numberDisplayOptions: {
        valuePattern: StringUtils.fillIn( pattern0Value1UnitsString, { units: unitString } ),
        align: 'right',
        xMargin: 10,
        yMargin: 4,
        backgroundStroke: 'black',
        cornerRadius: 3,
        font: new PhetFont( 12 ),
        maxWidth: VALUE_MAX_WIDTH
      },
      sliderOptions: {
        trackFillEnabled: 'black',

        // tick options
        minorTickSpacing: 2,
        minorTickLength: 6,
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
        majorTickLength: 8,
        tickLabelSpacing: 1
      },
      arrowButtonOptions: {
        touchAreaXDilation: 15,
        touchAreaYDilation: 15,
        scale: 1
      },

      // title and value text options
      titleNodeOptions: {
        font: new PhetFont( 12 ),
        maxWidth: TITLE_MAX_WIDTH
      },

      // phet-io
      tandem: tandem.createTandem( 'numberControl' )
    }, options.numberControlOptions );

    for ( var i = 0; i < options.additionalTicks.length; i++ ) {
      var tick = {
        value: options.additionalTicks[ i ].value,
        label: new Text( options.additionalTicks[ i ].value, _.extend( {
          tandem: options.tandem.createTandem( options.additionalTicks[ i ].tandemLabel )
        }, options.tickLabelOptions ) )
      };
      numberControlOptions.sliderOptions.majorTicks.push( tick );
    }

    // @protected
    this.numberControl = new NumberControl( titleString, objectProperty, valueRange, numberControlOptions );

    options = _.omit( options, [ 'numberControlOptions', 'tickLabelOptions' ] );
    Panel.call( this, this.numberControl, options );

    // a11y - it looks nicer if the entire panel has a group focus highlight rather than the NumberControl
    assert && assert( numberControlOptions.groupFocusHighlight === undefined, 'ISLCObjectControlPanel sets group focus highlight' );
    this.numberControl.groupFocusHighlight = false;

    // a11y - creates highlight that appears around this node when any ancestor (like the
    // NumberControl) has focus
    this.groupFocusHighlight = new GroupFocusHighlightFromNode( this, {
      useLocalBounds: true,
      dilationCoefficient: 3.7,
      outerStroke: FocusHighlightPath.OUTER_DARK_GROUP_FOCUS_COLOR,
      innerStroke: FocusHighlightPath.INNER_DARK_GROUP_FOCUS_COLOR
    } );
  }

  inverseSquareLawCommon.register( 'ISLCObjectControlPanel', ISLCObjectControlPanel );

  return inherit( Panel, ISLCObjectControlPanel );
} );