/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;