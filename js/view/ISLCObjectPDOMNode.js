// Copyright 2017-2019, University of Colorado Boulder

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
        labelContent: null, // @required
        tagName: 'ul'
      }, config );

      assert && assert( config.object2Label && config.object1Label, 'required params must be specified' );
      assert && assert( config.labelContent, 'Required param "labelContent" must be specified.' );

      super( config );

      // @private
      this.model = model;
      this.objectModel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? model.object1 : model.object2;
      this.thisObjectLabel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? config.object1Label : config.object2Label;
      this.otherObjectLabel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? config.object2Label : config.object1Label;

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