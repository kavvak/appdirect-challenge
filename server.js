var exec = require('child_process').exec;

exec('twitter-proxy');
exec('http-server ./dist -a localhost -p 8000 -c-1');

console.log('Server running on http://localhost:8000');
console.log('twitter API running on http://localhost:7890');
