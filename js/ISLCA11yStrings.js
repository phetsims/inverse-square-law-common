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
    distanceAndValueSummaryPattern: {
      value: '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{distanceUnits}} apart.'
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
    spherePositionProgressObjectPattern: {
      value: '{{position}} mark, {{progress}} {{otherObjectLabel}}.'
    },
    spherePositionProgressPattern: {
      value: '{{position}} mark, {{progress}}.'
    },
    spherePositionRegionObjectPattern: {
      value: '{{position}} mark, {{region}} {{otherObjectLabel}}.'
    },
    spherePositionRegionPattern: {
      value: '{{position}} mark, {{region}}.'
    },
    spherePositionRegionLastStopPattern: {
      value: '{{position}} mark, {{region}}, last stop.'
    },

    /*
     * 12/11/18 update for position slider aria-valuetext
     */
    positionDistanceFromOtherObjectPattern: {
      value: '{{position}} mark, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    distanceFromOtherObjectPattern: {
      value: '{{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    progressDistanceFromOtherObjectPattern: {
      value: '{{progress}}, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    lastStopDistanceFromOtherObjectPattern: {
      value: '{{region}}, last stop, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },

    /************************
     * Force vector strings *
     ************************/
    forceVectorsSize: {
      value: 'Force vectors {{size}}.'
    },
    vectorAlertNoValuePattern: {
      value: 'Vectors {{changeOrSize}}.'
    },
    vectorAlertWithValuePattern: {
      value: 'Vectors {{changeOrSize}}, forces now {{valueAndUnits}}.'
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
    distanceObjectPattern: {
      value: '{{distance}} {{otherObject}}'
    },
    extremelyFarFrom: {
      value: 'extremely far from'
    },
    veryFarFrom: {
      value: 'very far from'
    },
    notSoFarFrom: {
      value: 'not so far from'
    },
    notSoCloseTo: {
      value: 'not so close to'
    },
    closeTo: {
      value: 'close to'
    },
    veryCloseTo: {
      value: 'very close to'
    },
    extremelyCloseTo: {
      value: 'extremely close to'
    },
    extremelyFar: {
      value: 'extremely far'
    },
    veryFar: {
      value: 'very far'
    },
    notSoFar: {
      value: 'not so far'
    },
    notSoClose: {
      value: 'not so close'
    },
    close: {
      value: 'close'
    },
    veryClose: {
      value: 'very close'
    },
    extremelyClose: {
      value: 'extremely close'
    },
    closerTo: {
      value: 'closer to'
    },
    fartherFrom: {
      value: 'farther from'
    },
    closer: {
      value: 'closer'
    },
    fartherAway: {
      value: 'Farther away'
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
      value: 'very little'
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
    valuesInUnitsPattern: {
      value: 'Values in {{units}}.'
    },
    forceValuesHidden: {
      value: 'Force values hidden.'
    },
    scientificNotationCheckboxHelpText: {
      value: 'Explore force values in scientific notation.'
    },
    forcesInScientificNotation: {
      value: 'Values in newtons with scientific notation.'
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