// Copyright 2018-2019, University of Colorado Boulder

/**
 * Responsible for logic associated with the formation of audio description strings related to the positions of the
 * ISLCObject instances and interactions associated with the changes of those positions.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Property = require( 'AXON/Property' );
  const StringProperty = require( 'AXON/StringProperty' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsMeterString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meter' );

  // a11y strings
  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value;
  const distanceAndValueSummaryPatternString = ISLCA11yStrings.distanceAndValueSummaryPattern.value;
  const qualitativeDistanceEachOtherPatternString = ISLCA11yStrings.qualitativeDistanceEachOtherPattern.value;
  const centersExactlyPatternString = ISLCA11yStrings.centersExactlyPattern.value;
  const quantitativeAndQualitativePatternString = ISLCA11yStrings.quantitativeAndQualitativePattern.value;
  const centersOfObjectsDistancePatternString = ISLCA11yStrings.centersOfObjectsDistancePattern.value;

  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const positionProgressOrLandmarkClauseString = ISLCA11yStrings.positionProgressOrLandmarkClause.value;
  const distanceAndUnitsPatternString = ISLCA11yStrings.distanceAndUnitsPattern.value;
  const quantitativeDistancePatternString = ISLCA11yStrings.quantitativeDistancePattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const distanceFromOtherObjectSentencePatternString = ISLCA11yStrings.distanceFromOtherObjectSentencePattern.value;

  const farthestFromString = ISLCA11yStrings.farthestFrom.value;
  const extremelyFarFromString = ISLCA11yStrings.extremelyFarFrom.value;
  const veryFarFromString = ISLCA11yStrings.veryFarFrom.value;
  const farFromString = ISLCA11yStrings.farFrom.value;
  const notSoCloseToString = ISLCA11yStrings.notSoCloseTo.value;
  const closeToString = ISLCA11yStrings.closeTo.value;
  const veryCloseToString = ISLCA11yStrings.veryCloseTo.value;
  const extremelyCloseToString = ISLCA11yStrings.extremelyCloseTo.value;
  const closestToString = ISLCA11yStrings.closestTo.value;

  const farthestString = ISLCA11yStrings.farthest.value;
  const extremelyFarString = ISLCA11yStrings.extremelyFar.value;
  const veryFarString = ISLCA11yStrings.veryFar.value;
  const farString = ISLCA11yStrings.far.value;
  const notSoCloseString = ISLCA11yStrings.notSoClose.value;
  const closeString = ISLCA11yStrings.close.value;
  const veryCloseString = ISLCA11yStrings.veryClose.value;
  const extremelyCloseString = ISLCA11yStrings.extremelyClose.value;
  const closestString = ISLCA11yStrings.closest.value;
  const closerString = ISLCA11yStrings.closer.value;
  const fartherAwayString = ISLCA11yStrings.fartherAway.value;

  // track landmarks
  const leftSideOfTrackString = ISLCA11yStrings.leftSideOfTrack.value;
  const rightSideOfTrackString = ISLCA11yStrings.rightSideOfTrack.value;
  const lastStopRightString = ISLCA11yStrings.lastStopRight.value;
  const lastStopLeftString = ISLCA11yStrings.lastStopLeft.value;
  const trackEndLeftString = ISLCA11yStrings.trackEndLeft.value;
  const trackEndRightString = ISLCA11yStrings.trackEndRight.value;

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

  const DISTANCE_STRINGS = [
    farthestString,
    extremelyFarString,
    veryFarString,
    farString,
    notSoCloseString,
    closeString,
    veryCloseString,
    extremelyCloseString,
    closestString
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

      options = _.extend( {
        unit: unitsMeterString,
        units: unitsMetersString,

        // {function(number):number} - convert to display distance for PDOM descriptions
        convertDistanceMetric: _.identity
      }, options );

      // @public
      this.unit = options.unit;

      // @private
      this.units = options.units; // {string}
      this.convertDistanceMetric = options.convertDistanceMetric;

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
          this.distanceBetween = this.convertDistanceMetric( Math.abs( x1 - x2 ) );

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
      const distance = this.distanceBetween;

      const qualitativeDistanceClause = StringUtils.fillIn(
        distanceAndValueSummaryPatternString,
        {
          object1Label: this.object1Label,
          object2Label: this.object2Label,
          qualitativeDistanceFromEachOther: this.getQualitativeDistanceFromEachOther()
        }
      );
      const quantitativeDistanceClause = StringUtils.fillIn(
        centersExactlyPatternString,
        { distance: distance, units: this.units }
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
      const units = this.units;

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
     * Get the distance instance, implemented in sub types, and assert that it is a valid value based on the regions
     * located in this file.
     * @private
     * @returns {number} - an integer index
     */
    getDistanceIndexAndAssert() {
      const index = this.getDistanceIndex( this.distanceBetween );
      assert && assert( index >= 0 && index < DISTANCE_STRINGS.length, 'index out of range' );
      return index;
    }

    /**
     * Returns the qualitative distance (e.g. 'close')
     * @returns {string}
     * @public
     */
    getQualitativeDistanceRegion() {
      return DISTANCE_STRINGS[ this.getDistanceIndexAndAssert() ];
    }

    /**
     * The qualitative distance relative to another object (e.g. 'very far from')
     * @private
     * @returns {string}
     */
    getQualitativeRelativeDistanceRegion() {
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndexAndAssert() ];
    }

    /**
     * Returns the mapped integer corresponding to the appropriate qualitative distance value. Since distances range from
     * km to pm, subtypes must implement this method.
     *
     * @abstract
     * @param  {number} distance
     * @returns {number} - integer
     */
    getDistanceIndex( distance ) {
      throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
    }

    /**
     * Returns the filled in movable object position label.
     *
     * @param  {string} label
     * @returns {string}
     */
    static getObjectLabelPositionText( label ) {
      return StringUtils.fillIn( objectLabelPositionPatternString, { label: label } );
    }
  }

  return inverseSquareLawCommon.register( 'PositionDescriber', PositionDescriber );
} );