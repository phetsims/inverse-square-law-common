// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const Node = require( 'SCENERY/nodes/Node' );

  class ISLCObjectPDOMNode extends Node {

    constructor( model, objectEnum, options ) {

      options = _.extend( {
        // TODO: these should be required at some point. https://github.com/phetsims/inverse-square-law-common/issues/58
        thisObjectLabel: 'this object',
        otherObjectLabel: 'other object'
      }, options );

      const a11yOptions = _.extend( {
        labelTagName: 'h3',
        labelContent: 'default content', // TODO: these should be required at some point. https://github.com/phetsims/inverse-square-law-common/issues/58
        tagName: 'ul'
      }, options.a11yOptions );

      super( a11yOptions );

      this.model = model;
      this.objectModel = objectEnum === ISLCObjectEnum.OBJECT_ONE ? model.object1 : model.object2;
      this.thisObjectLabel = options.thisObjectLabel;
      this.otherObjectLabel = options.otherObjectLabel;

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