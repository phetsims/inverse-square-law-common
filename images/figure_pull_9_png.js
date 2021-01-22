/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;