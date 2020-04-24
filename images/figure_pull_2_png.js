/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;