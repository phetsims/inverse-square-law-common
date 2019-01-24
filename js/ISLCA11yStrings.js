// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  const ISLCA11yStrings = {
    // TODO: replace instances of {{objectValueUnits}} or {{valueAndUnits}} to {{value}} {{units}}

    /***************************
     * Summary Pattern Strings *
     ***************************/
    summaryVectorSizePattern: {
      value: 'Force vector arrows are {{size}}.'
    },
    summaryVectorSizeValueUnitsPattern: {
      value: 'Force vector arrows are {{size}} at {{forceValue}} {{units}}.'
    },
    robotPullSummaryPattern: {
      value: 'Robots pull {{effort}} keeping spheres in place.'
    },
    robotPushSummaryPattern: {
      value: 'Robots push {{effort}} keeping spheres in place.'
    },
    summaryInteractionHintPattern: {
      value: 'Change position and {{massOrCharge}} of spheres to explore.'
    },
    distanceAndValueSummaryPattern: {
      value: '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{units}} apart.'
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
    forceVectorMagnitudeUnitsPattern: {
      value: 'Force vector magnitude is {{forceValue}} {{units}}.'
    },
    forceAndVectorPattern: {
      value: 'Force on {{thisObjectLabel}} by {{otherObjectLabel}} is {{size}}, and vector points directly at {{otherObjectLabel}}.'
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
      value: '{{position}} {{unit}} mark, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    edgePositionDistanceFromOtherObjectPattern: {
      value: '{{position}} {{unit}} mark, {{side}} edge, {{distance}} {{units}} from {{otherObjectLabel}}'
    },
    distanceFromOtherObjectPattern: {
      value: '{{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    // closer/further away
    progressDistanceFromOtherObjectPattern: {
      value: '{{progress}}, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },
    farthestFromOtherObjectPattern: {
      value: 'Farthest from {{otherObjectLabel}}, {{distance}} {{units}} away.'
    },
    closestToOtherObjectPattern: {
      value: 'Closest to {{otherObjectLabel}}, {{distance}} {{units}} away.'
    },
    lastStopDistanceFromOtherObjectPattern: {
      value: '{{region}}, last stop, {{distance}} {{units}} from {{otherObjectLabel}}.'
    },

    /************************
     * Force vector strings *
     ************************/
    regionForceClausePattern: {
      value: '{{region}}, {{forceClause}}'
    },
    vectorForceClausePattern: {
      value: '{{vectorClause}}, {{forceClause}}'
    },
    /*
     * from the doc, here are the possible alert text options:
     * - Force vectors {{size}}. // on focus
     * - Vectors {{size}}. // if an object reaches the end of its range and force values is unchecked
     * - Vectors {{size}}, forces {{force}} {{units}}. // object reaches end of range, force values checked
     * - {{proximity}}, vectors {{size}}.
     * - {{proximity}}, vectors {{size}}, forces {{force}} {{units}}.
     * - Vectors {{changeDirection}}.
     * - vectors {{changedirection}}
     * - vectors {{changeDirection}}, forces now {{force}} {{units}}
     */
    vectorChangePattern: {
      value: 'Vectors {{changeDirection}}.'
    },
    vectorChangeForcesNowValuePattern: {
      value: 'Vectors {{changeDirection}}, forces now {{forceValue}} {{units}}.'
    },
    vectorChangeClausePattern: {
      value: 'vectors {{changeDirection}}'
    },
    vectorChangeForcesNowClausePattern: {
      value: 'vectors {{changeDirection}}, forces now {{forceValue}} {{units}}'
    },
    forceVectorSizePattern: {
      value: 'Force vectors {{size}}.'
    },
    vectorSizePattern: {
      value: 'Vectors {{size}}.'
    },
    vectorSizeForcesValuePattern: {
      value: 'Vectors {{size}}, forces {{forceValue}} {{units}}.'
    },
    vectorsSizeClausePattern: {
      value: 'vectors {{size}}'
    },
    forcesValueUnitsClausePattern: {
      value: 'forces {{forceValue}} {{units}}'
    },
    forcesNowValueUnitsClausePattern: {
      value: 'forces now {{forceValue}} {{units}}'
    },
    // to be used in the alert manager
    proximityForceClausePattern: {
      value: '{{proximity}}, {{forceClause}}.'
    },
    // proximityVectorSizeForcesValuePattern: {
    //   value: '{{proximity}}, vectors {{size}}, forces {{forceValue}} {{units}}.'
    // },
    forceValueUnitsPattern: {
      value: '{{forceValue}} {{units}}'
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
    getBigger: {
      value: 'get bigger'
    },
    getSmaller: {
      value: 'get smaller'
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
      value: 'Closer'
    },
    fartherAway: {
      value: 'Farther away'
    },
    left: {
      value: 'left'
    },
    right: {
      value: 'right'
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
    scientificNotationPatternNoHtml: {
      value: '{{mantissa}} times 10 to the {{exponent}}'
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