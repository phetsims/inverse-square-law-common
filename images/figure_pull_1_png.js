/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;