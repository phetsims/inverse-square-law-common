// Copyright 2019-2021, University of Colorado Boulder

/**
 * Aqua radio buttons with a heading that controls the display type for the force values.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { Text } from '../../../scenery/js/imports.js';
import { VBox } from '../../../scenery/js/imports.js';
import VerticalAquaRadioButtonGroup from '../../../sun/js/VerticalAquaRadioButtonGroup.js';
import Tandem from '../../../tandem/js/Tandem.js';
import inverseSquareLawCommon from '../inverseSquareLawCommon.js';
import inverseSquareLawCommonStrings from '../inverseSquareLawCommonStrings.js';
import ISLCConstants from '../ISLCConstants.js';
import ForceValuesDisplayEnum from '../model/ForceValuesDisplayEnum.js';

// constants
const decimalNotationString = inverseSquareLawCommonStrings.decimalNotation;
const forceValuesString = inverseSquareLawCommonStrings.forceValues;
const hiddenString = inverseSquareLawCommonStrings.hidden;
const scientificNotationString = inverseSquareLawCommonStrings.scientificNotation;
const forceValuesHelpTextString = inverseSquareLawCommonStrings.a11y.forceValuesHelpText;

const TEXT_TANDEM_NAME = 'labelText';

class ISLCForceValuesDisplayControl extends VBox {

  /**
   * @param {EnumerationDeprecatedProperty.<ForceValuesDisplayEnum>} forceValuesDisplayProperty
   * @param {Object} [options]
   */
  constructor( forceValuesDisplayProperty, options ) {

    options = merge( {
      align: 'left',
      spacing: 5,
      preventFit: true, // workaround for minor pixel changes in https://github.com/phetsims/gravity-force-lab/issues/101
      tandem: Tandem.REQUIRED
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
      labelContent: forceValuesString,
      descriptionContent: forceValuesHelpTextString,
      tandem: forceValuesGroupTandem
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

inverseSquareLawCommon.register( 'ISLCForceValuesDisplayControl', ISLCForceValuesDisplayControl );
export default ISLCForceValuesDisplayControl;