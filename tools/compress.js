const hbjs = require('handbrake-js');
 
const options = {
  input: '../src/assets/videos/portfolio/compressed/tomorrowland.mp4',
  output: '../src/assets/videos/portfolio/compressedx2/tomorrowland.mp4',
  optimize: true,
  quality: 30
}
hbjs.spawn(options)
  .on('error', console.error)
  .on('output', console.log)