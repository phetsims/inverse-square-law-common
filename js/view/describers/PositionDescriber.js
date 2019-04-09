// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );
  const unitsMeterString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meter' );

  const objectLabelPositionPatternString = ISLCA11yStrings.objectLabelPositionPattern.value; // [object] position
  const distanceAndValueSummaryPatternString = ISLCA11yStrings.distanceAndValueSummaryPattern.value;
  const qualitativeDistanceEachOtherPatternString = ISLCA11yStrings.qualitativeDistanceEachOtherPattern.value;
  const centersExactlyPatternString = ISLCA11yStrings.centersExactlyPattern.value;
  const quantitativeAndQualitativePatternString = ISLCA11yStrings.quantitativeAndQualitativePattern.value;
  const centersOfObjectsDistancePatternString = ISLCA11yStrings.centersOfObjectsDistancePattern.value;

  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const progressDistanceFromOtherObjectPatternString = ISLCA11yStrings.progressDistanceFromOtherObjectPattern.value;
  const sidePatternString = ISLCA11yStrings.sidePattern.value;
  const distanceAndUnitsPatternString = ISLCA11yStrings.distanceAndUnitsPattern.value;
  const quantitativeDistancePatternString = ISLCA11yStrings.quantitativeDistancePattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const distanceFromOtherObjectSentencePatternString = ISLCA11yStrings.distanceFromOtherObjectSentencePattern.value;
  const lastStopString = ISLCA11yStrings.lastStop.value;

  // track landmarks
  const leftSideOfTrackString = ISLCA11yStrings.leftSideOfTrack.value;
  const rightSideOfTrackString = ISLCA11yStrings.rightSideOfTrack.value;
  const lastStopRightString = ISLCA11yStrings.lastStopRight.value;
  const lastStopLeftString = ISLCA11yStrings.lastStopLeft.value;
  const trackEndLeftString = ISLCA11yStrings.trackEndLeft.value;
  const trackEndRightString = ISLCA11yStrings.trackEndRight.value;

  const leftString = ISLCA11yStrings.left.value;
  const rightString = ISLCA11yStrings.right.value;
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

  let describer = null;

  class PositionDescriber extends ISLCDescriber {
    constructor( model, object1Label, object2Label, options ) {
      super( model, object1Label, object2Label );

      options = _.extend( {
        unit: unitsMeterString,
        units: unitsMetersString,
        centerOffset: 0, // {number} the point considered the "center" of the track space

        // {number} => {number}
        convertDistanceMetric: distance => distance
      }, options );

      this.unit = options.unit;
      this.units = options.units;
      this.centerOffset = options.centerOffset;
      this.convertDistanceMetric = options.convertDistanceMetric;

      // @private {number} - in meters, already converted with optional formatting function
      this.distanceBetween = 0;

      // @private - in converted distance
      this.oldDistanceBetween = 0;

      // @public {boolean|null} - previous value of this.movedCloser
      this.lastMoveCloser = false;

      // @private - Whether or not the masses moved closer last position change. only set when an object is dragging.
      // {boolean|null} - null if the user isn't interacting specifically with the objects
      this.movedCloser = false;

      // @protected - Many descriptions use a quantitative form when distance values are showing, and use qualitative
      // descriptions when distance values are hidden. Furthermore some descriptions in the REGULAR version are
      // "simplified" from quantitative to qualitative forms in the BASICS version.
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
        qualitativeDistance: this.qualitativeRelativeDistance()
      } );
    }

    /**
     * Returns the string used in the screen summary item displaying position/distance information:
     * '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{units}} apart.'
     * GFLB can toggle if distance is showing, and so additional logic is added here to support removing the quantitative
     * "centers exactly" suffix.
     * @returns {string}
     */
    getObjectDistanceSummary() {
      const distance = this.convertedDistance;
      const { object1Label, object2Label, units } = this;

      const qualitativeDistanceClause = StringUtils.fillIn(
        distanceAndValueSummaryPatternString,
        {
          object1Label: object1Label,
          object2Label: object2Label,
          qualitativeDistanceFromEachOther: this.getQualitativeDistanceFromEachOther()
        }
      );
      const quantitativeDistanceClause = StringUtils.fillIn(
        centersExactlyPatternString,
        { distance: distance, units: units }
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
      const distance = this.convertedDistance;
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
     */
    getDistanceClause( thisObjectEnum ) {
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );

      const distanceClause = this.useQuantitativeDistance ?
                             this.getQuantitativeDistanceClause() :
                             this.qualitativeRelativeDistance();

      return StringUtils.fillIn( distanceFromOtherObjectPatternString, {
        distance: distanceClause,
        otherObjectLabel: otherObjectLabel
      } );
    }

    /**
     * Helper function for dynamically creating the desired strings to set the aria-valuetext property for the desired
     * HTML objects.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @param  {string}  pattern
     * @param  {object}  [additionalFillObject]
     * @param  {boolean}  [fillInDistanceDirectly] - when true, the provided pattern will be used as the pattern for
     *                                               filling in the distance clause too.
     * @returns {string}
     * @private
     */
    getSpherePositionAriaValueText( thisObjectEnum, pattern, additionalFillObject, fillInDistanceDirectly ) {

      const fillObject = _.extend( {
        distanceFromOtherObject: this.getDistanceClause( thisObjectEnum )
      }, additionalFillObject );

      return StringUtils.fillIn( pattern, fillObject );
    }

    /**
     * Map object positions to landmarks. This is not a traditional linear/numeric mapping
     * but instead it is based on the two objects and if they are touching each other or the edges.
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getPositionLandmark( objectEnum ) {

      // object 1 touching left
      if ( this.object1AtMin( objectEnum ) ) {
        return trackEndLeftString;
      }

      // object 2 touching right
      else if ( this.object2AtMax( objectEnum ) ) {
        return trackEndRightString;
      }

      // objects touching each other
      else if ( this.objectTouchingBoundary( objectEnum ) ) {
        return this.isObject1( objectEnum ) ? lastStopRightString : lastStopLeftString;
      }

      // objects not touching any boundary, based on the side relative to the center
      else {
        const object = this.getObjectFromEnum( objectEnum );

        // TODO: why does centerOffset not work as expected here?
        return object.positionProperty.get() < 0 ? leftSideOfTrackString : rightSideOfTrackString;
      }
    }

    /**
     * Returns the filled in string '{{progress}}, {{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getProgressPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const progress = this.movedCloser ? closerString : fartherAwayString;
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        progressDistanceFromOtherObjectPatternString,
        { progress: progress }
      );
    }

    /**
     * The aria-value text when
     * Returns the desired value for the ISLCObjectNodes' aria-valuetext attributes when they receive keyboard focus.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getFocusAriaValueText( thisObjectEnum ) {
      const positionMark = this.getPositionLandmark( thisObjectEnum );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        positionDistanceFromOtherObjectPatternString,
        { positionLandmark: positionMark }
      );
    }

    /**
     * Returns a function used by AccessibleSlider to format its aria-valuetext attribute. Of note is that this function
     * is called AFTER the Slider's position Property has been set. Since, the PositionDescriber links to the PositionProperty
     * prior to the call to initializeAccessibleSlider, we can ensure that PositionDescribers dynamic properties (e.g. distanceBetween )
     * will be accurate when the below function is called.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {Function}
     */
    ariaValueTextCreator( objectEnum ) {

      // keep track of the previous value text
      let previousText = '';

      return () => {

        // "normally" should just be short distance
        let newAriaValueText = this.getSpherePositionAriaValueText( objectEnum, distanceFromOtherObjectSentencePatternString );

        // closer/farther text
        if ( this.lastMoveCloser !== this.movedCloser ) {
          newAriaValueText = this.getProgressPositionAndDistanceFromOtherObjectText( objectEnum );
        }

        // border/edge cases use the same as on focus value text
        if ( this.objectsClosest() || this.objectAtEdgeIgnoreOtherObject( objectEnum ) ) {
          newAriaValueText = this.getFocusAriaValueText( objectEnum );
        }

        // When distance isn't checked, the qualitative alerts are the same between region changes, so add a space such
        // that the AT will still read the value text each time. See https://github.com/phetsims/gravity-force-lab-basics/issues/113#issuecomment-481413715
        if ( !this.model.showDistanceProperty.get() && previousText === newAriaValueText ) {
          newAriaValueText = newAriaValueText + ' ';
        }

        previousText = newAriaValueText;
        return newAriaValueText;
      };
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    object1AtMin( objectEnum ) {
      return this.isObject1( objectEnum ) && this.objectAtTouchingMin( objectEnum );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    object2AtMax( objectEnum ) {
      return this.isObject2( objectEnum ) && this.objectAtTouchingMax( objectEnum );
    }


    /**
     * Since ISLCObject.enabledRangeProperty is affected by the other object, this method determines if the object is
     * actually at the edge of the sliding area, not just if you are stuck next to the other mass
     * ( for that see this.objectAtEdge())
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    objectAtEdgeIgnoreOtherObject( objectEnum ) {
      return this.object1AtMin( objectEnum ) || this.object2AtMax( objectEnum );

    }

    /**
     * Returns true if the model object associated with the passed-in enum is at the left/right boundary of the object's
     * available movement. This means that if a mass can't move left anymore because it is up against
     * a mass on that side, then this function will return true. To figure out if a mass is at the complete
     * edge of the slider range, see this.objectAtEdgeIgnoreOtherObject().
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    objectTouchingBoundary( objectEnum ) {
      return this.objectAtTouchingMin( objectEnum ) || this.objectAtTouchingMax( objectEnum );
    }

    /**
     * Returns true if the model object associated with the passed-in enum is at the left boundary of its currently
     * enabled range. Note that when the objects are touching, their enabledRanges will be limited by the other object.
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {boolean}
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
     */
    objectAtTouchingMax( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      return object.positionProperty.get() === object.enabledRangeProperty.get().max;
    }

    /**
     * returns something like "left edge" or "right edge"
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getSideAndEdge( objectEnum ) {
      return StringUtils.fillIn( sidePatternString, {
        side: this.getEdgeFromObjectEnum( objectEnum )
      } );
    }

    /**
     * Return 'left' or 'right' depending on what edge the object is at. Will assert out if object is not at a side.
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getEdgeFromObjectEnum( objectEnum ) {
      if ( this.objectAtTouchingMin( objectEnum ) && this.isObject1( objectEnum ) ) {
        return leftString;
      }
      else if ( this.objectAtTouchingMax( objectEnum ) && this.isObject2( objectEnum ) ) {
        return rightString;
      }
      else {
        assert && assert( false, 'objectEnum not at edge' );
      }
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getEdgePhrase( objectEnum ) {
      let edgeClause = null;

      if ( this.objectAtEdgeIgnoreOtherObject( objectEnum ) ) {
        edgeClause = this.getSideAndEdge( objectEnum );
      }
      else if ( this.objectsClosest() ) {
        edgeClause = lastStopString;
      }

      assert && assert( edgeClause, 'why is this called if not at a border' );
      return edgeClause;
    }

    /**
     * Returns true only if the objects are the minimum possible width apart given their current radii.
     *
     * @returns {boolean}
     */
    objectsClosest() {
      return this.distanceBetween === this.convertDistanceMetric( this.model.getSumRadiusWithSeparation() );
    }

    /***********************
     * Getters and setters *
     ***********************/

    /**
     * Returns the distance between the objects with the user-defined conversion applied.
     * @returns {string}
     */
    get convertedDistance() {
      return this.distanceBetween;
    }

    /**
     * TODO: rename to `qualitativeDistanceString`
     * Returns the qualitative distance (e.g. 'close')
     * @returns {string}
     */
    get qualitativeDistance() {
      return DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    /**
     * TODO: rename to `qualitativeRelativeDistanceString` and make a getter
     * The qualitative distance relative to another object (e.g. 'very far from')
     *
     * @returns {string}
     */
    qualitativeRelativeDistance() {
      return RELATIVE_DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    /**
     * Returns the adjusted position of the passed object. Conversion function and offset are determined by PositionDescriber
     * constructor options.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {number}
     */
    getConvertedPositionFromEnum( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      return this.convertDistanceMetric( object.positionProperty.get() + this.centerOffset );
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

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {ForceDescriber}
     */
    static getDescriber() {
      assert && assert( describer, 'describer has not yet been initialized' );
      return describer;
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( subtype ) {
      assert && assert( subtype, 'cannot initialize ForceDescriber without a subtype' );
      describer = subtype;
      return describer;
    }

    /**
     * Returns the mapped integer corresponding to the appropriate qualitative distance value. Since distances range from
     * km to pm, subtypes must implement this method.
     *
     * @abstract
     * @param  {Number} distance
     * @returns {Integer}
     */
    getDistanceIndex( distance ) {
      // TODO: uncomment and implement in Coulomb's Law
      // NOTE: as of 1/10/19, this only hits when using keyboard to move a ChargeNode when it's at its left/right boundary
      // throw new Error( 'getDistanceIndex MUST be implemented in subtypes.' );
    }
  }

  return inverseSquareLawCommon.register( 'PositionDescriber', PositionDescriber );
} );