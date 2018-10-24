// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const Node = require( 'SCENERY/nodes/Node' );

  class ISLCObjectPDOMNode extends Node {

    constructor( model, objecModel, options ) {

      options = _.extends( {

      }, options );

      super( options );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCObjectPDOMNode', ISLCObjectPDOMNode );
} );