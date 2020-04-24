/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;