/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;