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
  var ISLCPullerImages = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCPullerImages' );
  var Util = require( 'DOT/Util' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var IMAGE_SCALE = 0.45;

  /**
   * @param {RangeWithValue} forceRange - range of forces, used for determining the visible pullImage
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ISLCPullerNode( forceRange, tandem, options ) {

    options = _.extend( {
      ropeLength: 50,
      shadowMinWidth: 32,
      shadowMaxWidth: 50,
      attractNegative: true,     // if true, add pusher images
      displayShadow: true,
      atomicScale: false
    }, options );

    Node.call( this );

    var pullImages = ISLCPullerImages.pullImages;
    var pushImages = ISLCPullerImages.pushImages;
    var zeroForceImage = ISLCPullerImages.zeroForceImage;

    // set atomic pullers if on the atomic screen
    if ( options.atomicScale ) {
      pullImages = ISLCPullerImages.atomicPullImages;
      pushImages = ISLCPullerImages.atomicPushImages;
      zeroForceImage = ISLCPullerImages.atomicZeroForceImage;
    }

    // @private
    this.pullerPusherImages = pullImages;

    // @private - if in coulomb's law sim, add pusher and zero force images in proper order
    this.zeroForceIndex = null;

    if ( options.attractNegative ) {
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

    // create each of the puller/pusher image nodes
    var images = [];
    var i;
    for ( i = 0; i < this.pullerPusherImages.length; i++ ) {
      var pullerTandem = pullerNodeGroupTandem.createNextTandem();
      var pullerImage = new Image( this.pullerPusherImages[ i ], { tandem: pullerTandem.createTandem( 'pullerImage' ) } );

      // puller images are much larger than pushers, so we need to scale it down
      pullerImage.scale( IMAGE_SCALE, IMAGE_SCALE );

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
      images[ i ].right += 0.1 * images[ i ].width;
    }

    //  shadow first so it is behind the pullers
    options.displayShadow && this.addChild( shadowNode );
    this.addChild( pullerGroupNode );

    // @public - set the visibility of the image corresponding to the current force value
    this.setPull = function( force, offsetX ) {

      if ( options.attractNegative ) {
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
