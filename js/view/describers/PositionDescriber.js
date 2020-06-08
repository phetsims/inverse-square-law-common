// Copyright 2018-2020, University of Colorado Boulder

/**
 * Responsible for logic associated with the formation of audio description strings related to the positions of the
 * ISLCObject instances and interactions associated with the changes of those positions.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import inverseSquareLawCommon from '../../inverseSquareLawCommon.js';
import inverseSquareLawCommonStrings from '../../inverseSquareLawCommonStrings.js';
import ISLCObjectEnum from '../ISLCObjectEnum.js';
import ISLCDescriber from './ISLCDescriber.js';

const unitsMetersString = inverseSquareLawCommonStrings.units.meters;
const unitsMeterString = inverseSquareLawCommonStrings.units.meter;

const objectLabelPositionPatternString = inverseSquareLawCommonStrings.a11y.sphere.objectLabelPositionPattern;
const distanceAndValueSummaryPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.distanceAndValueSummaryPattern;
const qualitativeDistanceEachOtherPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.qualitativeDistanceEachOtherPattern;
const centersExactlyPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.centersExactlyPattern;
const quantitativeAndQualitativePatternString = inverseSquareLawCommonStrings.a11y.screenSummary.quantitativeAndQualitativePattern;
const centersOfObjectsDistancePatternString = inverseSquareLawCommonStrings.a11y.screenSummary.centersOfObjectsDistancePattern;

const positionDistanceFromOtherObjectPatternString = inverseSquareLawCommonStrings.a11y.position.valuetext.positionDistanceFromOtherObjectPattern;
const positionProgressOrLandmarkClauseString = inverseSquareLawCommonStrings.a11y.positionProgressOrLandmarkClause;
const distanceAndUnitsPatternString = inverseSquareLawCommonStrings.a11y.position.valuetext.distanceAndUnitsPattern;
const quantitativeDistancePatternString = inverseSquareLawCommonStrings.a11y.position.valuetext.quantitativeDistancePattern;
const distanceFromOtherObjectPatternString = inverseSquareLawCommonStrings.a11y.position.valuetext.distanceFromOtherObjectPattern;
const distanceFromOtherObjectSentencePatternString = inverseSquareLawCommonStrings.a11y.position.valuetext.distanceFromOtherObjectSentencePattern;

const farthestFromString = inverseSquareLawCommonStrings.a11y.qualitative.farthestFrom;
const extremelyFarFromString = inverseSquareLawCommonStrings.a11y.qualitative.extremelyFarFrom;
const veryFarFromString = inverseSquareLawCommonStrings.a11y.qualitative.veryFarFrom;
const farFromString = inverseSquareLawCommonStrings.a11y.qualitative.farFrom;
const notSoCloseToString = inverseSquareLawCommonStrings.a11y.qualitative.notSoCloseTo;
const closeToString = inverseSquareLawCommonStrings.a11y.qualitative.closeTo;
const veryCloseToString = inverseSquareLawCommonStrings.a11y.qualitative.veryCloseTo;
const extremelyCloseToString = inverseSquareLawCommonStrings.a11y.qualitative.extremelyCloseTo;
const closestToString = inverseSquareLawCommonStrings.a11y.qualitative.closestTo;

const farthestFromCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.farthestFromCapitalized;
const extremelyFarFromCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.extremelyFarFromCapitalized;
const veryFarFromCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.veryFarFromCapitalized;
const farFromCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.farFromCapitalized;
const notSoCloseToCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.notSoCloseToCapitalized;
const closeToCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.closeToCapitalized;
const veryCloseToCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.veryCloseToCapitalized;
const extremelyCloseToCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.extremelyCloseToCapitalized;
const closestToCapitalizedString = inverseSquareLawCommonStrings.a11y.qualitative.closestToCapitalized;

const closerString = inverseSquareLawCommonStrings.a11y.qualitative.closer;
const fartherAwayString = inverseSquareLawCommonStrings.a11y.qualitative.fartherAway;

const distanceApartPatternString = inverseSquareLawCommonStrings.a11y.sphere.distanceApartPattern;
const spherePositionHelpTextString = inverseSquareLawCommonStrings.a11y.sphere.positionHelpText;

// track landmarks
const leftSideOfTrackString = inverseSquareLawCommonStrings.a11y.position.landmarks.leftSideOfTrack;
const rightSideOfTrackString = inverseSquareLawCommonStrings.a11y.position.landmarks.rightSideOfTrack;
const lastStopRightString = inverseSquareLawCommonStrings.a11y.position.landmarks.lastStopRight;
const lastStopLeftString = inverseSquareLawCommonStrings.a11y.position.landmarks.lastStopLeft;
const trackEndLeftString = inverseSquareLawCommonStrings.a11y.position.landmarks.trackEndLeft;
const trackEndRightString = inverseSquareLawCommonStrings.a11y.position.landmarks.trackEndRight;

const selfVoicingLevelsMassQuantitativePatternString = inverseSquareLawCommonStrings.a11y.selfVoicing.levels.massQuantitativePattern;
const selfVoicingLevelsMassQualitativePatternString = inverseSquareLawCommonStrings.a11y.selfVoicing.levels.massQualitativePattern;

const RELATIVE_DISTANCE_STRINGS = [
  farthestFromString,
  extremelyFarFromString,
  veryFarFromString,
  farFromString,
  notSoCloseToString,
  closeToString,
  veryCloseToString,
  extremelyCloseToString,
  closestToString
];

const RELATIVE_DISTANCE_STRINGS_CAPITALIZED = [
  farthestFromCapitalizedString,
  extremelyFarFromCapitalizedString,
  veryFarFromCapitalizedString,
  farFromCapitalizedString,
  notSoCloseToCapitalizedString,
  closeToCapitalizedString,
  veryCloseToCapitalizedString,
  extremelyCloseToCapitalizedString,
  closestToCapitalizedString
];

class PositionDescriber extends ISLCDescriber {

  /**
   * @param {ISLCModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   * @param {Object} [options]
   */
  constructor( model, object1Label, object2Label, options ) {
    super( model, object1Label, object2Label );

    options = merge( {
      unit: unitsMeterString,
      units: unitsMetersString,

      // {function(number):number} - convert to display distance for PDOM descriptions
      formatDisplayDistance: _.identity
    }, options );

    // @public
    this.unit = options.unit;

    // @private
    this.units = options.units; // {string}
    this.formatDisplayDistance = options.formatDisplayDistance;

    // @private {number} - in meters, already converted with optional formatting function
    this.distanceBetween = 0;

    // @private {number} - in converted distance
    this.oldDistanceBetween = 0;

    // @public {boolean|null} - previous value of this.movedCloser
    this.lastMoveCloser = false;

    // @private {boolean|null} - Whether or not the masses moved closer last position change. only set when an object
    // is dragging. `null` if the user isn't interacting specifically with the objects
    this.movedCloser = false;

    // @protected {boolean}  - Many descriptions use a quantitative form when distance values are showing, and use qualitative
    // descriptions when distance values are hidden. Furthermore some descriptions in the REGULAR version are
    // "simplified" from quantitative to qualitative forms in the BASICS version. False means qualitative.
    // see https://github.com/phetsims/gravity-force-lab-basics/issues/88
    this.useQuantitativeDistance = true;

    Property.multilink(
      [ this.object1.positionProperty, this.object2.positionProperty ],
      ( x1, x2 ) => {

        // set former values
        this.oldDistanceBetween = this.distanceBetween;
        this.lastMoveCloser = this.movedCloser;

        // update current values
        this.distanceBetween = this.formatDisplayDistance( Math.abs( x1 - x2 ) );

        // only set movedCloser if the user is manipulating the value, null otherwise for comparison on focus
        if ( this.object1.isDragging || this.object2.isDragging ) {
          this.movedCloser = this.distanceBetween < this.oldDistanceBetween;
        }
        else {
          this.movedCloser = null;
        }
      }
    );
  }

  /**
   * Like "close to each other" or "far from each other"
   * @protected
   * @returns {string}
   */
  getQualitativeDistanceFromEachOther() {
    return StringUtils.fillIn( qualitativeDistanceEachOtherPatternString, {
      qualitativeDistance: this.getQualitativeRelativeDistanceRegion()
    } );
  }

  /**
   * Returns the string used in the screen summary item displaying position/distance information:
   * '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{units}} apart.'
   * GFLB can toggle if distance is showing, and so additional logic is added here to support removing the quantitative
   * "centers exactly" suffix.
   * @returns {string}
   * @public
   */
  getObjectDistanceSummary() {
    const qualitativeDistanceClause = StringUtils.fillIn(
      distanceAndValueSummaryPatternString,
      {
        object1Label: this.object1Label,
        object2Label: this.object2Label,
        qualitativeDistanceFromEachOther: this.getQualitativeDistanceFromEachOther()
      }
    );
    const quantitativeDistanceClause = StringUtils.fillIn(
      centersExactlyPatternString, {
        distanceAndUnits: this.getDistanceAndUnits()
      }
    );

    let summary = StringUtils.fillIn( quantitativeAndQualitativePatternString, {
        qualitativeClause: qualitativeDistanceClause,
        quantitativeClause: this.useQuantitativeDistance ? quantitativeDistanceClause : ''
      }
    );

    // if we don't want the "centers exactly" suffix, then add "Centers of" as a prefix
    if ( !this.useQuantitativeDistance ) {
      summary = StringUtils.fillIn( centersOfObjectsDistancePatternString, {
        objectsDistanceClause: summary
      } );
    }
    return summary;
  }

  /**
   * @protected
   * @returns {string}
   */
  getDistanceAndUnits() {
    const distance = this.distanceBetween;
    let units = this.units;

    // singular if there is only '1'
    if ( distance === 1 ) {
      units = this.unit;
    }

    return StringUtils.fillIn( distanceAndUnitsPatternString, {
      distance: distance,
      units: units
    } );
  }

  /**
   * Fill in distance and units into quantitative clause
   * @private
   * @returns {string}
   */
  getQuantitativeDistanceClause() {
    return StringUtils.fillIn( quantitativeDistancePatternString, {
      distanceAndUnits: this.getDistanceAndUnits()
    } );
  }

  /**
   * Depending on whether or not quantitative distance is set, get the appropriate distance string.
   * @param {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   * @public
   */
  getDistanceClause( thisObjectEnum ) {
    const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );

    const distanceClause = this.useQuantitativeDistance ?
                           this.getQuantitativeDistanceClause() :
                           this.getQualitativeRelativeDistanceRegion();

    return StringUtils.fillIn( distanceFromOtherObjectPatternString, {
      distance: distanceClause,
      otherObjectLabel: otherObjectLabel
    } );
  }

  /**
   * There are only two positional regions, left/right side of track.
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   * @private
   */
  getCurrentPositionRegion( objectEnum ) {

    // objects not touching any boundary, based on the side relative to the center
    const object = this.getObjectFromEnum( objectEnum );

    return object.positionProperty.get() < 0 ? leftSideOfTrackString : rightSideOfTrackString;
  }

  /**
   * Get the position change clause, like closer/farther strings.
   * @param {ISLCObject} object
   * @returns {string|null} - null if there isn't a position progress or landmark clause
   * @public
   */
  getPositionProgressOrLandmarkClause( object ) {
    const objectEnum = object.enum;

    let positionString = this.movedCloser ? closerString : fartherAwayString;


    // object 1 touching left
    if ( this.object1AtMin( objectEnum ) ) {
      positionString = trackEndLeftString;
    }

    // object 2 touching right
    else if ( this.object2AtMax( objectEnum ) ) {
      positionString = trackEndRightString;
    }

    // objects touching each other
    else if ( this.objectTouchingBoundary( objectEnum ) ) {
      positionString = ISLCObjectEnum.isObject1( objectEnum ) ? lastStopRightString : lastStopLeftString;
    }

    // No change, so if not covered by above edge cases, there shouldn't be a progress clause
    else if ( this.lastMoveCloser === this.movedCloser ) {
      return null;
    }

    return StringUtils.fillIn( positionProgressOrLandmarkClauseString, {
      progressOrLandmark: positionString
    } );
  }

  /**
   * Returns a function used by AccessibleSlider to format its aria-valuetext attribute. Of note is that this function
   * is called AFTER the Slider's position Property has been set. Since, the PositionDescriber links to the PositionProperty
   * prior to the call to initializeAccessibleSlider, we can ensure that PositionDescribers dynamic properties (e.g. distanceBetween )
   * will be accurate when the below function is called.
   *
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {Function}
   * @public
   */
  getPositionAriaValueTextCreator( objectEnum ) {

    // By initializing to the current value, regions will only be displayed when on region change, and not on startup.
    const previousPositionRegionProperty = new StringProperty( this.getCurrentPositionRegion( objectEnum ) );

    // NOTE: AccessibleValueHandler supports parameters to this function, but recognize that subtypes override this
    // method before adding these, see https://github.com/phetsims/gravity-force-lab-basics/issues/113
    const valueTextCreator = () => {
      const distanceClause = this.getDistanceClause( objectEnum );

      const newPositionRegion = this.getCurrentPositionRegion( objectEnum );

      // Only include the region if it is different from the previous. The key
      if ( previousPositionRegionProperty.value !== newPositionRegion ) {
        previousPositionRegionProperty.value = newPositionRegion;

        return StringUtils.fillIn( positionDistanceFromOtherObjectPatternString, {
          positionRegion: newPositionRegion,
          distanceFromOtherObject: distanceClause
        } );
      }
      else {
        return StringUtils.fillIn( distanceFromOtherObjectSentencePatternString, {
          distanceFromOtherObject: distanceClause
        } );
      }
    };

    /**
     * {function} - reset the valueTextCreator
     */
    valueTextCreator.reset = () => {
      previousPositionRegionProperty.reset();
    };
    return valueTextCreator;
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {boolean} - returns false if provided enum is not object1
   * @private
   */
  object1AtMin( objectEnum ) {
    return ISLCObjectEnum.isObject1( objectEnum ) && this.objectAtTouchingMin( objectEnum );
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {boolean} - returns false if provided enum is not object2
   * @public
   */
  object2AtMax( objectEnum ) {
    return ISLCObjectEnum.isObject2( objectEnum ) && this.objectAtTouchingMax( objectEnum );
  }

  /**
   * Returns true if the model object associated with the passed-in enum is at the left/right boundary of the object's
   * available movement. This means that if a mass can't move left anymore because it is up against
   * a mass on that side, then this function will return true. To figure out if a mass is at the complete
   * edge of the slider range, see this.objectAtEdgeIgnoreOtherObject().
   *
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {boolean}
   * @private
   */
  objectTouchingBoundary( objectEnum ) {
    return this.objectAtTouchingMin( objectEnum ) || this.objectAtTouchingMax( objectEnum );
  }

  /**
   * Returns true if the model object associated with the passed-in enum is at the left boundary of its currently
   * enabled range. Note that when the objects are touching, their enabledRanges will be limited by the other object.
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {boolean}
   * @private
   */
  objectAtTouchingMin( objectEnum ) {
    const object = this.getObjectFromEnum( objectEnum );
    return object.positionProperty.get() === object.enabledRangeProperty.get().min;
  }

  /**
   * Returns true if the model object associated with the passed-in enum is at the right boundary of its currently
   * enabled range. Note that when the objects are touching, their enabledRanges will be limited by the other object.
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {boolean}
   * @private
   */
  objectAtTouchingMax( objectEnum ) {
    const object = this.getObjectFromEnum( objectEnum );
    return object.positionProperty.get() === object.enabledRangeProperty.get().max;
  }

  /**
   * Same as getQualitativeRelativeDistanceRegion but for the start of the sentence (e.g. 'Very far from')
   * @returns {string}
   * @public
   */
  getCapitalizedQualitativeRelativeDistanceRegion() {
    const index = this.getDistanceIndex( this.distanceBetween, RELATIVE_DISTANCE_STRINGS_CAPITALIZED.length );
    assert && assert( index >= 0 && index < RELATIVE_DISTANCE_STRINGS_CAPITALIZED.length, 'index out of range' );
    return RELATIVE_DISTANCE_STRINGS_CAPITALIZED[ index ];
  }

  /**
   * The qualitative distance relative to another object (e.g. 'very far from')
   * @private
   * @returns {string}
   */
  getQualitativeRelativeDistanceRegion() {
    const index = this.getDistanceIndex( this.distanceBetween, RELATIVE_DISTANCE_STRINGS.length );
    assert && assert( index >= 0 && index < RELATIVE_DISTANCE_STRINGS.length, 'index out of range' );
    return RELATIVE_DISTANCE_STRINGS[ index ];
  }

  /**
   * Returns the mapped integer corresponding to the appropriate qualitative distance value. Since distances range from
   * km to pm, subtypes must implement this method.
   *
   * @abstract
   * @param  {number} distance
   * @param {number} numberOfRegions - for crosscheck
   * @returns {number} - integer
   * @private
   */
  getDistanceIndex( distance, numberOfRegions ) {
    throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
  }

  /**
   * @public
   * @returns {string} - the help text for the sphere positions heading/container node
   */
  getSpherePositionsHelpText() {
    const quantitativeDistance = StringUtils.fillIn( distanceApartPatternString, {
      distanceAndUnits: this.getDistanceAndUnits()
    } );

    return StringUtils.fillIn( spherePositionHelpTextString, {
      distanceApart: this.useQuantitativeDistance ? quantitativeDistance : this.getQualitativeDistanceFromEachOther()
    } );
  }

  /**
   * Returns a string to be used in the prototype self-voicing context. Returns something like
   * "mass 1, 4 kilometers from mass 1" (distances shown) or
   * "mass 1, close to mass 1" (distances hidden)
   * @param {string} objectLabel
   * @param {string} otherObjectLabel
   * @public
   */
  getSelfVoicingDistanceDescription( objectLabel, otherObjectLabel ) {
    const patternString = this.useQuantitativeDistance ? selfVoicingLevelsMassQuantitativePatternString : selfVoicingLevelsMassQualitativePatternString;
    const distanceDescription = this.useQuantitativeDistance ? this.getDistanceAndUnits() : this.getQualitativeRelativeDistanceRegion();

    return StringUtils.fillIn( patternString, {
      object: objectLabel,
      distance: distanceDescription,
      otherObject: otherObjectLabel
    } );
  }

  /**
   * Returns the filled in movable object position label.
   *
   * @param  {string} label
   * @returns {string}
   * @public
   */
  static getObjectLabelPositionText( label ) {
    return StringUtils.fillIn( objectLabelPositionPatternString, { label: label } );
  }
}

inverseSquareLawCommon.register( 'PositionDescriber', PositionDescriber );
export default PositionDescriber;