// http://parse.sfs.hackreactor.com/chatterbox/classes/messages// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  this.friends = [];

  // this.init();
};

App.prototype.init = function() {
  this.handleUsernameClick();
  this.handleSubmit();
};

App.prototype.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    // dataType: 'json',
    contentType: 'application/jsonp',
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
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=1000',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('w0000t');
      data.results.forEach(message => {
        App.prototype.renderMessage.call(this, message);
      });
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
  $('.username').click(function() {
    console.log($(this));
    app.friends.push(); //gotta figure out what to push here
  }.bind(this));
};

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append($("<option>" + room + "</option>"));
};

// were not using this method right now, not getting into it when we try. 
// ask why 
App.prototype.handleUsernameClick = function() {
  $('.username').click(function() {
    console.log('we in hur')
    this.friends.push($(this));
  }.bind(this));
};

App.prototype.handleSubmit = function() {
  $('.submit').click(function() {
    var username = window.location.search.split('username')[1].slice(1);
    var text = $('#send').val();
    var message = { 'username': username, 'text': text, 'roomname': null};
    this.send(message);
    // this.renderMessage(message);
    $('#send').val('');
  }.bind(this));
};

var app = new App();

$(document).ready(function() {
  App.prototype.handleSubmit();
  app.handleUsernameClick();
  app.fetch();
  // app.send({ username: 'i eat turtles', text: 'i am a turtle', roomname: 'general'})
});



