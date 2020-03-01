const hbjs = require('handbrake-js');
 
const options = {
  input: '../src/assets/videos/lab/motionFlow2.mp4',
  output: '../src/assets/videos/lab/compressedx2/motionFlow2.mp4',
  optimize: true,
  quality: 30
}
hbjs.spawn(options)
  .on('error', console.error)
  .on('output', console.log)