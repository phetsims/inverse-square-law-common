/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;