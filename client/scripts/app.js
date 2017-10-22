// http://parse.sfs.hackreactor.com/chatterbox/classes/messages// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  this.friends = [];
  this.results = 5;
  this.currRoom = 'lobby';
  this.rooms = {};
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
      console.log('w0000Child');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function(room = this.currRoom) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=100',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('w0000t');
      $('#roomSelect').on('change', function() {
        this.currRoom = $(this).val();
        console.log($(this).val())
        App.prototype.goToRoom(this.currRoom, data.results);
      });
      
      App.prototype.createRooms(data.results);
      
      data.results.forEach(message => {
        if (app.currRoom === message.roomname) {
          App.prototype.renderMessage.call(this, message);
        }
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

App.prototype.renderMessage = function(message) {
  let username = _.escape(message.username);
  let text = _.escape(message.text);
       
  $('#chats').append("<div value=" + "\'" + username + "\'" + " class='username'>" + username + "</div>");
  $('#chats').append("<div class='text'>" + text + "</div>");
  
  $('.username').click(function() {
    var friend = $(this).text();
    console.log(friend);
    if (!app.friends.includes(friend)) {
      app.friends.push(friend); 
      $('#friends').append("<div class='friend'>" + friend + "</div>");
    }
  });
};

App.prototype.goToRoom = function(roomname, data) {
  app.clearMessages();
  // app.fetch(roomname);
  data.forEach(message => {
    if (message.roomname === roomname) {
      app.renderMessage(message);
    }
  });
};

App.prototype.createRooms = function(data) {
  data.forEach(message => {
    if (!app.rooms.hasOwnProperty(message.roomname)) {
      app.rooms[message.roomname] = message.roomname;
      app.renderRoom(message.roomname);
    }
  });
};

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append($("<option id='room'>" + room + "</option>"));
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
  app.fetch();
  setInterval(function() { 
    app.clearMessages();
    app.fetch(); 
  }, 10000);
  app.handleSubmit();
  app.createRooms();
  app.refreshChats();
});



