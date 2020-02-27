// Copyright 2019, University of Colorado Boulder

/**
 * Enumeration for the different display methods for the force values.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Enumeration from '../../../phet-core/js/Enumeration.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

export default inverseSquareLawCommon.register( 'ForceValuesDisplayEnum', Enumeration.byKeys( [
    'DECIMAL', 'SCIENTIFIC', 'HIDDEN'
  ] )
);