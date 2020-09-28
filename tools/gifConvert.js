const gify = require('gify');

gify('../src/assets/videos/portfolio/compressed/fifa.mp4', '../src/assets/videos/portfolio/gif_small/fifa.gif', {
    duration: 10,
    width: 500
}, function(err){
    if (err) throw err;
});