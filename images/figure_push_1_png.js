/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;