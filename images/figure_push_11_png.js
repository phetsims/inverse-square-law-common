/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;