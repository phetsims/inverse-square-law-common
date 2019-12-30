// Copyright 2018-2019, University of Colorado Boulder

/**
 * Object containing a11y related strings for the repo.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  const ISLCA11yStrings = {

    /***************************
     * Summary Pattern Strings *
     ***************************/
    forceVectorArrows: {
      value: 'Force vector arrows'
    },
    summaryVectorSizePattern: {
      value: '{{forceVectorArrows}} are {{size}}.'
    },
    summaryVectorSizeValueUnitsPattern: {
      value: '{{forceVectorArrows}} are {{size}} at {{forceValue}} {{units}}.'
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
    quantitativeAndQualitativePattern: {
      value: '{{qualitativeClause}}{{quantitativeClause}}.'
    },
    qualitativeDistanceEachOtherPattern: {
      value: '{{qualitativeDistance}} each other'
    },
    distanceAndValueSummaryPattern: {
      value: '{{object1Label}} and {{object2Label}} are {{qualitativeDistanceFromEachOther}}'
    },
    centersOfObjectsDistancePattern: {
      value: 'Centers of {{objectsDistanceClause}}'
    },
    centersExactlyPattern: {
      value: ', centers exactly {{distance}} {{units}} apart'
    },

    /******************
     * Sphere Strings *
     ******************/

    spherePositions: {
      value: 'Sphere Positions'
    },
    spherePositionHelpText: {
      value: 'Move spheres, closer or farther from each other.'
    },
    forceVectorMagnitudeUnitsPattern: {
      value: '{{forceMagnitude}} on {{thisObjectLabel}} by {{otherObjectLabel}} is {{forceValue}} {{units}}.'
    },
    forceMagnitude: {
      value: 'Force magnitude'
    },
    forceVectorSizePattern: {
      value: '{{forceVector}} is {{size}}'
    },
    forceVectorsSizePattern: {
      value: '{{forceVectors}} {{size}}'
    },
    forceAndVectorPattern: {
      value: '{{forceVectorSize}}, and points directly at {{otherObjectLabel}}.'
    },
    forceVectorCapitalized: {
      value: 'Force vector'
    },
    objectLabelPositionPattern: {
      value: 'Move {{label}}'
    },

    /**********************************
     * Position Slider aria-valuetext *
     **********************************/

    distanceAndUnitsPattern: {
      value: '{{distance}} {{units}}'
    },
    quantitativeDistancePattern: {
      value: '{{distanceAndUnits}} from'
    },
    distanceFromOtherObjectPattern: {
      value: '{{distance}} {{otherObjectLabel}}'
    },
    positionDistanceFromOtherObjectPattern: {
      value: '{{positionRegion}}, {{distanceFromOtherObject}}'
    },
    distanceFromOtherObjectSentencePattern: {
      value: '{{distanceFromOtherObject}}'
    },

    // position landmarks
    leftSideOfTrack: {
      value: 'left side of track'
    },
    rightSideOfTrack: {
      value: 'right side of track'
    },
    lastStopRight: {
      value: 'Last stop right'
    },
    lastStopLeft: {
      value: 'Last stop left'
    },
    trackEndLeft: {
      value: 'Track end left'
    },
    trackEndRight: {
      value: 'Track end right'
    },

    // closer/further away
    positionProgressOrLandmarkClause: {
      value: '{{progressOrLandmark}},'
    },

    /************************
     * Force vector strings *
     ************************/
    regionForceClausePattern: {
      value: '{{relativeDistance}} {{otherObjectLabel}}, {{forceClause}}.'
    },
    vectorForceClausePattern: {
      value: '{{vectorClause}}, {{forceValuesClause}}'
    },

    // Alert text strings
    vectorChangePattern: {
      value: '{{positionProgressOrLandmarkClause}} {{vectors}} {{changeDirection}}'
    },
    vectorChangeSentencePattern: {
      value: '{{vectorChange}}.'
    },
    vectorChangeForcesNowValuePattern: {
      value: '{{vectorChangeClause}}, forces now {{forceValue}} {{units}}.'
    },
    vectorsCapitalized: {
      value: 'Force vectors'
    },
    vectorChangeClausePattern: {
      value: '{{vectors}} {{changeDirection}}'
    },
    vectorChangeForcesNowClausePattern: {
      value: '{{vectors}} {{changeDirection}}, forces now {{forceValue}} {{units}}'
    },
    vectors: {
      value: 'force vectors'
    },
    vectorsSizeClausePattern: {
      value: '{{vectors}} {{size}}'
    },
    forcesValueUnitsClausePattern: {
      value: 'forces {{forceValue}} {{units}}'
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
    farthestFrom: {
      value: 'farthest from'
    },
    extremelyFarFrom: {
      value: 'extremely far from'
    },
    veryFarFrom: {
      value: 'very far from'
    },
    farFrom: {
      value: 'far from'
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
    closestTo: {
      value: 'closest to'
    },
    farthestFromCapitalized: {
      value: 'Farthest from'
    },
    extremelyFarFromCapitalized: {
      value: 'Extremely far from'
    },
    veryFarFromCapitalized: {
      value: 'Very far from'
    },
    farFromCapitalized: {
      value: 'Far from'
    },
    notSoCloseToCapitalized: {
      value: 'Not so close to'
    },
    closeToCapitalized: {
      value: 'Close to'
    },
    veryCloseToCapitalized: {
      value: 'Very close to'
    },
    extremelyCloseToCapitalized: {
      value: 'Extremely close to'
    },
    closestToCapitalized: {
      value: 'Closest to'
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
    lightly: {
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
      value: 'If needed, grab ruler to measure distance between centers of spheres. {{deviceSpecificHint}}'
    },
    rulerKeyboardHint: {
      value: 'Once grabbed, use keyboard shortcuts or letter keys W, A, S, or D to move ruler up, left, down, or right.'
    },
    measureDistanceRuler: {
      value: 'Measure Distance Ruler'
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