// Copyright 2018, University of Colorado Boulder

/**
 * Logic for exporting all necessary images for the ISLC sims.
 *
 * @author  Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  // standard images
  var pullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_1.png' );
  var pullImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_10.png' );
  var pullImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_11.png' );
  var pullImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_12.png' );
  var pullImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_13.png' );
  var pullImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_14.png' );
  var pullImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_15.png' );
  var pullImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_16.png' );
  var pullImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_17.png' );
  var pullImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_18.png' );
  var pullImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_19.png' );
  var pullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_2.png' );
  var pullImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_20.png' );
  var pullImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_21.png' );
  var pullImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_22.png' );
  var pullImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_23.png' );
  var pullImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_24.png' );
  var pullImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_25.png' );
  var pullImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_26.png' );
  var pullImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_27.png' );
  var pullImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_28.png' );
  var pullImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_29.png' );
  var pullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_3.png' );
  var pullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_30.png' );
  var pullImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_31.png' );
  var pullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_4.png' );
  var pullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_5.png' );
  var pullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_6.png' );
  var pullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_7.png' );
  var pullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_8.png' );
  var pullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_9.png' );

  var zeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_0.png' );

  var pushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_1.png' );
  var pushImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_10.png' );
  var pushImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_11.png' );
  var pushImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_12.png' );
  var pushImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_13.png' );
  var pushImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_14.png' );
  var pushImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_15.png' );
  var pushImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_16.png' );
  var pushImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_17.png' );
  var pushImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_18.png' );
  var pushImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_19.png' );
  var pushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_2.png' );
  var pushImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_20.png' );
  var pushImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_21.png' );
  var pushImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_22.png' );
  var pushImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_23.png' );
  var pushImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_24.png' );
  var pushImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_25.png' );
  var pushImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_26.png' );
  var pushImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_27.png' );
  var pushImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_28.png' );
  var pushImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_29.png' );
  var pushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_3.png' );
  var pushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_30.png' );
  var pushImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_31.png' );
  var pushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_4.png' );
  var pushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_5.png' );
  var pushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_6.png' );
  var pushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_7.png' );
  var pushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_8.png' );
  var pushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_9.png' );

  // atomic images
  var atomicPullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_1.png' );
  var atomicPullImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_10.png' );
  var atomicPullImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_11.png' );
  var atomicPullImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_12.png' );
  var atomicPullImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_13.png' );
  var atomicPullImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_14.png' );
  var atomicPullImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_15.png' );
  var atomicPullImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_16.png' );
  var atomicPullImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_17.png' );
  var atomicPullImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_18.png' );
  var atomicPullImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_19.png' );
  var atomicPullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_2.png' );
  var atomicPullImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_20.png' );
  var atomicPullImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_21.png' );
  var atomicPullImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_22.png' );
  var atomicPullImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_23.png' );
  var atomicPullImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_24.png' );
  var atomicPullImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_25.png' );
  var atomicPullImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_26.png' );
  var atomicPullImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_27.png' );
  var atomicPullImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_28.png' );
  var atomicPullImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_29.png' );
  var atomicPullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_3.png' );
  var atomicPullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_30.png' );
  var atomicPullImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_31.png' );
  var atomicPullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_4.png' );
  var atomicPullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_5.png' );
  var atomicPullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_6.png' );
  var atomicPullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_7.png' );
  var atomicPullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_8.png' );
  var atomicPullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_9.png' );

  var atomicZeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_atomic_0.png' );

  var atomicPushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_1.png' );
  var atomicPushImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_10.png' );
  var atomicPushImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_11.png' );
  var atomicPushImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_12.png' );
  var atomicPushImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_13.png' );
  var atomicPushImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_14.png' );
  var atomicPushImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_15.png' );
  var atomicPushImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_16.png' );
  var atomicPushImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_17.png' );
  var atomicPushImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_18.png' );
  var atomicPushImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_19.png' );
  var atomicPushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_2.png' );
  var atomicPushImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_20.png' );
  var atomicPushImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_21.png' );
  var atomicPushImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_22.png' );
  var atomicPushImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_23.png' );
  var atomicPushImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_24.png' );
  var atomicPushImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_25.png' );
  var atomicPushImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_26.png' );
  var atomicPushImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_27.png' );
  var atomicPushImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_28.png' );
  var atomicPushImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_29.png' );
  var atomicPushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_3.png' );
  var atomicPushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_30.png' );
  var atomicPushImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_31.png' );
  var atomicPushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_4.png' );
  var atomicPushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_5.png' );
  var atomicPushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_6.png' );
  var atomicPushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_7.png' );
  var atomicPushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_8.png' );
  var atomicPushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_9.png' );

  // for all images, the appended number corresponds to their 'level of effort', e.g. pullImage1 shows less pull than pullImage22
  // this is important for mapping force values to the index of the corresponding pull effort
  var pullImages = [ pullImage1, pullImage2, pullImage3, pullImage4, pullImage5, pullImage6, pullImage7,
    pullImage8, pullImage9, pullImage10, pullImage11, pullImage12, pullImage13, pullImage14, pullImage15, pullImage16,
    pullImage17, pullImage18, pullImage19, pullImage20, pullImage21, pullImage22, pullImage23, pullImage24, pullImage25,
    pullImage26, pullImage27, pullImage28, pullImage29, pullImage30, pullImage31 ];

  var pushImages = [ pushImage1, pushImage2, pushImage3, pushImage4, pushImage5, pushImage6, pushImage7,
    pushImage8, pushImage9, pushImage10, pushImage11, pushImage12, pushImage13, pushImage14, pushImage15, pushImage16,
    pushImage17, pushImage18, pushImage19, pushImage20, pushImage21, pushImage22, pushImage23, pushImage24, pushImage25,
    pushImage26, pushImage27, pushImage28, pushImage29, pushImage30, pushImage31 ];

  // ensure push images are ordered from large push to small push
  pushImages.reverse();

  var atomicPullImages = [ atomicPullImage1, atomicPullImage2, atomicPullImage3, atomicPullImage4, atomicPullImage5,
    atomicPullImage6, atomicPullImage7, atomicPullImage8, atomicPullImage9, atomicPullImage10, atomicPullImage11,
    atomicPullImage12, atomicPullImage13, atomicPullImage14, atomicPullImage15, atomicPullImage16, atomicPullImage17,
    atomicPullImage18, atomicPullImage19, atomicPullImage20, atomicPullImage21, atomicPullImage22, atomicPullImage23,
    atomicPullImage24, atomicPullImage25, atomicPullImage26, atomicPullImage27, atomicPullImage28, atomicPullImage29,
    atomicPullImage30, atomicPullImage31 ];

  var atomicPushImages = [ atomicPushImage1, atomicPushImage2, atomicPushImage3, atomicPushImage4, atomicPushImage5,
    atomicPushImage6, atomicPushImage7, atomicPushImage8, atomicPushImage9, atomicPushImage10, atomicPushImage11,
    atomicPushImage12, atomicPushImage13, atomicPushImage14, atomicPushImage15, atomicPushImage16, atomicPushImage17,
    atomicPushImage18, atomicPushImage19, atomicPushImage20, atomicPushImage21, atomicPushImage22, atomicPushImage23,
    atomicPushImage24, atomicPushImage25, atomicPushImage26, atomicPushImage27, atomicPushImage28, atomicPushImage29,
    atomicPushImage30, atomicPushImage31 ];

  atomicPushImages.reverse();

  var ISLCPullerImages = {
    pullImages: pullImages,
    pushImages: pushImages,
    atomicPullImages: atomicPullImages,
    atomicPushImages: atomicPushImages,
    zeroForceImage: zeroForceImage,
    atomicZeroForceImage: atomicZeroForceImage
  };

  inverseSquareLawCommon.register( 'ISLCPullerImages', ISLCPullerImages );

  return ISLCPullerImages;
} );