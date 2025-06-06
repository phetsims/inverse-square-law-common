/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;