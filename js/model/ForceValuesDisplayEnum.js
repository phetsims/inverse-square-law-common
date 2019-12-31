// Copyright 2019, University of Colorado Boulder

/**
 * Enumeration for the different display methods for the force values.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );

  return inverseSquareLawCommon.register( 'ForceValuesDisplayEnum', Enumeration.byKeys( [
      'DECIMAL', 'SCIENTIFIC', 'HIDDEN'
    ] )
  );
} );