// Copyright 2019-2026, University of Colorado Boulder

/**
 * Panel with reusable style.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../phet-core/js/merge.js';
import Panel from '../../../sun/js/Panel.js';

class ISLCPanel extends Panel {

  /**
   * @param {Node} content
   * @param {Object} [options]
   */
  constructor( content, options ) {

    options = merge( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      backgroundPickable: true // when the rule is behind panels, see https://github.com/phetsims/gravity-force-lab/issues/253
    }, options );

    super( content, options );
  }
}

export default ISLCPanel;
