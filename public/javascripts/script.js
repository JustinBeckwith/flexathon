var socket = io.connect();

socket.on('error', function(err) {
  console.log("Error!");
  console.log(err);
});

socket.on('connect', function(data) {
  console.log('in connect!');
  socket.emit('join', 'Hello World from client');
});

socket.on('pong', function(data) {
  console.log('getting pong...');
  console.log(data);
  alert('pong');
});

var btn = document.getElementById('ping');
btn.onclick = function() {
  console.log('sending ping...');
  socket.emit('pingading', 'here is a ping');
}

