/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;