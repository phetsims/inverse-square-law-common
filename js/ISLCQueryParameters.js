// Copyright 2017-2018, University of Colorado Boulder

/**
 * Query parameters for inverse-square-law-common
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  var ISLCQueryParameters = QueryStringMachine.getAll( {

    // when flagged, shows a grid in the ScreenView that visualizes the possible locations
    // for the objects (kept after code review for future development debugging)
    showGrid: {
      type: 'flag'
    },

    // Shows boundary positions of the two objects, as .  The boundary positions for each
    // object will change depending on the size and position of both objects.
    showDragBounds: { type: 'flag' },

    stepSize: {
      type: 'number',
      defaultValue: 0.5
    }
  } );

  inverseSquareLawCommon.register( 'ISLCQueryParameters', ISLCQueryParameters );

  return ISLCQueryParameters;
} );
