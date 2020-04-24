/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;