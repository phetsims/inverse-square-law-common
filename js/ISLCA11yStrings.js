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
      value: 'Force vectors are {{size}} at {{objectValueUnits}}.'
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
      value: 'Force vector magnitude is {{objectValueUnits}}.'
    },
    forceAndVectorPattern: {
      value: 'Force on {{thisObject}} by {{otherObject}} is {{size}}, and vector points directly at {{otherObject}}.'
    },
    positionMeterMarkPattern: {
      value: '{{positionUnit}} mark'
    },
    valueKilogramsPattern: {
      value: '{{value}} kilograms'
    },
    objectLabelPositionPattern: {
      value: '{{label}} position'
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
    },

    // Ruler strings
    rulerLabel: {
      value: 'Ruler'
    },
    rulerHelpText: {
      value: 'Move ruler to measure distance between spheres in meters.'
    },
    moveInFourDirections: {
      value: 'move in four directions'
    },

    // common checkbox strings
    forceValuesCheckboxHelpText: {
      value: 'Explore value of forces in newtons.'
    },
    forcesInExactValues: {
      value: 'Forces in exact values.'
    },
    forcesNotInExactValues: {
      value: 'Forces not in exact values.'
    },
    scientificNotationCheckboxHelpText: {
      value: 'Listen to newtons in scientific notation.'
    },
    forcesInScientificNotation: {
      value: 'Forces in scientific notation.'
    },
    forcesInDecimal: {
      value: 'Forces in decimal format.'
    },

    // misc
    scientificNotationPattern: {
      value: '{{mantissa}} &times; 10 to the {{exponent}}'
    },
    negativeValuePattern: {
      value: 'negative {{value}}'
    },
    valuePattern: {
      value: '{{value}}'
    }
  };

  if ( assert ) { Object.freeze( ISLCA11yStrings ); }

  return inverseSquareLawCommon.register( 'ISLCA11yStrings', ISLCA11yStrings );
} );