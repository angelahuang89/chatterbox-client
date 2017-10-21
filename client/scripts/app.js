// http://parse.sfs.hackreactor.com/chatterbox/classes/messages// YOUR CODE HERE:
var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
  this.friends = [];
  this.results = 5;

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
    data: 'order=-createdAt&limit=100',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log('w0000t');
      // debugger;
      // window.app.data = data;
      
      App.prototype.createRooms(data.results);
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
  // if (!message.username.includes('<') && !message.text.includes('<')) {
  // if (message.username && message.text) {
    $('#chats').append("<div value=" + "\'" + message.username + "\'" + " class='username'>" + message.username + "</div>");
    $('#chats').append("<div class='text'>" + message.text + "</div>");
  
  $('.username').click(function() {
    // console.log(this.text(message.username))
    var friend = this.value;
    console.log(this.value)
    if (!app.friends.includes(this)) {
      app.friends.push(this); 
      $('#friends').append("<div class='friend'>" + this + "</div>");
    }
  });
};

// works once we pass in the right data
App.prototype.createRooms = function(data) {
  // grab the roomnames, put them in array
  $('#roomSelect').empty();
  var rooms = [];
  data.forEach(message => {
    if (!rooms.includes(message.roomname)) {
      rooms.push(message.roomname);
    }
  });
  console.log(rooms)
  // now have our uniq roomnames
  rooms.forEach(room => app.renderRoom(room));
};

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append($("<option>" + room + "</option>"));
};

// were not using this method right now, not getting into it when we try. 
// ask why 
App.prototype.handleUsernameClick = function() {
  $('.username').click(function() {
    console.log('we in hur')
    if (!app.friends.includes(this)) {
      app.friends.push(this);
    }
  });
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

// App.prototype.refreshChats = function() {
//   setInterval(
//     app.fetch
//   , 500);
// };

var app = new App();

$(document).ready(function() {
  // debugger;
  app.fetch();
  setInterval(function() { 
    app.clearMessages();
    app.fetch(); }, 10000);
  app.handleSubmit();
  app.createRooms();
  app.handleUsernameClick();
  app.refreshChats();
  // setInterval(app.fetch, 1000)();
  // app.send({ username: 'i eat turtles', text: 'i am a turtle', roomname: 'general'})
});



