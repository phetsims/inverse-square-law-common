// Copyright 2013-2017, University of Colorado Boulder

/**
 * A legend graphic consisting of a double-ended arrow, two endpoint lines, and a label string.
 *
 * @author  Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * A graphic to visually indicate a distance scale.
   * @param {ISLModel} model              
   * @param {ModelViewTransform2} modelViewTransform 
   * @param {int/float} width (in view coordinates)
   * @param {string} labelString
   */
  function ISLCLegendNode( width, labelString, options ) {

    options = _.extend( {
      fill: 'rgb(0,255,0)',
      stroke: null,
      headHeight: 2,
      headWidth: 3,
      tailWidth: 0.75,
      lineWidth: 0.75,
      doubleHead: true
    }, options );

    ArrowNode.call( this, 0, 100, width, 100, options );

    // create left and right end lines
    var endLinesBottom = this.localBounds.maxY + 1.5;
    var endLinesTop = endLinesBottom - 6;
    var endLinesOptions = {
      stroke: options.fill,
      lineWidth: 0.75
    };

    var leftEndLine  = new Line(         0, endLinesBottom,         0, endLinesTop, endLinesOptions );
    var rightEndLine = new Line( this.tipX, endLinesBottom, this.tipX, endLinesTop, endLinesOptions );

    this.addChild( leftEndLine );
    this.addChild( rightEndLine );

    var legendLabel = new Text( labelString, {
      fill: options.fill,
      fontSize: 8,
      bottom: this.localBounds.top - 1,
      centerX: this.localBounds.centerX
    } );

    this.addChild( legendLabel );
  }

  inverseSquareLawCommon.register( 'ISLCLegendNode', ISLCLegendNode );

  return inherit( ArrowNode, ISLCLegendNode);
} );