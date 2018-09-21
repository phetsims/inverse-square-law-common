// Copyright 2017-2018, University of Colorado Boulder

/**
 * Panel with a vertical checkbox group, for display options.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  var Panel = require( 'SUN/Panel' );
  var Tandem = require( 'TANDEM/Tandem' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {ISLCCheckboxItem[]} checkboxItems
   * @param {Object} [options]
   * @constructor
   */
  function ISLCCheckboxPanel( checkboxItems, options ) {

    options = _.extend( {

      // dilation of pointer areas, y dimension is computed
      touchAreaXDilation: 5,
      mouseAreaXDilation: 5,

      // styling
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left',
      spacing: 10,

      // phet-io
      tandem: Tandem.required
    }, options );

    var vBoxOptions = _.pick( options, [ 'spacing', 'align' ] );

    var checkboxGroup = new VBox( vBoxOptions );

    for ( var i = 0; i < checkboxItems.length; i++ ) {

      var item = checkboxItems[ i ];

      // set pointer areas, y dimensions are computed
      var yDilation = options.spacing / 2;
      item.mouseArea = item.localBounds.dilatedXY( options.mouseAreaXDilation, yDilation );
      item.touchArea = item.localBounds.dilatedXY( options.touchAreaXDilation, yDilation );

      checkboxGroup.addChild( item );
    }

    Panel.call( this, checkboxGroup, options );
  }

  inverseSquareLawCommon.register( 'ISLCCheckboxPanel', ISLCCheckboxPanel );

  return inherit( Panel, ISLCCheckboxPanel );
} );