/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;