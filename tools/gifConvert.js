const gify = require('gify');

gify('../src/assets/videos/lab/compressedx2/bubble.mp4', '../src/assets/videos/lab/gif_small/bubble.gif', {
    duration: 5,
    width: 500
}, function(err){
    if (err) throw err;
});