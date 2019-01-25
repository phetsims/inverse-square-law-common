// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Node = require( 'SCENERY/nodes/Node' );

  class ISLCObjectPDOMNode extends Node {

    constructor( model, objectEnum, config ) {

      config = _.extend( {
        object1Label: null, // @required
        object2Label: null // @required
      }, config );

      assert && assert( config.object2Label && config.object1Label, 'required params must be specified' );

      const a11yOptions = _.extend( {
        labelTagName: 'h3',
        labelContent: 'default content', // TODO: these should be required at some point. https://github.com/phetsims/inverse-square-law-common/issues/58
        tagName: 'ul'
      }, config.a11yOptions );

      super( a11yOptions );

      this.model = model;
      this.objectModel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? model.object1 : model.object2;
      this.thisObjectLabel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? config.object1Label : config.object2Label;
      this.otherObjectLabel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? config.object2Label : config.object1Label;

      // @public
      this.forceVectorMagnitudeItemNode = new Node( { tagName: 'li' } );
      this.forceBetweenAndVectorNode = new Node( { tagName: 'li' } );

      this.addChild( this.forceBetweenAndVectorNode );
      this.addChild( this.forceVectorMagnitudeItemNode );

      model.forceValuesProperty.link( showValues => {
        this.forceVectorMagnitudeItemNode.visible = showValues;
      } );
    }

    linkToForceProperty( callback ) {
      this.model.forceProperty.link( callback );
    }

    linkToPositionProperty( callback ) {
      this.objectModel.positionProperty.link( callback );
    }

    linkToRadiusPropery( callback ) {
      this.objectModel.radiusProperty.link( callback );
    }

    linkToScientificNotationProperty( callback ) {
      this.model.scientificNotationProperty.link( callback );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCObjectPDOMNode', ISLCObjectPDOMNode );
} );