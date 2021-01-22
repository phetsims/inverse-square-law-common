/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;