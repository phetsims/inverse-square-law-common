// Copyright 2018-2019, University of Colorado Boulder

/**
 * Logic for exporting all necessary images for the ISLC sims.
 *
 * @author  Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  // standard images
  const pullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_1.png' );
  const pullImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_10.png' );
  const pullImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_11.png' );
  const pullImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_12.png' );
  const pullImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_13.png' );
  const pullImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_14.png' );
  const pullImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_15.png' );
  const pullImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_16.png' );
  const pullImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_17.png' );
  const pullImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_18.png' );
  const pullImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_19.png' );
  const pullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_2.png' );
  const pullImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_20.png' );
  const pullImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_21.png' );
  const pullImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_22.png' );
  const pullImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_23.png' );
  const pullImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_24.png' );
  const pullImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_25.png' );
  const pullImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_26.png' );
  const pullImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_27.png' );
  const pullImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_28.png' );
  const pullImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_29.png' );
  const pullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_3.png' );
  const pullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_30.png' );
  const pullImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_31.png' );
  const pullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_4.png' );
  const pullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_5.png' );
  const pullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_6.png' );
  const pullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_7.png' );
  const pullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_8.png' );
  const pullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_9.png' );

  const zeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_0.png' );

  const pushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_1.png' );
  const pushImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_10.png' );
  const pushImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_11.png' );
  const pushImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_12.png' );
  const pushImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_13.png' );
  const pushImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_14.png' );
  const pushImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_15.png' );
  const pushImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_16.png' );
  const pushImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_17.png' );
  const pushImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_18.png' );
  const pushImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_19.png' );
  const pushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_2.png' );
  const pushImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_20.png' );
  const pushImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_21.png' );
  const pushImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_22.png' );
  const pushImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_23.png' );
  const pushImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_24.png' );
  const pushImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_25.png' );
  const pushImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_26.png' );
  const pushImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_27.png' );
  const pushImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_28.png' );
  const pushImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_29.png' );
  const pushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_3.png' );
  const pushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_30.png' );
  const pushImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_31.png' );
  const pushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_4.png' );
  const pushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_5.png' );
  const pushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_6.png' );
  const pushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_7.png' );
  const pushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_8.png' );
  const pushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_9.png' );

  // atomic images
  const atomicPullImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_1.png' );
  const atomicPullImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_10.png' );
  const atomicPullImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_11.png' );
  const atomicPullImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_12.png' );
  const atomicPullImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_13.png' );
  const atomicPullImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_14.png' );
  const atomicPullImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_15.png' );
  const atomicPullImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_16.png' );
  const atomicPullImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_17.png' );
  const atomicPullImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_18.png' );
  const atomicPullImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_19.png' );
  const atomicPullImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_2.png' );
  const atomicPullImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_20.png' );
  const atomicPullImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_21.png' );
  const atomicPullImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_22.png' );
  const atomicPullImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_23.png' );
  const atomicPullImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_24.png' );
  const atomicPullImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_25.png' );
  const atomicPullImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_26.png' );
  const atomicPullImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_27.png' );
  const atomicPullImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_28.png' );
  const atomicPullImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_29.png' );
  const atomicPullImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_3.png' );
  const atomicPullImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_30.png' );
  const atomicPullImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_31.png' );
  const atomicPullImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_4.png' );
  const atomicPullImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_5.png' );
  const atomicPullImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_6.png' );
  const atomicPullImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_7.png' );
  const atomicPullImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_8.png' );
  const atomicPullImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_pull_atomic_9.png' );

  const atomicZeroForceImage = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_atomic_0.png' );

  const atomicPushImage1 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_1.png' );
  const atomicPushImage10 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_10.png' );
  const atomicPushImage11 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_11.png' );
  const atomicPushImage12 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_12.png' );
  const atomicPushImage13 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_13.png' );
  const atomicPushImage14 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_14.png' );
  const atomicPushImage15 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_15.png' );
  const atomicPushImage16 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_16.png' );
  const atomicPushImage17 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_17.png' );
  const atomicPushImage18 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_18.png' );
  const atomicPushImage19 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_19.png' );
  const atomicPushImage2 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_2.png' );
  const atomicPushImage20 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_20.png' );
  const atomicPushImage21 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_21.png' );
  const atomicPushImage22 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_22.png' );
  const atomicPushImage23 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_23.png' );
  const atomicPushImage24 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_24.png' );
  const atomicPushImage25 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_25.png' );
  const atomicPushImage26 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_26.png' );
  const atomicPushImage27 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_27.png' );
  const atomicPushImage28 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_28.png' );
  const atomicPushImage29 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_29.png' );
  const atomicPushImage3 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_3.png' );
  const atomicPushImage30 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_30.png' );
  const atomicPushImage31 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_31.png' );
  const atomicPushImage4 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_4.png' );
  const atomicPushImage5 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_5.png' );
  const atomicPushImage6 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_6.png' );
  const atomicPushImage7 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_7.png' );
  const atomicPushImage8 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_8.png' );
  const atomicPushImage9 = require( 'image!INVERSE_SQUARE_LAW_COMMON/figure_push_atomic_9.png' );

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