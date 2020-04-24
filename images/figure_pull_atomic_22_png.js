/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;