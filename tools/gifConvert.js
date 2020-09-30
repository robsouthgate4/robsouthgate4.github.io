const gify = require( "gify" );

gify( './swarm.mp4', './out.gif', function(err){
  if (err) throw err;
});