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
   * NOTE: We are imagining that the constructor will take args (should be considered further):
   * mode {string} - One of 'MASS' | 'CHARGE', determines whether value1 and value2 are treated like masses or charges
   * value1 {number}
   * value2 {number}
   * position1 {Vector2}
   * position2 {Vector2}
   * options {Object}
   * @constructor
   */
  function ForceLabModel() {
    
    // NOTE: the following documents our game plan for a common ForceLabModel type
    // instantiate Properties that are common to gravity-force-lab, gravity-force-lab-basics, and coulombs-law
    
    // instantiate the objects from value1 and value2
    // if ( mode === ForceLabModes.MASS ) {
    //  this.object1 = new Mass(...)
    //  this.object2 = new Mass(...)
    // }
    // else if ( ... )
    
    // determine force constant, depending on the mode
    // var forceConstant = mode === ForceLabModes.MASS ? G : k;
    
    // derived property that calculates the force based on changes to values and positions
    // this.forceProperty = new DerivedProperty( {
    //  [
    //    this.object1.valueProperty,
    //    this.mass2.valueProperty,
    //    this.object1.positionProperty,
    //    this.mass2.positionProperty
    //  ],
    //    function( v1, v2, x1, x2 ) {
    //      var distance = Math.abs( x2 - x1 );
    //      return forceConstant * v1 * v2 / ( distance * distance );
    //    }
    // } )
  }

  forceLabCommon.register( 'ForceLabModel', ForceLabModel );

  return inherit( Object, ForceLabModel );
} );
