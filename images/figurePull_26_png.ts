/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;