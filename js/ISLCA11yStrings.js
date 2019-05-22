// Copyright 2017-2018, University of Colorado Boulder

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
    // TODO: replace instances of {{objectValueUnits}} or {{valueAndUnits}} to {{value}} {{units}}

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
      value: 'Force vector magnitude is {{forceValue}} {{units}}.'
    },
    forceAndVectorPattern: {
      value: 'Force on {{thisObjectLabel}} by {{otherObjectLabel}} is {{size}}, and vector points directly at {{otherObjectLabel}}.'
    },
    valueKilogramsPattern: {
      value: '{{value}} kilograms'
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
      value: '{{positionRegion}}, {{distanceFromOtherObject}}.'
    },
    distanceFromOtherObjectSentencePattern: {
      value: '{{distanceFromOtherObject}}.'
    },

    // position landmarks
    leftSideOfTrack: {
      value: 'Left side of track'
    },
    rightSideOfTrack: {
      value: 'Right side of track'
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
      value: '{{progressOrLandmark}}, '
    },
    sidePattern: {
      value: '{{side}} edge'
    },

    lastStop: {
      value: 'last stop'
    },


    /************************
     * Force vector strings *
     ************************/
    regionForceClausePattern: {
      value: '{{region}}, {{forceClause}}.'
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
      value: '{{positionProgressOrLandmarkClause}}{{vectors}} {{changeDirection}}'
    },
    vectorChangeSentencePattern: {
      value: '{{vectorChange}}.'
    },
    vectorChangeForcesNowValuePattern: {
      value: '{{vectorChangeClause}}, forces now {{forceValue}} {{units}}.'
    },
    vectorsCapitalized: {
      value: 'Vectors'
    },
    vectorChangeClausePattern: {
      value: '{{vectors}} {{changeDirection}}'
    },
    vectorChangeForcesNowClausePattern: {
      value: '{{vectors}} {{changeDirection}}, forces now {{forceValue}} {{units}}'
    },
    vectors: {
      value: 'vectors'
    },
    vectorSizePattern: {
      value: '{{vectorsCapitalized}} {{size}}.'
    },
    vectorSizeForcesValuePattern: {
      value: '{{vectorsCapitalized}} {{size}}, forces now {{forceValue}} {{units}}.'
    },
    vectorsSizeClausePattern: {
      value: '{{vectors}} {{size}}'
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
    farthest: {
      value: 'farthest'
    },
    extremelyFar: {
      value: 'extremely far'
    },
    veryFar: {
      value: 'very far'
    },
    far: {
      value: 'far'
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
    closest: {
      value: 'closest'
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