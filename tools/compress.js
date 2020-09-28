const hbjs = require('handbrake-js');
 
const options = {
  input: '../src/assets/videos/portfolio/fifa.MOV',
  output: '../src/assets/videos/portfolio/fifa.mp4',
  optimize: true,
  quality: 30
}
hbjs.spawn(options)
  .on('error', console.error)
  .on('output', console.log)