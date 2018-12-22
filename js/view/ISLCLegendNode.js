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
  var Node = require( 'SCENERY/nodes/Node' );
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

    Node.call( this );
    this.center.subtractXY( 0, 10 );

    // @public (read-only) - layout for this type is often relative to this line
    this.legendArrowLine = new ArrowNode( 0, 100, width, 100, {
      fill: options.fill,
      stroke: null,
      headHeight: 4,
      headWidth: 5,
      tailWidth: 2,
      lineWidth: 1,
      doubleHead: true
    } );

    this.addChild( this.legendArrowLine );

    // create left and right end lines
    var endLinesBottom = this.legendArrowLine.bottom + 2.5;
    var endLinesTop = endLinesBottom - 10;
    var endLinesOptions = {
      stroke: options.fill,
      lineWidth: 1.25
    };

    var leftEndLine = new Line( this.legendArrowLine.left, endLinesBottom, this.legendArrowLine.left, endLinesTop, endLinesOptions );
    var rightEndLine = new Line( this.legendArrowLine.right, endLinesBottom, this.legendArrowLine.right, endLinesTop, endLinesOptions );

    this.legendArrowLine.addChild( leftEndLine );
    this.legendArrowLine.addChild( rightEndLine );

    var legendLabel = new Text( labelString, {
      fill: options.fill,
      fontSize: 14,
      maxWidth: 65
    } );

    this.addChild( legendLabel );
    this.mutate( options );

    // positioning
    legendLabel.centerX = this.localBounds.centerX;
    legendLabel.bottom = this.localBounds.maxY - 18;

    this.legendArrowLine.centerX = this.localBounds.centerX;
    this.legendArrowLine.bottom = this.localBounds.maxY;
  }

  inverseSquareLawCommon.register( 'ISLCLegendNode', ISLCLegendNode );

  return inherit( Node, ISLCLegendNode );
} );