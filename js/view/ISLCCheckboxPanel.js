// Copyright 2019, University of Colorado Boulder

/**
 * Panel with a vertical checkbox group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const merge = require( 'PHET_CORE/merge' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VerticalCheckboxGroup = require( 'SUN/VerticalCheckboxGroup' );

  class ISLCCheckboxPanel extends Panel {

    /**
     * @param {Object} checkboxItems - see VerticalCheckboxGroup for doc, note that this Type sets the `node`, and
     *    expects a `label` {string} property that is used to create the Node
     * @param {Object} [options]
     */
    constructor( checkboxItems, options ) {

      options = merge( {

        checkboxGroupOptions: {
          checkboxOptions: {
            spacing: 10,
            padding: 8,
            boxWidth: 16
          }
        },
        fill: '#FDF498',
        xMargin: 10,
        yMargin: 10,
        minWidth: 170,

        // phet-io
        tandem: Tandem.required
      }, options );

      // Given a string as a label, convert it to a Text Node.
      checkboxItems = checkboxItems.map( item => {
        assert && assert( item.tandem );
        item.node = new Text( item.label, {
          tandem: item.tandem.createTandem( 'labelNode' ),
          font: new PhetFont( 14 ),
          maxWidth: 125
        } );
        return item;
      } );

      super( new VerticalCheckboxGroup( checkboxItems, options.checkboxGroupOptions ), options );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCCheckboxPanel', ISLCCheckboxPanel );
} );