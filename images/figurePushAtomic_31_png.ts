/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;