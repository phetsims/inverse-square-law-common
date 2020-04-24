/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;