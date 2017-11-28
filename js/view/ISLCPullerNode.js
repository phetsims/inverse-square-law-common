// Copyright 2017, University of Colorado Boulder

/**
 * The pullers attached to the mass and charge objects. The node maintains a list of puller images that vary in 
 * perceived pull effort. They are made visible and invisible to correspond to a given force value.
 *
 * @author Michael Barlow
 * @author Jesse Greenberg
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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // images
  var pullImage0 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_0.png' );
  var pullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_1.png' );
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
  var pullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_2.png' );
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
  var pullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_3.png' );
  var pullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_30.png' );
  var pullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_4.png' );
  var pullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_5.png' );
  var pullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_6.png' );
  var pullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_7.png' );
  var pullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_8.png' );
  var pullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pull_figure_9.png' );

  var zeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/zero-pull.png' );

  var pushImage0 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_0.png' );
  var pushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_1.png' );
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
  var pushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_2.png' );
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
  var pushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_3.png' );
  var pushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_30.png' );
  var pushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_4.png' );
  var pushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_5.png' );
  var pushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_6.png' );
  var pushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_7.png' );
  var pushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_8.png' );
  var pushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/pusher_9.png' );

  // constants
  var PUSH_IMAGE_SCALE = 0.45;
  var PULL_IMAGE_SCALE = 0.1125;

  // for all images, the appended number corresponds to their 'level of effort', e.g. pullImage1 shows less pull than pullImage22
  // this is important for mapping force values to the index of the corresponding pull effort
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
  function ISLCPullerNode( forceRange, tandem, options ) {

    // REVIEW: This node doesn't pass options to Node 
    options = _.extend( { 
      ropeLength: 50,
      shadowMinWidth: 32,
      shadowMaxWidth: 50,
      attractNegative: true,     // if true, add pusher images
      displayShadow: true
    }, options );

    Node.call( this );

    // @private
    this.pullerPusherImages = pullImages;

    // @private - if in coulomb's law sim, add pusher and zero force images in proper order
    this.zeroForceIndex = null;

    if (options.attractNegative) {
      this.pullerPusherImages = pushImages.concat( zeroForceImage ).concat( pullImages );
      this.zeroForceIndex = 31;
    }

    // function that maps the visible image to the model force value
    var forceToImage = new LinearFunction( forceRange.min, forceRange.max, 0, this.pullerPusherImages.length - 1, true );

    // function that maps the size of the shadow to the force value
    var forceToShadowWidth = new LinearFunction( forceRange.min, forceRange.max, options.shadowMinWidth, options.shadowMaxWidth, true );

    var pullerGroupNode = new Node( {
      tandem: tandem.createTandem( 'pullerGroupNode' )
    } );
    var pullerNodeGroupTandem = tandem.createGroupTandem( 'node' );

    // the optional shadow node under the pullers - a circle scaled down vertically to look eliptical
    var shadowNode = new Circle( 10, {
      fill: '#777',
      scale: new Vector2( 1, 0.20 ),
      tandem: tandem.createTandem( 'shadowNode' )
    } );

    // create the puller/pusher image nodes
    var images = [];
    var i;
    for ( i = 0; i < this.pullerPusherImages.length; i++ ) {
      var pullerTandem = pullerNodeGroupTandem.createNextTandem();
      var pullerImage = new Image( this.pullerPusherImages[ i ], { tandem: pullerTandem.createTandem( 'pullerImage' ) } );

      // puller images are much larger than pushers, so we need to scale it down
      if ( _.includes( pushImages, pullerImage.image ) ) {
        pullerImage.scale( PUSH_IMAGE_SCALE,  PUSH_IMAGE_SCALE);
      }
      else {
        pullerImage.scale( PULL_IMAGE_SCALE, PULL_IMAGE_SCALE);
      }

      images.push( pullerImage );
    }

    pullerGroupNode.addChild( new Path( Shape.lineSegment( -options.ropeLength, 0, 0, 0 ), {
      stroke: '#666',
      lineWidth: 2,
      tandem: tandem.createTandem( 'ropeNode' )
    } ) );

    // set the layout for the images
    for ( i = 0; i < this.pullerPusherImages.length; i++ ) {
      pullerGroupNode.addChild( images[ i ] );
      images[ i ].bottom = 42;
      images[ i ].right = -options.ropeLength;
      images[ i ].setVisible( false );

      // the pullImages grow in width as they animate, but their hands stay in the same position, so make sure that
      // they are still grabbing the rope
      if ( _.includes( pullImages, images[ i ].image ) ) {
        images[ i ].right += 0.3 * images[ i ].width;
      }
    }

    //  shadow first so it is behind the pullers
    options.displayShadow && this.addChild( shadowNode );
    this.addChild( pullerGroupNode );

    // @public - set the visibility of the image corresponding to the current force value
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

      // scale the shadow and place it under the visible image
      shadowNode.radius = forceToShadowWidth( force ) / 2;
      shadowNode.right = images[ index ].right - offsetX - 4;
      shadowNode.centerY = images[ index ].bottom;
    };
  }

  inverseSquareLawCommon.register( 'ISLCPullerNode', ISLCPullerNode );

  return inherit( Node, ISLCPullerNode );
} );
