/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;