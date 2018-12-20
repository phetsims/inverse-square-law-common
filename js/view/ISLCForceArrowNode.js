// Copyright 2017-2018, University of Colorado Boulder

/**
 * Arrow node for sims that use inverse-square-law-common.  The arrow is scaled to represent the magnitude of the force,
 * and can change direction to represent repulsive and attractive forces.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RichText = require( 'SCENERY/nodes/RichText' );
  var ScientificNotationNode = require( 'SCENERY_PHET/ScientificNotationNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Util = require( 'DOT/Util' );

  // strings
  var forceOnObjectByOtherObjectPatternString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceOnObjectByOtherObjectPattern' );
  var forceOnObjectByOtherObjectWithUnitsPatternString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceOnObjectByOtherObjectWithUnitsPattern' );

  // constants
  var ARROW_LENGTH = 8; // empirically determined
  var TEXT_OFFSET = 10; // empirically determined to make sure text does not go out of bounds

  /**
   * @param {Range} arrowForceRange - the range in force magnitude
   * @param {Bounds2} layoutBounds
   * @param {Object} [options]
   * @constructor
   */
  function ISLCForceArrowNode( arrowForceRange, layoutBounds, options ) {

    options = _.extend( {
      defaultDirection: 'left',
      attractNegative: true, // if true, arrows will point towards each other if force is negative
      arrowNodeLineWidth: 0.25,

      // label options
      otherObjectLabel: '', // label for the other object exerting a force on this object
      label: '', // label for this object
      arrowLabelFont: new PhetFont( 16 ),
      arrowLabelFill: '#fff',
      arrowLabelStroke: null,
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout

      // arrow node arguments
      forceArrowHeight: 150,

      // arrow node options
      maxArrowWidth: 15, // max width of the arrow when when redrawn, in view coordinates - used in mapping function
      headHeight: 8,
      headWidth: 8,
      tailWidth: 3,
      arrowStroke: null,
      arrowFill: '#fff',
      tandem: Tandem.required
    }, options );

    // @private
    this.layoutBounds = layoutBounds;
    this.defaultDirection = options.defaultDirection;
    this.forceReadoutDecimalPlaces = options.forceReadoutDecimalPlaces;
    this.label = options.label;
    this.otherObjectLabel = options.otherObjectLabel;
    this.scientificNotationMode = false;
    this.attractNegative = options.attractNegative;

    // @private - maps the force value to the desired width of the arrow in view coordinates
    this.forceToArrowWidthFunction = new LinearFunction( arrowForceRange.min, arrowForceRange.max, 0, options.maxArrowWidth, false );

    // @public (read-only) - for layout, the label for the arrow
    this.arrowText = new RichText( '', {
      font: options.arrowLabelFont,
      fill: options.arrowLabelFill,
      stroke: options.labelStroke,
      lineWidth: options.arrowNodeLineWidth,
      maxWidth: 300, // empirically determined through testing with long strings
      y: -20,
      tandem: options.tandem.createTandem( 'arrowText' )
    } );

    var arrowOptions = _.pick( options, [ 'headHeight', 'headWidth', 'tailWidth' ] );
    arrowOptions.lineWidth = options.arrowNodeLineWidth;
    arrowOptions.stroke = options.arrowStroke;
    arrowOptions.fill = options.arrowFill;
    arrowOptions.tandem = options.tandem.createTandem( 'arrow' );

    // @private - tip and tail set in redrawArrow
    this.arrow = new ArrowNode( 0, -options.forceArrowHeight, 200, -options.forceArrowHeight, arrowOptions );

    Node.call( this, {} );
    this.addChild( this.arrowText );
    this.addChild( this.arrow );

    this.y = 0;
  }

  inverseSquareLawCommon.register( 'ISLCForceArrowNode', ISLCForceArrowNode );

  return inherit( Node, ISLCForceArrowNode, {

    /**
     * Draw the length of the arrow based on the value of the force.
     *
     * @public
     * @param {number} value
     */
    redrawArrow: function( value ) {
      var arrowLengthMultiplier;

      var valueSign = value >= 0 ? 1 : -1;

      // if the arrows are meant to attract
      if ( this.attractNegative ) {
        valueSign *= -1;
      }
      var absValue = Math.abs( value );

      // map force value to width in view
      arrowLengthMultiplier = this.forceToArrowWidthFunction( absValue );

      if ( this.defaultDirection === 'right' ) {
        arrowLengthMultiplier *= -1;
      }

      this.arrow.setTailAndTip( 0, 0, valueSign * arrowLengthMultiplier * ARROW_LENGTH, 0 );
    },

    /**
     * Set the arrow text position along the arrow, ensuring that the text does not go outside the layout bounds.
     *
     * @public
     * @param {Bounds2} parentToLocalBounds
     */
    setArrowTextPosition: function( parentToLocalBounds ) {
      var arrowTextCenter = this.arrowText.center.copy();
      arrowTextCenter.x = 0;
      var localToParentPoint = this.localToParentPoint( arrowTextCenter );
      if ( Math.floor( localToParentPoint.x - this.arrowText.width / 2 ) <= this.layoutBounds.left + TEXT_OFFSET ) {
        this.arrowText.left = parentToLocalBounds.left + TEXT_OFFSET;
      }
      else if ( Math.ceil( localToParentPoint.x + this.arrowText.width / 2 ) >= this.layoutBounds.right - TEXT_OFFSET ) {
        this.arrowText.right = parentToLocalBounds.right - TEXT_OFFSET;
      }
      else {
        this.arrowText.center = arrowTextCenter;
      }
    },

    /**
     * Update the force label string.
     *
     * @public
     * @param  {number} forceValue
     * @param  {boolean} forceValues
     */
    updateLabel: function( forceValue, forceValues ) {

      if ( forceValues ) {
        var forceStr = Util.toFixed( forceValue, this.scientificNotationMode ? 2 : this.forceReadoutDecimalPlaces );

        // group values together so that they are easy to read
        var pointLocation = forceStr.indexOf( '.' );
        if ( pointLocation !== -1 ) {

          // the first group includes the values to the left of the decimal, and first three decimals
          var formattedString = forceStr.substr( 0, pointLocation + 4 );

          // remaining groups of three, separated by spaces
          for ( var i = pointLocation + 4; i < forceStr.length; i += 3 ) {
            formattedString += ' ';
            formattedString += forceStr.substr( i, 3 );
          }

          if ( this.scientificNotationMode && forceValue !== 0 ) {
            var precision = 2;
            var notationObject = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces: precision } );
            formattedString = notationObject.mantissa;

            if ( notationObject.exponent !== '0' ) {
              formattedString += ' ' + MathSymbols.TIMES;
              formattedString += ' 10<sup>' + notationObject.exponent + '</sup>';
            }
          }

          this.arrowText.text = StringUtils.fillIn( forceOnObjectByOtherObjectWithUnitsPatternString, { thisObject: this.label, otherObject: this.otherObjectLabel, value: formattedString } );
        }
        else {
          throw new Error( 'ISLCForceArrowNode.updateLabel() requires a decimal value' );
        }
      }
      else {
        this.arrowText.text = StringUtils.fillIn( forceOnObjectByOtherObjectPatternString, { thisObject: this.label, otherObject: this.otherObjectLabel } );
      }
    }
  } );
} );