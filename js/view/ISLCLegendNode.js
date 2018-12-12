// Copyright 2017-2018, University of Colorado Boulder

/**
 * A legend graphic consisting of a double-ended arrow, two endpoint lines, and a label string. Intended to visually
 * indicate a distance scale.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
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
   * @param {number} width (in view coordinates)
   * @param {string} labelString
   * @param {Object} [options]
   * @constructor
   */
  function ISLCLegendNode( width, labelString, options ) {

    options = _.extend( {
      fill: 'rgb(0,255,0)',
      fontSize: 14,
      maxWidth: 85
    }, options );

    Text.call( this, labelString, options );
    this.center.subtractXY( 0, 10 );

    var legendArrowLine = new ArrowNode( 0, 100, width, 100, {
      fill: options.fill,
      bottom: this.localBounds.maxY + 10,
      centerX: this.localBounds.centerX,
      stroke: null,
      headHeight: 4,
      headWidth: 5,
      tailWidth: 2,
      lineWidth: 1,
      doubleHead: true
    } );

    this.addChild( legendArrowLine );

    // create left and right end lines
    var endLinesBottom = legendArrowLine.bottom + 2.5;
    var endLinesTop = endLinesBottom - 10;
    var endLinesOptions = {
      stroke: options.fill,
      lineWidth: 1.25
    };

    var leftEndLine = new Line( legendArrowLine.left, endLinesBottom, legendArrowLine.left, endLinesTop, endLinesOptions );
    var rightEndLine = new Line( legendArrowLine.right, endLinesBottom, legendArrowLine.right, endLinesTop, endLinesOptions );

    this.addChild( leftEndLine );
    this.addChild( rightEndLine );
  }

  inverseSquareLawCommon.register( 'ISLCLegendNode', ISLCLegendNode );

  return inherit( Text, ISLCLegendNode );
} );