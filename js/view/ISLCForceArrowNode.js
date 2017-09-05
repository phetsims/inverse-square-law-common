// Copyright 2017, University of Colorado Boulder

/**
 * Arrow node for sims that use inverse-square-law-common.  The arrow is scaled to represent the magnitude of the force,
 * and can change direction to represent repulsive and attractive forces.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var RichText = require( 'SCENERY/nodes/RichText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Util = require( 'DOT/Util' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var LinearFunction = require('DOT/LinearFunction');
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ScientificNotationNode = require( 'SCENERY_PHET/ScientificNotationNode' );

  // strings
  var forceDescriptionPatternTargetSourceString = require( 'string!INVERSE_SQUARE_LAW_COMMON/force-description-pattern-target_source' );
  var forceDescriptionPatternTargetSourceValueString = require( 'string!INVERSE_SQUARE_LAW_COMMON/force-description-pattern-target_source_value' );

  // constants
  // TODO: these will probably have to be changed for different sims?
  var ARROW_LENGTH = 8; // empirically determined
  var TEXT_OFFSET = 5; // empirically determined to make sure text does not go out of bounds

  // TODO: JSDOC
  function ISLCForceArrowNode( arrowForceRange, layoutBounds, tandem, options ) {

    options = _.extend( {
      defaultDirection: 'left',
      defaultScientificNotationMode: false, // whether to display number in scientific notation
      title: '', // object title
      attractNegative: true, // if true, arrows will point towards each other if forces is negative

      // label options
      otherObjectLabel: '', // label for the other object exerting a force on this object
      label: '', // label for this object
      labelFont: new PhetFont( 16 ),
      labelFill: '#fff',
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout

      // arrow node options
      maxArrowWidth: 15, // max width of the arrow when when redrawn, in view coordinates
      forceArrowHeight: 150,
      headHeight: 8,
      headWidth: 8,
      tailWidth: 3,
      stroke: null,
      fill: 'white',
      tandem: tandem.createTandem( 'arrowNode' )
    }, options );

    // @private
    this.forceArrowHeight = options.forceArrowHeight;
    this.arrowForceRange = arrowForceRange;
    this.layoutBounds = layoutBounds;
    this.defaultDirection = options.defaultDirection;
    this.forceReadoutDecimalPlaces = options.forceReadoutDecimalPlaces;
    this.label = options.label;
    this.otherObjectLabel = options.otherObjectLabel;
    this.scientificNotationMode = options.defaultScientificNotationMode;
    this.attractNegative = options.attractNegative;

    var minArrowLength = arrowForceRange.min === 0 ? 0 : 1;
    // @private - maps the force value to the desired width of the arrow in view coordinates
    this.forceToArrowWidthFunction = new LinearFunction( arrowForceRange.min, arrowForceRange.max, minArrowLength, options.maxArrowWidth, false );

    // @private - when the force is below the typical arrow range, width of the arrow is mapped from 0 to 1
    // this.forceToArrowWidthMinFunction = new LinearFunction( 0, arrowForceRange.min, 0, 1, false );

    // @public (read-only) - for layout, the label for the arrow
    this.arrowText = new RichText( options.title, {
      font: options.labelFont,
      fill: options.labelFill,
      maxWidth: 300, // empirically determined through testing with long strings
      y: -20,
      tandem: tandem.createTandem( 'arrowText' )
    } );

    ArrowNode.call( this, 0, -options.forceArrowHeight, 200, -options.forceArrowHeight, options );
    this.addChild( this.arrowText );
    this.y = 0;
  }

  inverseSquareLawCommon.register( 'ISLCForceArrowNode', ISLCForceArrowNode );

  return inherit( ArrowNode, ISLCForceArrowNode, {

    /**
     * Draw the length of the arrow based on the value of the force.
     * @public
     */
    redrawArrow: function( value ) {
      var arrowLengthMultiplier;

      var valueSign = value >= 0 ? 1 : -1;

      // if the arrows are meant to attract 
      if ( this.attractNegative ) {
        valueSign *= -1;
      }
      var absValue = Math.abs( value );
      // if ( absValue < this.arrowForceRange.min ) {
      //   arrowLengthMultiplier = this.forceToArrowWidthMinFunction( absValue );
      // }
      // else {
        arrowLengthMultiplier = this.forceToArrowWidthFunction( absValue );
      // }

      if ( this.defaultDirection === 'right' ) {
        arrowLengthMultiplier *= -1;
      }

      this.setTailAndTip( 0, 0, valueSign * arrowLengthMultiplier * ARROW_LENGTH, 0 );
    },

    /**
     * Set the arrow text position along the arrow, ensuring that the text does not go outside the layout
     * bounds.
     *
     * @public
     */
    setArrowTextPosition: function( localToParentPoint, parentToLocalBounds ){
      this.arrowText.centerX = 0;
      if ( Math.floor( localToParentPoint.x - this.arrowText.width / 2 ) <= this.layoutBounds.left + TEXT_OFFSET ) {
        this.arrowText.left = parentToLocalBounds.left + TEXT_OFFSET;
      }

      if ( Math.ceil( localToParentPoint.x + this.arrowText.width / 2 ) >= this.layoutBounds.right - TEXT_OFFSET ) {
        this.arrowText.right = parentToLocalBounds.right - TEXT_OFFSET;
      }
    },

    /**
     * Update the force label string.
     * @public
     */
    updateLabel: function( forceValue, showValues ) {

      if ( showValues ) {
        var forceStr = Util.toFixed( forceValue, this.forceReadoutDecimalPlaces );

        // group values together so that they are easy to read
        var pointLocation = forceStr.indexOf( '.' );
        if ( pointLocation !== -1 ) {

          // the first group includes the values to the left of the decimal, and first three decimals
          var formattedString = forceStr.substr( 0, pointLocation + 4 );

          // remaining groups of three, separated by spaces
          for( var i = pointLocation + 4; i < forceStr.length; i+=3 ) {
            formattedString += ' ';
            formattedString += forceStr.substr( i, 3 );
          }

          if (this.scientificNotationMode) {
            var notationObject = ScientificNotationNode.toScientificNotation( forceValue, { mantissaDecimalPlaces: 2 } );

            formattedString = notationObject.mantissa;

            if ( Math.abs( forceValue ) >= 10 ) {
              formattedString += ' X 10<sup>' + notationObject.exponent + '</sup>';
            }
          }

          this.arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceValueString, this.label, this.otherObjectLabel, formattedString );
        }
        else {
          throw new Error( 'ISLCForceArrowNode.updateLabel() requires a decimal value' );
        }
      }
      else {
        this.arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceString, this.label, this.otherObjectLabel );
      }
    }
  } );
} );
