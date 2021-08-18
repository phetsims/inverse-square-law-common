// Copyright 2021, University of Colorado Boulder

/**
 * Node for a list item in the PDOM. We are trying out removing the semantic information for list items by using
 * a class to remove list item styling with CSS. This seems to change the output with a screen reader
 * for the better. If this is something we want for all list items, this should be moved to common code.
 *
 * @author Jesse Greenberg
 */

import merge from '../../../phet-core/js/merge.js';
// import PDOMSiblingStyle from '../../../scenery/js/accessibility/pdom/PDOMSiblingStyle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';

class PDOMListItemNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // pdom
      tagName: 'li'
    }, options );

    super( options );

    // this.setPDOMClass( PDOMSiblingStyle.LIST_ITEM_CLASS_NAME );
  }
}

inverseSquareLawCommon.register( 'PDOMListItemNode', PDOMListItemNode );
export default PDOMListItemNode;