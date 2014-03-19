module.exports = Backbone.View.extend({

  className: 'main_price main_wrap',

  initialize: function(){

    var self = this

    self.$el.html(ss.tmpl['main-pairing'].render()).appendTo('.dash .main').addClass('animated fadeInUp')


    self.display_qr();
  },

  clear: function(){

    var self = this

    self.$el.removeClass('animated fadeInUp')
    self.$el.addClass('animatedQuick fadeOutUp')

    setTimeout(function(){

      self.$el.remove()

    }, 500)
  },

  display_qr: function(){
    var self = this

    self.user.get_server_address(function(err, address){
      if (err) return alert('Getting server address failed: ' + err.message)

      self.user.create_pairing_token(function(err_, token){
        if (err_) return alert('Pairing failed: ' + err_.message)

        new QRCode(document.getElementById('qrcode'), JSON.stringify({
          token: token,
          trader: address
        }))
      })
    })
  }

})
