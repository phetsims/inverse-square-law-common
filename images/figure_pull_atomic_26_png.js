/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;