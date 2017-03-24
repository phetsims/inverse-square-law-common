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
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Util = require( 'DOT/Util' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var LinearFunction = require('DOT/LinearFunction');
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var forceDescriptionPatternTargetSourceString = require( 'string!INVERSE_SQUARE_LAW_COMMON/force-description-pattern-target_source' );
  var forceDescriptionPatternTargetSourceValueString = require( 'string!INVERSE_SQUARE_LAW_COMMON/force-description-pattern-target_source_value' );

  // constants
  // TODO: these will probably have to be changed for different sims?
  var ARROW_LENGTH = 8; // empirically determined
  var TEXT_OFFSET = 5; // empirically determined to make sure text does not go out of bounds

  function ISLForceArrowNode( arrowTitle, arrowForceRange, layoutBounds, tandem, options ) {

    options = _.extend( {
      maxArrowWidth: 60, // max width of the arrow when when redrawn, in view coordinates
      defaultDirection: 'left',
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout
      label: '', // label for this object
      otherObjectLabel: '', // label for the other object exerting a force on this object

      // arrow node options
      headHeight: 8,
      headWidth: 8,
      tailWidth: 3,
      stroke: null,
      tandem: tandem.createTandem( 'arrowNode' )
    }, options );

    // @private
    this.arrowForceRange = arrowForceRange;
    this.layoutBounds = layoutBounds;
    this.defaultDirection = options.defaultDirection;
    this.forceReadoutDecimalPlaces = options.forceReadoutDecimalPlaces;
    this.label = options.label;
    this.otherObjectLabel = options.otherObjectLabel;

    // @private - maps the force value to the desired width of the arrow in view coordinates 
    this.forceToArrowWidthFunction = new LinearFunction( arrowForceRange.min, arrowForceRange.max, 1, options.maxArrowWidth, false );

    // @private - when the force is below the typical arrow range, width of the arrow is mapped from 0 to 1
    this.forceToArrowWidthMinFunction = new LinearFunction( 0, arrowForceRange.min, 0, 1, false ); 

    // @public (read-only) - for layout, the label for the arrow
    this.arrowText = new Text( arrowTitle, {
      font: new PhetFont( 16 ),
      fill: '#000',
      maxWidth: 300, // empirically determined through testing with long strings
      tandem: tandem.createTandem( 'arrowText' )
    } );

    ArrowNode.call( this, 0, 0, 200, 0, options );
    this.addChild( this.arrowText );
  }

  inverseSquareLawCommon.register( 'ISLForceArrowNode', ISLForceArrowNode );

  return inherit( ArrowNode, ISLForceArrowNode, {

    /**
     * Draw the length of the arrow based on the value of the force.
     * @public
     */
    redrawArrow: function( value ) {
      var arrowLengthMultiplier;

      var absValue = Math.abs( value );
      if ( value < this.arrowForceRange.min ) {
        arrowLengthMultiplier = this.forceToArrowWidthMinFunction( absValue );
      }
      else {
        arrowLengthMultiplier = this.forceToArrowWidthFunction( absValue );
      }
      if ( this.defaultDirection === 'right' ) {
        arrowLengthMultiplier *= -1;
      }

      this.setTailAndTip( 0, 0, arrowLengthMultiplier * ARROW_LENGTH, 0 );
    },

    /**
     * Set the arrow text position along the arrow, ensuring that the text does not go outside the layout
     * bounds.
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

          this.arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceValueString, this.label, this.otherObjectLabel, formattedString );
        }
        else {
          throw new Error( 'ISLForceArrowNode.updateLabel() requires a decimal value' );
        }
      }
      else {
        this.arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceString, this.label, this.otherObjectLabel );
      }
    } 
  } );
} );
