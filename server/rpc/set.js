var LamassuConfig = require('lamassu-config');

var psql = process.env.DATABASE_URL || 'postgres://lamassu:lamassu@localhost/lamassu';
var config = new LamassuConfig(psql);

exports.actions = function(req, res, ss) {

  req.use('session')

  return {

    price: function(data) {
      config.load(function (err, results) {
        if (err) return res(err);
        results.config.exchanges.settings.commission = data.commission;
        results.config.exchanges.plugins.current.ticker = data.provider;
        config.saveExchangesConfig(results.config, res);
      });
    }, 
    
    wallet: function(data) {
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.wallet = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    }, 

    exchange: function(data){
      config.load(function(err, results) {
        if (err) return callback(err);

        var provider = data.provider;
        var settings = results.config.exchanges.plugins.settings[provider];
        results.config.exchanges.plugins.current.trade = provider;
        Object.keys(data).forEach(function(key) {
          if (key !== 'provider')
            settings[key] = data[key];
        });

        config.saveExchangesConfig(results.config, res);
      });
    }, 

    currency: function(data){

      //data example: {type:'USD'}

      //set the data in the database

      //return the object (with symbol) like we would get from get.currency, example: {type:'USD', symbol:'$'}

    },

    compliance: function(data){


      //set compliance settings

      /*
      example_data = {
        base: {
          limit: 100,
          type: 'drivers_license'
        },
        extended: {
          limit: 400, 
          type: 'smartphone'
        },
        currency: 'USD',
        verification: {
          service: 'idology',
          username: 'default_user'
        }
      }
      */

      //set data in database

      //res new settings

      //res(compliance_settings)

    }

  }

}
