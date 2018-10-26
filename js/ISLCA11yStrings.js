// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  const ISLCA11yStrings = {

    /***************************
     * Summary Pattern Strings *
     ***************************/


    vectorSizePattern: {
      value: 'Force vectors are {{size}}.'
    },
    vectorSizeValueUnitsPattern: {
      value: 'Force vectors are {{size}} at {{objectValue}} {{units}}.'
    },
    robotPullSummaryPattern: {
      value: 'Robots pulling {{effort}} keeping spheres in place.'
    },
    robotPushSummaryPattern: {
      value: 'Robots pushing {{effort}} keeping spheres in place.'
    },
    summaryInteractionHintPattern: {
      value: 'Move spheres or change their {{massOrCharge}} to begin observations.'
    },
    distanceSpaceAndValueSummaryPattern: {
      value: '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, exactly {{distance}} {{distanceUnits}} apart.'
    },

    /******************
     * Sphere Strings *
     ******************/

    spherePositions: {
      value: 'Sphere Positions'
    },
    spherePositionHelpText: {
      value: 'Move spheres, closer or further from each other.'
    },
    forceVectorMagnitudePattern: {
      value: 'Force vector magnitude is {{objectValue}} {{units}}.'
    },
    forceAndVectorPattern: {
      value: 'Force on {{thisObject}} by {{otherObject}} is {{size}}, and vector points directly at {{otherObject}}.'
    },

    /**********************
     * Qualitative Values *
     **********************/

    // force vector and mass object size
    tiny: {
      value: 'tiny'
    },
    verySmall: {
      value: 'very small'
    },
    small: {
      value: 'small'
    },
    mediumSize: {
      value: 'medium size'
    },
    large: {
      value: 'large'
    },
    veryLarge: {
      value: 'very large'
    },
    huge: {
      value: 'huge'
    },

    // distance between objects/spheres
    extremelyFarFrom: {
      value: 'extremely far from'
    },
    veryFarFrom: {
      value: 'very far from'
    },
    notSoFarFrom: {
      value: 'not so far from'
    },
    somewhatCloseTo: {
      value: 'somewhat close to'
    },
    closeTo: {
      value: 'close to'
    },
    veryCloseTo: {
      value: 'very close to'
    },
    nextTo: {
      value: 'next to'
    },
    rightNextTo: {
      value: 'right next to'
    },

    // puller robot effort
    veryHard: {
      value: 'very hard'
    },
    hard: {
      value: 'hard'
    },
    moderately: {
      value: 'moderately'
    },
    gently: {
      value: 'gently'
    },
    lighly: {
      value: 'lightly'
    },
    aLittle: {
      value: 'a little'
    },
    aTinyBit: {
      value: 'a tiny bit'
    }

  };

  if ( assert ) { Object.freeze( ISLCA11yStrings ); }

  return inverseSquareLawCommon.register( 'ISLCA11yStrings', ISLCA11yStrings );
} );