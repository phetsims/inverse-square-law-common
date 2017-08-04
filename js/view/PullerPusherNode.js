// Copyright 2013-2015, University of Colorado Boulder

/**
 * puller view for massObject
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  // var Bounds2 = require( 'DOT/Bounds2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Util = require( 'DOT/Util' );
  var LinearFunction = require('DOT/LinearFunction');
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Vector2 = require( 'DOT/Vector2' );

  // images
  var pullImage0 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_0.png' );
  var pullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_1.png' );
  var pullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_2.png' );
  var pullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_3.png' );
  var pullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_4.png' );
  var pullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_5.png' );
  var pullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_6.png' );
  var pullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_7.png' );
  var pullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_8.png' );
  var pullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_9.png' );
  var pullImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_10.png' );
  var pullImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_11.png' );
  var pullImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_12.png' );
  var pullImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_13.png' );
  var pullImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_14.png' );
  var pullImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_15.png' );
  var pullImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_16.png' );
  var pullImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_17.png' );
  var pullImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_18.png' );
  var pullImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_19.png' );
  var pullImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_20.png' );
  var pullImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_21.png' );
  var pullImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_22.png' );
  var pullImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_23.png' );
  var pullImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_24.png' );
  var pullImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_25.png' );
  var pullImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_26.png' );
  var pullImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_27.png' );
  var pullImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_28.png' );
  var pullImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_29.png' );
  var pullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_30.png' );

  var zeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/zero-pull.png' );

  var pushImage0 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_0.png' );
  var pushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_1.png' );
  var pushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_2.png' );
  var pushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_3.png' );
  var pushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_4.png' );
  var pushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_5.png' );
  var pushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_6.png' );
  var pushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_7.png' );
  var pushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_8.png' );
  var pushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_9.png' );
  var pushImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_10.png' );
  var pushImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_11.png' );
  var pushImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_12.png' );
  var pushImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_13.png' );
  var pushImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_14.png' );
  var pushImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_15.png' );
  var pushImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_16.png' );
  var pushImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_17.png' );
  var pushImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_18.png' );
  var pushImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_19.png' );
  var pushImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_20.png' );
  var pushImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_21.png' );
  var pushImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_22.png' );
  var pushImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_23.png' );
  var pushImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_24.png' );
  var pushImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_25.png' );
  var pushImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_26.png' );
  var pushImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_27.png' );
  var pushImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_28.png' );
  var pushImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_29.png' );
  var pushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_30.png' );

  var pullImages = [ pullImage0, pullImage1, pullImage2, pullImage3, pullImage4, pullImage5, pullImage6, pullImage7,
    pullImage8, pullImage9, pullImage10, pullImage11, pullImage12, pullImage13, pullImage14, pullImage15, pullImage16,
    pullImage17, pullImage18, pullImage19, pullImage20, pullImage21, pullImage22, pullImage23, pullImage24, pullImage25,
    pullImage26, pullImage27, pullImage28, pullImage29, pullImage30 ];

  var pushImages = [ pushImage0, pushImage1, pushImage2, pushImage3, pushImage4, pushImage5, pushImage6, pushImage7,
    pushImage8, pushImage9, pushImage10, pushImage11, pushImage12, pushImage13, pushImage14, pushImage15, pushImage16,
    pushImage17, pushImage18, pushImage19, pushImage20, pushImage21, pushImage22, pushImage23, pushImage24, pushImage25,
    pushImage26, pushImage27, pushImage28, pushImage29, pushImage30 ];

  // ensure push images are ordered from large push to small push
  pushImages.reverse();

  /**
   * @param {RangeWithValue} forceRange - range of forces, used for determining the visible pullImage
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function PullerPusherNode( forceRange, tandem, options ) {

    // REVIEW: This node doesn't pass options to Node, cannot 
    options = _.extend( { 
      ropeLength: 50,
      attractNegative: true,     // if true, add pusher images
      displayShadow: true,
      tandem: tandem,
    }, options );

    Node.call( this );

    // create property to hold puller/pusher images
    // prevents extended chaining of 
    this.pullerPusherImages = pullImages;

    this.zeroForceIndex = null;

    // if in coulomb's law sim, add pusher and zero force images in proper order
    if (options.attractNegative) {
      this.pullerPusherImages = pushImages.concat( zeroForceImage ).concat( pullImages );

      this.zeroForceIndex = 31;
    }

    // function that maps the visible image to the model force value
    var forceToImage = new LinearFunction( forceRange.min, forceRange.max, 0, this.pullerPusherImages.length - 1, true );

    var pullerGroupNode = new Node( {
      x: -options.ropeLength,
      tandem: tandem.createTandem( 'pullerGroupNode' )
    } );
    var images = [];
    var i;
    var pullerNodeGroupTandem = tandem.createGroupTandem( 'node' );
    for ( i = 0; i < this.pullerPusherImages.length; i++ ) {
      var pullerTandem = pullerNodeGroupTandem.createNextTandem();
      var image = new Image( this.pullerPusherImages[ i ], { tandem: pullerTandem.createTandem( 'image' ) } );

      // puller images are much larger than pushers, thus
      if ( _.includes( pushImages, image.image ) ) {
        image.scale(0.45, 0.45);
      } else {
        image.scale(0.1125, 0.1125);
      }

      var pullerImageChildren = [ 
        new Path( Shape.circle( 0, 0, 10 ), {
          fill: '#777',
          scale: new Vector2( image.width / 25, 0.25 ),
          x: image.width / 1.8,
          y: image.height,
          tandem: pullerTandem.createTandem( 'shadowNode' )
        } ),
        image 
      ];

      if ( !options.displayShadow ) {
        pullerImageChildren[ 0 ].setVisible( false ); 
      }

      images.push( new Node( {
        children: pullerImageChildren,
        tandem: pullerTandem
      } ) );
    }

    pullerGroupNode.addChild( new Path( Shape.lineSegment( -options.ropeLength, 0, 0, 0 ), {
      stroke: '#666',
      lineWidth: 2,
      tandem: tandem.createTandem( 'ropeNode' )
    } ) );
    for ( i = 0; i < this.pullerPusherImages.length; i++ ) {
      pullerGroupNode.addChild( images[ i ] );
      images[ i ].bottom = 44;
      images[ i ].right = -options.ropeLength;
      images[ i ].setVisible( false );
      if ( _.includes( pullImages, images[ i ].children[ 1 ].image ) ) {
        images[ i ].right += i / 5;
      }
    }

    this.addChild( pullerGroupNode );

    // function select image
    // TODO: move this to inherit block and document
    this.setPull = function( force, offsetX ) {

      if (options.attractNegative) {
        force *= -1;
      }

      // from the force value, get an index for the visible image
      var index = Util.roundSymmetric( forceToImage( force ) );

      if ( force !== 0 && index === this.zeroForceIndex ) {
        index += ( force > 0 ) ? 1 : -1;
      }
      
      for ( var i = 0; i < this.pullerPusherImages.length; i++ ) {
        images[ i ].setVisible( i === index );
      }

      pullerGroupNode.x = -offsetX;
    };
  }

  inverseSquareLawCommon.register( 'PullerPusherNode', PullerPusherNode );

  return inherit( Node, PullerPusherNode, {}, {

    // statics
    PULL_IMAGES_COUNT: pullImages.length
  } );
} );
