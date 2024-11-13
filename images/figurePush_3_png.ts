/* eslint-disable */
/* @formatter:off */

import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;