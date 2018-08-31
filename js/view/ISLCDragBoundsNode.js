// Copyright 2018, University of Colorado Boulder

// REVIEW: Update header. Summary of this file's purpose and @authors.

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );

  // REVIEW: JSDoc
  function ISLCDragBoundsNode( model, layoutBounds, modelViewTransform, options ) {

    options = _.extend( {
      lineWidth: 2,
      object1Stroke: 'blue',
      object2Stroke: 'red'
    }, options );

    Node.call( this, options );

    // Show the min/max locations for dragging the objects
    var verticalMin = layoutBounds.minY;
    var verticalMax = layoutBounds.height;
    var object1LineOptions = { stroke: options.object1Stroke, lineWidth: options.lineWidth };
    var object2LineOptions = { stroke: options.object1Stroke, lineWidth: options.lineWidth };

    // REVIEW: Add doc describing the purpose of these lines
    var object1MinLine = new Line( 0, verticalMin, 0, verticalMax, object1LineOptions );
    var object1MaxLine = new Line( 0, verticalMin, 0, verticalMax, object1LineOptions );
    var object2MinLine = new Line( 0, verticalMin, 0, verticalMax, object2LineOptions );
    var object2MaxLine = new Line( 0, verticalMin, 0, verticalMax, object2LineOptions );

    // REVIEW: Consider refactoring to this.children=[ object1MinLine, object1MaxLine, object2MinLine, object2MaxLine ]
    this.addChild( object1MinLine );
    this.addChild( object2MinLine );
    this.addChild( object1MaxLine );
    this.addChild( object2MaxLine );

    var object1MinX;
    var object1MaxX;
    var object2MinX;
    var object2MaxX;
    var objectProperties = [
      model.object1.positionProperty,
      model.object1.radiusProperty,
      model.object2.positionProperty,
      model.object2.radiusProperty
    ];

    // REVIEW: Unused parameters
    Property.multilink( objectProperties, function( position1, radius1, position2, radius2 ) {
      object1MinX = modelViewTransform.modelToViewX( model.getObjectMinPosition( model.object1 ) );
      object1MinLine.x1 = object1MinX;
      object1MinLine.x2 = object1MinX;

      object1MaxX = modelViewTransform.modelToViewX( model.getObjectMaxPosition( model.object1 ) );
      object1MaxLine.x1 = object1MaxX;
      object1MaxLine.x2 = object1MaxX;

      object2MinX = modelViewTransform.modelToViewX( model.getObjectMinPosition( model.object2 ) );
      object2MinLine.x1 = object2MinX;
      object2MinLine.x2 = object2MinX;

      object2MaxX = modelViewTransform.modelToViewX( model.getObjectMaxPosition( model.object2 ) );
      object2MaxLine.x1 = object2MaxX;
      object2MaxLine.x2 = object2MaxX;
    } );
  }

  inverseSquareLawCommon.register( 'ISLCDragBoundsNode', ISLCDragBoundsNode );

  return inherit( Node, ISLCDragBoundsNode );
} );