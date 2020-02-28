// Copyright 2018-2020, University of Colorado Boulder

/**
 * Logic for exporting all necessary images for the ISLC sims.
 *
 * @author  Michael Barlow
 */

import zeroForceImage from '../images/figure_0_png.js';
import atomicZeroForceImage from '../images/figure_atomic_0_png.js';
import pullImage10 from '../images/figure_pull_10_png.js';
import pullImage11 from '../images/figure_pull_11_png.js';
import pullImage12 from '../images/figure_pull_12_png.js';
import pullImage13 from '../images/figure_pull_13_png.js';
import pullImage14 from '../images/figure_pull_14_png.js';
import pullImage15 from '../images/figure_pull_15_png.js';
import pullImage16 from '../images/figure_pull_16_png.js';
import pullImage17 from '../images/figure_pull_17_png.js';
import pullImage18 from '../images/figure_pull_18_png.js';
import pullImage19 from '../images/figure_pull_19_png.js';
import pullImage1 from '../images/figure_pull_1_png.js';
import pullImage20 from '../images/figure_pull_20_png.js';
import pullImage21 from '../images/figure_pull_21_png.js';
import pullImage22 from '../images/figure_pull_22_png.js';
import pullImage23 from '../images/figure_pull_23_png.js';
import pullImage24 from '../images/figure_pull_24_png.js';
import pullImage25 from '../images/figure_pull_25_png.js';
import pullImage26 from '../images/figure_pull_26_png.js';
import pullImage27 from '../images/figure_pull_27_png.js';
import pullImage28 from '../images/figure_pull_28_png.js';
import pullImage29 from '../images/figure_pull_29_png.js';
import pullImage2 from '../images/figure_pull_2_png.js';
import pullImage30 from '../images/figure_pull_30_png.js';
import pullImage31 from '../images/figure_pull_31_png.js';
import pullImage3 from '../images/figure_pull_3_png.js';
import pullImage4 from '../images/figure_pull_4_png.js';
import pullImage5 from '../images/figure_pull_5_png.js';
import pullImage6 from '../images/figure_pull_6_png.js';
import pullImage7 from '../images/figure_pull_7_png.js';
import pullImage8 from '../images/figure_pull_8_png.js';
import pullImage9 from '../images/figure_pull_9_png.js';
import atomicPullImage10 from '../images/figure_pull_atomic_10_png.js';
import atomicPullImage11 from '../images/figure_pull_atomic_11_png.js';
import atomicPullImage12 from '../images/figure_pull_atomic_12_png.js';
import atomicPullImage13 from '../images/figure_pull_atomic_13_png.js';
import atomicPullImage14 from '../images/figure_pull_atomic_14_png.js';
import atomicPullImage15 from '../images/figure_pull_atomic_15_png.js';
import atomicPullImage16 from '../images/figure_pull_atomic_16_png.js';
import atomicPullImage17 from '../images/figure_pull_atomic_17_png.js';
import atomicPullImage18 from '../images/figure_pull_atomic_18_png.js';
import atomicPullImage19 from '../images/figure_pull_atomic_19_png.js';
import atomicPullImage1 from '../images/figure_pull_atomic_1_png.js';
import atomicPullImage20 from '../images/figure_pull_atomic_20_png.js';
import atomicPullImage21 from '../images/figure_pull_atomic_21_png.js';
import atomicPullImage22 from '../images/figure_pull_atomic_22_png.js';
import atomicPullImage23 from '../images/figure_pull_atomic_23_png.js';
import atomicPullImage24 from '../images/figure_pull_atomic_24_png.js';
import atomicPullImage25 from '../images/figure_pull_atomic_25_png.js';
import atomicPullImage26 from '../images/figure_pull_atomic_26_png.js';
import atomicPullImage27 from '../images/figure_pull_atomic_27_png.js';
import atomicPullImage28 from '../images/figure_pull_atomic_28_png.js';
import atomicPullImage29 from '../images/figure_pull_atomic_29_png.js';
import atomicPullImage2 from '../images/figure_pull_atomic_2_png.js';
import atomicPullImage30 from '../images/figure_pull_atomic_30_png.js';
import atomicPullImage31 from '../images/figure_pull_atomic_31_png.js';
import atomicPullImage3 from '../images/figure_pull_atomic_3_png.js';
import atomicPullImage4 from '../images/figure_pull_atomic_4_png.js';
import atomicPullImage5 from '../images/figure_pull_atomic_5_png.js';
import atomicPullImage6 from '../images/figure_pull_atomic_6_png.js';
import atomicPullImage7 from '../images/figure_pull_atomic_7_png.js';
import atomicPullImage8 from '../images/figure_pull_atomic_8_png.js';
import atomicPullImage9 from '../images/figure_pull_atomic_9_png.js';
import pushImage10 from '../images/figure_push_10_png.js';
import pushImage11 from '../images/figure_push_11_png.js';
import pushImage12 from '../images/figure_push_12_png.js';
import pushImage13 from '../images/figure_push_13_png.js';
import pushImage14 from '../images/figure_push_14_png.js';
import pushImage15 from '../images/figure_push_15_png.js';
import pushImage16 from '../images/figure_push_16_png.js';
import pushImage17 from '../images/figure_push_17_png.js';
import pushImage18 from '../images/figure_push_18_png.js';
import pushImage19 from '../images/figure_push_19_png.js';
import pushImage1 from '../images/figure_push_1_png.js';
import pushImage20 from '../images/figure_push_20_png.js';
import pushImage21 from '../images/figure_push_21_png.js';
import pushImage22 from '../images/figure_push_22_png.js';
import pushImage23 from '../images/figure_push_23_png.js';
import pushImage24 from '../images/figure_push_24_png.js';
import pushImage25 from '../images/figure_push_25_png.js';
import pushImage26 from '../images/figure_push_26_png.js';
import pushImage27 from '../images/figure_push_27_png.js';
import pushImage28 from '../images/figure_push_28_png.js';
import pushImage29 from '../images/figure_push_29_png.js';
import pushImage2 from '../images/figure_push_2_png.js';
import pushImage30 from '../images/figure_push_30_png.js';
import pushImage31 from '../images/figure_push_31_png.js';
import pushImage3 from '../images/figure_push_3_png.js';
import pushImage4 from '../images/figure_push_4_png.js';
import pushImage5 from '../images/figure_push_5_png.js';
import pushImage6 from '../images/figure_push_6_png.js';
import pushImage7 from '../images/figure_push_7_png.js';
import pushImage8 from '../images/figure_push_8_png.js';
import pushImage9 from '../images/figure_push_9_png.js';
import atomicPushImage10 from '../images/figure_push_atomic_10_png.js';
import atomicPushImage11 from '../images/figure_push_atomic_11_png.js';
import atomicPushImage12 from '../images/figure_push_atomic_12_png.js';
import atomicPushImage13 from '../images/figure_push_atomic_13_png.js';
import atomicPushImage14 from '../images/figure_push_atomic_14_png.js';
import atomicPushImage15 from '../images/figure_push_atomic_15_png.js';
import atomicPushImage16 from '../images/figure_push_atomic_16_png.js';
import atomicPushImage17 from '../images/figure_push_atomic_17_png.js';
import atomicPushImage18 from '../images/figure_push_atomic_18_png.js';
import atomicPushImage19 from '../images/figure_push_atomic_19_png.js';
import atomicPushImage1 from '../images/figure_push_atomic_1_png.js';
import atomicPushImage20 from '../images/figure_push_atomic_20_png.js';
import atomicPushImage21 from '../images/figure_push_atomic_21_png.js';
import atomicPushImage22 from '../images/figure_push_atomic_22_png.js';
import atomicPushImage23 from '../images/figure_push_atomic_23_png.js';
import atomicPushImage24 from '../images/figure_push_atomic_24_png.js';
import atomicPushImage25 from '../images/figure_push_atomic_25_png.js';
import atomicPushImage26 from '../images/figure_push_atomic_26_png.js';
import atomicPushImage27 from '../images/figure_push_atomic_27_png.js';
import atomicPushImage28 from '../images/figure_push_atomic_28_png.js';
import atomicPushImage29 from '../images/figure_push_atomic_29_png.js';
import atomicPushImage2 from '../images/figure_push_atomic_2_png.js';
import atomicPushImage30 from '../images/figure_push_atomic_30_png.js';
import atomicPushImage31 from '../images/figure_push_atomic_31_png.js';
import atomicPushImage3 from '../images/figure_push_atomic_3_png.js';
import atomicPushImage4 from '../images/figure_push_atomic_4_png.js';
import atomicPushImage5 from '../images/figure_push_atomic_5_png.js';
import atomicPushImage6 from '../images/figure_push_atomic_6_png.js';
import atomicPushImage7 from '../images/figure_push_atomic_7_png.js';
import atomicPushImage8 from '../images/figure_push_atomic_8_png.js';
import atomicPushImage9 from '../images/figure_push_atomic_9_png.js';
import inverseSquareLawCommon from './inverseSquareLawCommon.js';

// standard images


// atomic images


// for all images, the appended number corresponds to their 'level of effort', e.g. pullImage1 shows less pull than pullImage22
// this is important for mapping force values to the index of the corresponding pull effort
const pullImages = [ pullImage1, pullImage2, pullImage3, pullImage4, pullImage5, pullImage6, pullImage7,
  pullImage8, pullImage9, pullImage10, pullImage11, pullImage12, pullImage13, pullImage14, pullImage15, pullImage16,
  pullImage17, pullImage18, pullImage19, pullImage20, pullImage21, pullImage22, pullImage23, pullImage24, pullImage25,
  pullImage26, pullImage27, pullImage28, pullImage29, pullImage30, pullImage31 ];

const pushImages = [ pushImage1, pushImage2, pushImage3, pushImage4, pushImage5, pushImage6, pushImage7,
  pushImage8, pushImage9, pushImage10, pushImage11, pushImage12, pushImage13, pushImage14, pushImage15, pushImage16,
  pushImage17, pushImage18, pushImage19, pushImage20, pushImage21, pushImage22, pushImage23, pushImage24, pushImage25,
  pushImage26, pushImage27, pushImage28, pushImage29, pushImage30, pushImage31 ];

// ensure push images are ordered from large push to small push
pushImages.reverse();

const atomicPullImages = [ atomicPullImage1, atomicPullImage2, atomicPullImage3, atomicPullImage4, atomicPullImage5,
  atomicPullImage6, atomicPullImage7, atomicPullImage8, atomicPullImage9, atomicPullImage10, atomicPullImage11,
  atomicPullImage12, atomicPullImage13, atomicPullImage14, atomicPullImage15, atomicPullImage16, atomicPullImage17,
  atomicPullImage18, atomicPullImage19, atomicPullImage20, atomicPullImage21, atomicPullImage22, atomicPullImage23,
  atomicPullImage24, atomicPullImage25, atomicPullImage26, atomicPullImage27, atomicPullImage28, atomicPullImage29,
  atomicPullImage30, atomicPullImage31 ];

const atomicPushImages = [ atomicPushImage1, atomicPushImage2, atomicPushImage3, atomicPushImage4, atomicPushImage5,
  atomicPushImage6, atomicPushImage7, atomicPushImage8, atomicPushImage9, atomicPushImage10, atomicPushImage11,
  atomicPushImage12, atomicPushImage13, atomicPushImage14, atomicPushImage15, atomicPushImage16, atomicPushImage17,
  atomicPushImage18, atomicPushImage19, atomicPushImage20, atomicPushImage21, atomicPushImage22, atomicPushImage23,
  atomicPushImage24, atomicPushImage25, atomicPushImage26, atomicPushImage27, atomicPushImage28, atomicPushImage29,
  atomicPushImage30, atomicPushImage31 ];

atomicPushImages.reverse();

const ISLCPullerImages = {
  pullImages: pullImages,
  pushImages: pushImages,
  atomicPullImages: atomicPullImages,
  atomicPushImages: atomicPushImages,
  zeroForceImage: zeroForceImage,
  atomicZeroForceImage: atomicZeroForceImage
};

inverseSquareLawCommon.register( 'ISLCPullerImages', ISLCPullerImages );

export default ISLCPullerImages;