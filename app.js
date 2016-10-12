var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var SSE = require('sse-node');

var app = express();

var server = require('http').createServer(app);  
var io = require('socket.io')(server);
io.set('transports', ['polling']);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/headers', function(req, res) {
  res.end(JSON.stringify(req.headers, null, 4) + "\n\n");
}); 

app.use('/env', (req, res) => {
  res.end(JSON.stringify(process.env, null, 4) + "\n\n");
});

app.use('/sse', (req, res) =>  {
  res.render('sse');
});

app.use('/sse-api', (req, res) => {
  var cnt = 0;
  console.log('in sse-api endpoint');
  res.setHeader('X-Accel-Buffering', 'no');
  var client = SSE(req, res);
  client.send("Hello world from your sse!");
  var handle = setInterval(() => { 
    cnt++;
    client.send('SSE message: ' + cnt);

  }, 10);
  client.onClose(() => {
    if (handle) clearInterval(handle);
    console.log("Bye client!")
  });
});

app.use('/sio', (req, res) => {
  res.render('sio');
});

app.use('/ssl', (req, res) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  console.log('Strict-Transport-Security: ' + res.getHeader('Strict-Transport-Security'));
  res.render('ssl');
})

app.use('/', (req, res) => {
  res.render('index', { title: "Flex"});
});


io.on('connection', (socket) => {  
  console.log('Client connected...');
  socket.on('app', (data) => {
    console.log('received event: app');
    socket.emit('engine');
  });
  socket.on('join', (data) => {
    console.log('received event: join');
    console.log(data);
  });
});

server.listen(process.env.PORT || 3000);

