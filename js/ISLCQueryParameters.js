// Copyright 2017-2019, University of Colorado Boulder

/**
 * Query parameters for inverse-square-law-common
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  const ISLCQueryParameters = QueryStringMachine.getAll( {

    // when flagged, shows a grid in the ScreenView that visualizes the possible locations
    // for the objects (kept after code review for future development debugging)
    showGrid: {
      type: 'flag'
    },

    // when flagged, shows the ruler region boundaries for interactive descriptions.
    showRulerRegions: {
      type: 'flag'
    },

    // Shows boundary positions of the two objects, as .  The boundary positions for each
    // object will change depending on the size and position of both objects.
    showDragBounds: { type: 'flag' }
  } );

  inverseSquareLawCommon.register( 'ISLCQueryParameters', ISLCQueryParameters );

  return ISLCQueryParameters;
} );
