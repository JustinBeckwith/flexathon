var es = new EventSource("/sse-api");
var results = document.getElementById('results');
es.onmessage = function (event) {
  console.log(event.data);
  var content = document.createTextNode(event.data);
  results.appendChild(content);
};