// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main model for a system of two objects that exert forces on each other.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var forceLabCommon = require( 'FORCE_LAB_COMMON/forceLabCommon' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function ForceLabModel() {

  }

  forceLabCommon.register( 'ForceLabModel', ForceLabModel );

  return inherit( Object, ForceLabModel );
} );
