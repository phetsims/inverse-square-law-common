// Copyright 2019, University of Colorado Boulder

/**
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringProperty = require( 'AXON/StringProperty' );

  // constants       // empirically determined
  const LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings
  const LABEL_CENTER_X = 0;
  const LABEL_TOP = 4;

  class TextWithShadow extends Node {

    /**
     * @param {string} label
     * @param {Tandem} tandem - this Node is not instrumented, but its sub components (textProperty) are
     * @param {Object} [options]
     */
    constructor( label, tandem, options ) {

      options = _.extend( {
        labelFill: '#fff',
        labelFont: new PhetFont( 12 ),
        labelMaxWidth: LABEL_MAX_WIDTH,

        // options for the label 'shadow' that helps the label show up when the object is roughly the same color
        // as the label
        labelShadowFill: '#000',
        labelShadowOffsetX: 0.5,
        labelShadowOffsetY: 0.5,

        textPhetioDocumentation: PhetioObject.DEFAULT_OPTIONS.phetioDocumentation
      }, options );

      super( options );

      // add the label shadow, added first so that the 'shadow' appears under the label text
      const labelShadowText = new RichText( label, {
        font: options.labelFont,
        fill: options.labelShadowFill,
        pickable: false,
        maxWidth: options.labelMaxWidth,
        centerX: LABEL_CENTER_X + options.labelShadowOffsetX,
        top: LABEL_TOP + options.labelShadowOffsetY
      } );
      this.addChild( labelShadowText );

      // add the label
      const labelText = new RichText( label, {
        font: options.labelFont,
        fill: options.labelFill,
        pickable: false,
        maxWidth: options.labelMaxWidth,
        centerX: LABEL_CENTER_X,
        top: LABEL_TOP
      } );
      this.addChild( labelText );

      const textProperty = new StringProperty( label, {
        tandem: tandem.createTandem( 'textProperty' ),
        phetioDocumentation: options.textPhetioDocumentation
      } );

      textProperty.link( newText => {
        labelShadowText.text = newText;
        labelText.text = newText;
      } );
    }
  }

  return inverseSquareLawCommon.register( 'TextWithShadow', TextWithShadow );
} );
