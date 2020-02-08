// Copyright 2019-2020, University of Colorado Boulder

/**
 * Aqua radio buttons with a heading that controls the display type for the force values.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const inverseSquareLawCommon = require( 'INVERSE_SQUARE_LAW_COMMON/inverseSquareLawCommon' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const merge = require( 'PHET_CORE/merge' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );

  // constants
  const decimalNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/decimalNotation' );
  const forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  const hiddenString = require( 'string!INVERSE_SQUARE_LAW_COMMON/hidden' );
  const scientificNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/scientificNotation' );

  // a11y strings
  const forceValuesHelpTextString = ISLCA11yStrings.forceValuesHelpText.value;

  // constants
  const TEXT_TANDEM_NAME = 'labelText';

  class ISLCForceValuesDisplayControl extends VBox {

    /**
     * @param {EnumerationProperty.<ForceValuesDisplayEnum>} forceValuesDisplayProperty
     * @param {Object} [options]
     */
    constructor( forceValuesDisplayProperty, options ) {

      options = merge( {
        align: 'left',
        spacing: 5,
        tandem: Tandem.required
      }, options );

      assert && assert( options.children === undefined, 'sets its own children' );

      const forceValuesGroupTandem = options.tandem.createTandem( 'forceValuesRadioButtonGroup' );

      // create these "throw away" Tandems in order to have the proper nesting inside the radio button group. This is
      // result of two patterns conflicting: dependency injection for content Nodes and lazy Tandem creation by the
      // component.
      const decimalNotationTandem = forceValuesGroupTandem.createTandem( 'decimalNotationRadioButton' );
      const scientificNotationTandem = forceValuesGroupTandem.createTandem( 'scientificNotationRadioButton' );
      const hiddenTandem = forceValuesGroupTandem.createTandem( 'hiddenRadioButton' );
      const radioButtonContent = [
        {
          value: ForceValuesDisplayEnum.DECIMAL,
          node: new Text( decimalNotationString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: decimalNotationTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: decimalNotationTandem.name,
          labelContent: decimalNotationString
        },
        {
          value: ForceValuesDisplayEnum.SCIENTIFIC,
          node: new Text( scientificNotationString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: scientificNotationTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: scientificNotationTandem.name,
          labelContent: scientificNotationString
        },
        {
          value: ForceValuesDisplayEnum.HIDDEN,
          node: new Text( hiddenString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: hiddenTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: hiddenTandem.name,
          labelContent: hiddenString
        }
      ];
      const radioButtonGroup = new VerticalAquaRadioButtonGroup( forceValuesDisplayProperty, radioButtonContent, {
        selectedLineWidth: 4,
        labelTagName: 'h3',
        labelContent: forceValuesString,
        descriptionContent: forceValuesHelpTextString,
        tandem: forceValuesGroupTandem
      } );

      // The ul radio button group is aria-labelledby its label sibling (the h3 "Force Values")
      radioButtonGroup.addAriaLabelledbyAssociation( {
        thisElementName: AccessiblePeer.PRIMARY_SIBLING,
        otherElementName: AccessiblePeer.LABEL_SIBLING,
        otherNode: radioButtonGroup
      } );

      options.children = [
        new Text( forceValuesString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
          font: new PhetFont( { size: 14, weight: 'bold' } ),
          tandem: options.tandem.createTandem( 'forceValuesText' )
        } ) ),
        radioButtonGroup
      ];
      super( options );
    }
  }

  return inverseSquareLawCommon.register( 'ISLCForceValuesDisplayControl', ISLCForceValuesDisplayControl );
} );