// Copyright 2017-2020, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the object value amount.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations
 */
define( require => {
  'use strict';

  // modules
  const GroupFocusHighlightFromNode = require( 'SCENERY/accessibility/GroupFocusHighlightFromNode' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPanel' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberControl = require( 'SCENERY_PHET/NumberControl' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const pattern0Value1UnitsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/pattern_0value_1units' );

  // constants
  const TITLE_MAX_WIDTH = 150; // max widths are set empirically to handle long strings
  const VALUE_MAX_WIDTH = 110;

  class ISLCObjectControlPanel extends ISLCPanel {

    /**
     * @param {string} titleString
     * @param {string} unitString
     * @param {Property.<number>} objectProperty
     * @param {Range} valueRange
     * @param {Object} [options]
     */
    constructor( titleString, unitString, objectProperty, valueRange, options ) {

      options = merge( {

        // panel options
        fill: '#EDEDED',
        xMargin: 10,
        yMargin: 4,
        resize: false,
        align: 'right',
        minWidth: 100, // to offset parent minWidth

        numberControlOptions: null, // filled in below

        // filled in here because they are used by numberControlOptions below
        tickLabelOptions: {
          pickable: false
        },
        additionalTicks: [],

        // a11y
        tagName: 'div', // this optional structure is added for nicer formatting of value-text in the a11y view

        // phet-io
        tandem: Tandem.REQUIRED
      }, options );

      const tandem = options.tandem;

      // options that are passed along to the number control
      const numberControlOptions = merge( {

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
            label: new Text( valueRange.min, options.tickLabelOptions )
          }, {
            value: valueRange.max,
            label: new Text( valueRange.max, options.tickLabelOptions )
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

      for ( let i = 0; i < options.additionalTicks.length; i++ ) {
        const tick = {
          value: options.additionalTicks[ i ].value,
          label: new Text( options.additionalTicks[ i ].value, options.tickLabelOptions )
        };
        numberControlOptions.sliderOptions.majorTicks.push( tick );
      }

      // @protected
      const numberControl = new NumberControl( titleString, objectProperty, valueRange, numberControlOptions );

      options = _.omit( options, [ 'numberControlOptions', 'tickLabelOptions' ] );
      super( numberControl, options );

      this.numberControl = numberControl;

      // a11y - it looks nicer if the entire panel has a group focus highlight rather than the NumberControl
      assert && assert( numberControlOptions.groupFocusHighlight === undefined, 'ISLCObjectControlPanel sets group focus highlight' );
      this.numberControl.groupFocusHighlight = false;

      // a11y - creates highlight that appears around this node when any ancestor (like the
      // NumberControl) has focus
      this.groupFocusHighlight = new GroupFocusHighlightFromNode( this, {
        useLocalBounds: true,
        dilationCoefficient: 3.7
      } );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCObjectControlPanel', ISLCObjectControlPanel );
} );