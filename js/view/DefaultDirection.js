// Copyright 2019-2020, University of Colorado Boulder

/**
 * Enumeration for the two default directions that the ISLCObjects and sub components can have in the sim.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Enumeration from '../../../phet-core/js/Enumeration.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

export default inverseSquareLawCommon.register( 'DefaultDirection', Enumeration.byKeys( [
  'LEFT',
  'RIGHT'
] ) );