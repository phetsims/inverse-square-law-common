// Copyright 2018, University of Colorado Boulder

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
  const centersExactlyPatternString = ISLCA11yStrings.centersExactlyPattern.value;
  const quantitativeAndQualitativePatternString = ISLCA11yStrings.quantitativeAndQualitativePattern.value;

  const positionMarkPatternString = ISLCA11yStrings.positionMarkPattern.value;
  const positionDistanceFromOtherObjectPatternString = ISLCA11yStrings.positionDistanceFromOtherObjectPattern.value;
  const progressDistanceFromOtherObjectPatternString = ISLCA11yStrings.progressDistanceFromOtherObjectPattern.value;
  const arrivedAtEdgePatternString = ISLCA11yStrings.arrivedAtEdgePattern.value;
  const edgeDistancePatternString = ISLCA11yStrings.edgeDistancePattern.value;
  const closestToOtherObjectPatternString = ISLCA11yStrings.closestToOtherObjectPattern.value;
  const sidePatternString = ISLCA11yStrings.sidePattern.value;
  const distanceAndUnitsPatternString = ISLCA11yStrings.distanceAndUnitsPattern.value;
  const quantitativeDistancePatternString = ISLCA11yStrings.quantitativeDistancePattern.value;
  const distanceFromOtherObjectPatternString = ISLCA11yStrings.distanceFromOtherObjectPattern.value;
  const distanceFromOtherObjectSentencePatternString = ISLCA11yStrings.distanceFromOtherObjectSentencePattern.value;
  const lastStopString = ISLCA11yStrings.lastStop.value;

  const leftString = ISLCA11yStrings.left.value;
  const rightString = ISLCA11yStrings.right.value;
  const extremelyFarFromString = ISLCA11yStrings.extremelyFarFrom.value;
  const veryFarFromString = ISLCA11yStrings.veryFarFrom.value;
  const notSoFarFromString = ISLCA11yStrings.notSoFarFrom.value;
  const notSoCloseToString = ISLCA11yStrings.notSoCloseTo.value;
  const closeToString = ISLCA11yStrings.closeTo.value;
  const veryCloseToString = ISLCA11yStrings.veryCloseTo.value;
  const extremelyCloseToString = ISLCA11yStrings.extremelyCloseTo.value;

  const extremelyFarString = ISLCA11yStrings.extremelyFar.value;
  const veryFarString = ISLCA11yStrings.veryFar.value;
  const notSoFarString = ISLCA11yStrings.notSoFar.value;
  const notSoCloseString = ISLCA11yStrings.notSoClose.value;
  const closeString = ISLCA11yStrings.close.value;
  const veryCloseString = ISLCA11yStrings.veryClose.value;
  const extremelyCloseString = ISLCA11yStrings.extremelyClose.value;
  const closerString = ISLCA11yStrings.closer.value;
  const fartherAwayString = ISLCA11yStrings.fartherAway.value;

  const RELATIVE_DISTANCE_STRINGS = [
    extremelyFarFromString,
    veryFarFromString,
    notSoFarFromString,
    notSoCloseToString,
    closeToString,
    veryCloseToString,
    extremelyCloseToString
  ];

  const DISTANCE_STRINGS = [
    extremelyFarString,
    veryFarString,
    notSoFarString,
    notSoCloseString,
    closeString,
    veryCloseString,
    extremelyCloseString
  ];

  let describer = null;

  class PositionDescriber extends ISLCDescriber {
    constructor( model, object1Label, object2Label, options ) {
      super( model, object1Label, object2Label );

      options = _.extend( {
        unit: unitsMeterString,
        units: unitsMetersString,
        centerOffset: 0,

        // {number} => {number}
        convertDistanceMetric: distance => distance
      }, options );

      this.unit = options.unit;
      this.units = options.units;
      this.centerOffset = options.centerOffset;
      this.pushedObjectEnum = null;
      this.convertDistanceMetric = options.convertDistanceMetric;

      // in meters
      this.distanceBetween = 0;
      this.oldDistanceBetween = 0;
      this.lastMoveCloser = false;

      // @private - Whether or not the masses moved closer last position change. only set when an object is dragging.
      this.movedCloser = false;

      // @protected - to support GFLB which has a "Show distance" checkbox, see https://github.com/phetsims/gravity-force-lab-basics/issues/88
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
     * Returns the string used in the screen summary item displaying position information:
     * '{{object1Label}} and {{object2Label}} are {{qualitativeDistance}} each other, centers exactly {{distance}} {{units}} apart.'
     *
     * @param {boolean} [withoutQuantitative] - whether or not to omit the quantitative clause
     * @returns {string}
     */
    getObjectDistanceSummary( withoutQuantitative ) {
      assert && assert( typeof withoutQuantitative === 'boolean' );
      const distance = this.convertedDistance;
      const { object1Label, object2Label, qualitativeDistance, units } = this;

      const qualitativeClause = StringUtils.fillIn(
        distanceAndValueSummaryPatternString,
        { object1Label: object1Label, object2Label: object2Label, qualitativeDistance: qualitativeDistance }
      );
      const quantitativeClause = StringUtils.fillIn(
        centersExactlyPatternString,
        { distance: distance, units: units }
      );

      return StringUtils.fillIn( quantitativeAndQualitativePatternString, {
          qualitativeClause: qualitativeClause,
          quantitativeClause: withoutQuantitative ? '' : quantitativeClause
        }
      );
    }

    /**
     * @private
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
     * Returns the filled in string '{{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getDistanceFromOtherObjectText( thisObjectEnum ) {
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        distanceFromOtherObjectSentencePatternString
      );
    }

    /**
     * fillIn just the position mark clause of some sentences
     * @param {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getPositionMark( thisObjectEnum ) {
      const position = this.getConvertedPositionFromEnum( thisObjectEnum );
      const unit = this.unit;
      return StringUtils.fillIn( positionMarkPatternString, {
        position: position, unit: unit
      } );
    }

    /**
     * Returns the string filled in string '{{position}} {{unit}} mark, {{distance}} {{units}} from {{otherObjectLabel}}.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getPositionAndDistanceFromOtherObjectText( thisObjectEnum ) {
      const positionMark = this.getPositionMark( thisObjectEnum );
      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        positionDistanceFromOtherObjectPatternString,
        { positionMark: positionMark }
      );
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
     * Special case string for when an object is at an "edge." Here "edge" is defined as either touching
     * a boundary, or touching the other object. This is because in both cases, this object cannot move further in
     * that direction
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getEdgeValueText( thisObjectEnum ) {
      const positionMark = this.getPositionMark( thisObjectEnum );
      const edgePhrase = this.getEdgePhrase( thisObjectEnum );

      return this.getSpherePositionAriaValueText(
        thisObjectEnum,
        closestToOtherObjectPatternString,
        { positionMark: positionMark, edgePhrase: edgePhrase }
      );
    }

    /**
     * Returns the filled in string 'At {{side}} edge, {{distance}} {{units}} away.'
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getArrivedAtEdgeText( thisObjectEnum ) {
      assert && assert( this.objectAtEdge( thisObjectEnum ) );

      const distanceClause = this.useQuantitativeDistance ?

        // quantitative distance
                             StringUtils.fillIn( edgeDistancePatternString, {
                               distanceAndUnits: this.getDistanceAndUnits()
                             } ) :

        // qualitative distance
                             this.getDistanceClause( thisObjectEnum );

      // partially fill in the string with the "side" template var
      return StringUtils.fillIn( arrivedAtEdgePatternString, {
        side: this.getSideFromObjectEnum( thisObjectEnum ),
        distanceClause: distanceClause
      } );
    }

    /**
     * Returns the desired value for the ISLCObjectNodes' aria-valuetext attributes when they receive keyboard focus.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getFocusAriaValueText( thisObjectEnum ) {
      let text = this.getPositionAndDistanceFromOtherObjectText( thisObjectEnum );

      // this covers when the object is at edges, and closest to the other mass
      if ( this.objectAtEdge( thisObjectEnum ) ) {
        text = this.getEdgeValueText( thisObjectEnum );
      }
      return text;
    }

    /**
     * Returns a function used by AccessibleSlider to format its aria-valuetext attribute. Of note is that this function
     * is called AFTER the Slider's position Property has been set. Since, the PositionDescriber links to the PositionProperty
     * prior to the call to initializeAccessibleSlider, we can ensure that PositionDescribers dynamic properties (e.g. distanceBetween )
     * will be accurate when the below function is called.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {Function~inner}
     */
    ariaValueTextCreator( objectEnum ) {

      /**
       * Function passed to initializeAccessibleSlider as an option to format its aria-valuetext attribute when the underlying
       * property is changed via keyboard input.
       *
       * @param  {number} formattedValue - the position of the ISLCObject, trimmed to the appropriate number of decimal places
       * @param  {number} oldValue       - the old position
       * @returns {string}                - the string that will fill the aria-valuetext attribute
       */
      return ( formattedValue, oldValue ) => {
        let newAriaValueText = this.getDistanceFromOtherObjectText( objectEnum );

        if ( this.lastMoveCloser !== this.movedCloser ) {
          newAriaValueText = this.getProgressPositionAndDistanceFromOtherObjectText( objectEnum );
        }

        if ( this.objectAtEdge( objectEnum ) ) {
          newAriaValueText = this.getArrivedAtEdgeText( objectEnum );
        }

        if ( this.objectsClosest() ) {
          newAriaValueText = this.getEdgeValueText( objectEnum );
        }

        return newAriaValueText;
      };
    }

    /**
     * Since ISLCObject.enabledRangeProperty is affected by the other object, this method determines if the object is
     * actually at the edge of the sliding area, not just if you are stuck next to the other mass
     * ( for that see this.objectAtEdge())
     * @param {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    objectAtEdgeIgnoreOtherObject( objectEnum ) {
      return ( this.isObject1( objectEnum ) && this.objectAtMinEdge( objectEnum ) ) ||
             ( this.isObject2( objectEnum ) && this.objectAtMaxEdge( objectEnum ) );

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
    objectAtEdge( objectEnum ) {
      return this.objectAtMinEdge( objectEnum ) || this.objectAtMaxEdge( objectEnum );
    }

    /**
     * Returns true if the model object associated with the passed-in enum is at the left boundary of the sim.
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    objectAtMinEdge( objectEnum ) {
      const object = this.getObjectFromEnum( objectEnum );
      return object.positionProperty.get() === object.enabledRangeProperty.get().min;
    }

    /**
     * Returns true if the model object associated with the passed-in enum is at the left boundary of the sim.
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {boolean}
     */
    objectAtMaxEdge( objectEnum ) {
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
        side: this.getSideFromObjectEnum( objectEnum )
      } );
    }

    /**
     * Return 'left' or 'right' depending on what edge the object is at. Will assert out if object is not at a side.
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getSideFromObjectEnum( objectEnum ) {
      if ( this.objectAtMinEdge( objectEnum ) ) {
        return leftString;
      }
      else if ( this.objectAtMaxEdge( objectEnum ) ) {
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
     * Returns the qualitative distance (e.g. 'close')
     * @returns {string}
     */
    get qualitativeDistance() {
      return DISTANCE_STRINGS[ this.getDistanceIndex( this.distanceBetween ) ];
    }

    /**
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
     * Returns the filled in string '{{label}} position'.
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