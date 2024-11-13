/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;