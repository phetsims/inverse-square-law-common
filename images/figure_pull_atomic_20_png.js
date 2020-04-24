/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;