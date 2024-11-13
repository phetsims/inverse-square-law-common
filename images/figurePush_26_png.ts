/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;