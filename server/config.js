var LamassuConfig = require('lamassu-config');
var psqlUrl = require('./db')
var config = module.exports = new LamassuConfig(psqlUrl);

setInterval(function() {
  config.cleanExpiredPairingTokens(function(err) {
    if (err) console.error('Cleaning expired pairing tokens failed: ' + err.message);
  });
}, 60 * 1000); // Our default TTL is 1 hour so let's check every minute.
