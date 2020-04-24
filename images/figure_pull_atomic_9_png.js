/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;