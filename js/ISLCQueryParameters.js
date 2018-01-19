// Copyright 2017, University of Colorado Boulder

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
    // for the objects
    showGrid: {
      type: 'flag'
    },

    showMockup: { type: 'flag' }
  } );

  inverseSquareLawCommon.register( 'ISLCQueryParameters', ISLCQueryParameters );

  return ISLCQueryParameters;
} );
