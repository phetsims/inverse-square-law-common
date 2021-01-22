/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;