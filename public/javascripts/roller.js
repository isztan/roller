'use strict';

define(['jquery'],
  function($) {

  var rollerList = $('#rollers');

  var generateRoller = function(data) {
    var roller = $('<li><div class="mood" style=""></div><div class="content"></div>' +
      '<p class="meta"></p><div class="actions"><ol><li class="heart"></li></ol></li>');

    roller.find('.mood').attr('style', 'background-image: url(' + data.mood + ')');
    if (data.type === 'image') {
      var img = $('<img src="">');
      img.attr('src', data.message);
      roller.find('.content').html(img);
    } else {
      var msg = $('<span></span>');
      msg.text(data.message);
      roller.find('.content').html(msg);
    }

    var posted = 'Posted by ' + data.author;
    roller.find('.meta').html(posted);

    // TODO: check if already liked and add 'on' to heart


    var actionItem = $('<li class=""></li>');

    if (data.isDeletable) {
      actionItem.addClass('delete');
    } else {
      actionItem.addClass('repost');
    }

    roller.find('.actions ol').append(actionItem);
    rollerList.prepend(roller);
  };

  var self = {
    recent: function() {
      $.ajax({
        url: '/recent',
        type: 'GET',
        dataType: 'json',
        cache: false
      }).done(function(data) {
        var rollers = data.rollers;
        for (var i = 0; i < rollers.length; i ++) {
          generateRoller(rollers[i]);
        }
      });
    },

    add: function(self) {
      $.ajax({
        url: self.attr('action'),
        type: 'POST',
        data: self.serialize(),
        dataType: 'json',
        cache: false
      }).done(function(data) {
        generateRoller(data.roller);
      });
    }
  };

  return self;
});
