// http://parse.sfs.hackreactor.com/chatterbox/classes/messages// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  this.friends = [];
  this.results;

  // this.init();
};

App.prototype.init = function() {
  this.handleUsernameClick();
  this.handleSubmit();
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('w0000t');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('w0000t');
      console.log(data.results.forEach(function(message) {
        App.prototype.renderMessage(message);
      }));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
  // console.log(results);
};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

App.prototype.renderMessage = function(message) {
  $('#chats').append("<div class='username'>" + message.username + "</div>");
  $('#chats').append("<div class='text'>" + message.text + "</div>");
  // $('#chats').append("<div>" "</div>");
};

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append("<div>" + room + "</div>");
};

App.prototype.handleUsernameClick = function() {
  $('.username').click(function() {
    this.friends.push($(this));
  }.bind(this));
};

App.prototype.handleSubmit = function() {
  $('.submit').click(function() {
    var username = window.location.search.split('username')[1].slice(1);
    var text = $('#send').val();
    var message = { 'username': username, 'text': text, 'roomname': null};
    this.renderMessage(message);
    $('#send').val('');
  }.bind(this));
};

var app = new App();

$(document).ready(function() {
  App.prototype.handleUsernameClick();
  App.prototype.handleSubmit();
  app.fetch();
});



