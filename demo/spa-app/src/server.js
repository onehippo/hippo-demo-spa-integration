const baseUrls = require('./common/env-vars.js').baseUrls;

// create local server
const http = require('http');
const server = http.createServer(function(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
});
server.listen(baseUrls.socketsServer.port, baseUrls.socketsServer.hostname, function(){
  console.log('Listening at', baseUrls.socketsServerUrl);
  serverHasStarted();
});

function serverHasStarted() {
  // create websockets listener in same server
  const io = require('socket.io')(server);
  console.log('socket.io listening');

  // requesthandler for POST requests coming from component re-rendering in BloomReach/Hippo
  server.on('request', function (request, response) {
    // POST requests are fired by the CMS when components or containers are updated
    if (request.method == 'POST') {
      let body = "";
      request.on('data', function (postBody) {
        body = postBody;
      });
      request.on('end', function (test) {
        console.log('Received incoming POST request with url:', request.url);
        console.log('and body:', body.toString());

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('<div>component updated</div>');

        // get reference namespace ID for component
        // this info is passed to React app so it knows which component or container to update
        let compId = request.url.match(/(?:_hn:ref=)(.*)(?:&|$)/);
        if (compId && compId.length > 1) {
          compId = compId[1];
          const data = {
            url: request.url,
            body: body,
            id: compId
          };

          io.emit('update', data);
        }
      });
      // condition for requests starting with socket.io is to prevent websockets polling requests from firing this
    } else if (request.method == 'GET' && !request.url.startsWith('/socket.io')) {
      console.log('Received incoming GET request with url:', request.url);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('<div>component requested</div>');
    }
  });
}