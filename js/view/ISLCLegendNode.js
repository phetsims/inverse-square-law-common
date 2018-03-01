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
      stroke: null,
      headHeight: 4,
      headWidth: 5,
      tailWidth: 2,
      lineWidth: 1,
      doubleHead: true
    }, options );

    ArrowNode.call( this, 0, 100, width, 100, options );

    // create left and right end lines
    var endLinesBottom = this.localBounds.maxY + 2.5;
    var endLinesTop = endLinesBottom - 10;
    var endLinesOptions = {
      stroke: options.fill,
      lineWidth: 1.25
    };

    var leftEndLine = new Line( 0, endLinesBottom, 0, endLinesTop, endLinesOptions );
    var rightEndLine = new Line( this.tipX, endLinesBottom, this.tipX, endLinesTop, endLinesOptions );

    this.addChild( leftEndLine );
    this.addChild( rightEndLine );

    var legendLabel = new Text( labelString, {
      fill: options.fill,
      fontSize: 14,
      bottom: this.localBounds.top - 1,
      centerX: this.localBounds.centerX,
      maxWidth: 150
    } );

    this.addChild( legendLabel );
  }

  inverseSquareLawCommon.register( 'ISLCLegendNode', ISLCLegendNode );

  return inherit( ArrowNode, ISLCLegendNode );
} );