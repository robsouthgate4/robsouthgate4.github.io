const gify = require('gify');

gify('../src/assets/videos/lab/compressed/motionFlow.mp4', '../src/assets/videos/lab/gif_small/motionFlow.gif', {
    duration: 5,
    width: 500
}, function(err){
    if (err) throw err;
});