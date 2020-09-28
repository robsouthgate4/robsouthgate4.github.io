const hbjs = require('handbrake-js');
 
const options = {
  input: '../src/assets/videos/lab/swarm.mp4',
  output: '../src/assets/videos/lab/compressed/swarm.mp4',
  optimize: true,
  crop:  [170, 0, 0, 0 ],
  quality: 25,
  width: 720
}
hbjs.spawn(options)
  .on('error', console.error)
  .on('output', console.log)