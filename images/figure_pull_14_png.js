/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;