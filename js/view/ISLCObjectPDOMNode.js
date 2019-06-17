// Copyright 2018-2019, University of Colorado Boulder

/**
 * Node that creates the PDOM description for the ISLCObject. This Node has no visual output.
 *
 * NOTE: this node should have its labelContent filled in.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Node = require( 'SCENERY/nodes/Node' );

  class ISLCObjectPDOMNode extends Node {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {Object} config
     */
    constructor( model, objectEnum, config ) {

      config = _.extend( {
        object1Label: null, // @required
        object2Label: null, // @required

        // a11y
        labelTagName: 'h3',
        tagName: 'ul'
      }, config );

      assert && assert( config.object2Label && config.object1Label, 'required params must be specified' );

      super( config );

      this.thisObjectLabel = ISLCObjectEnum.isObject1( objectEnum ) ? config.object1Label : config.object2Label;
      this.otherObjectLabel = ISLCObjectEnum.isObject1( objectEnum ) ? config.object2Label : config.object1Label;

      // @protected
      this.forceVectorMagnitudeItemNode = new Node( { tagName: 'li' } );
      this.forceBetweenAndVectorNode = new Node( { tagName: 'li' } );

      this.addChild( this.forceBetweenAndVectorNode );
      this.addChild( this.forceVectorMagnitudeItemNode );

      model.forceValuesProperty.link( showValues => {
        this.forceVectorMagnitudeItemNode.visible = showValues;
      } );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCObjectPDOMNode', ISLCObjectPDOMNode );
} );