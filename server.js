var http = require('http');
    fs = require('fs');
    ejs = require('ejs');
var settings = require('./settings');
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/hello.ejs', 'utf-8');
var n = 0;

server.on('request', function(req, res) {
  n++;
  var data = ejs.render(template, {
      title: "Hello",
      content: "<strong>World!</strong>",
      n: n
  });
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(data);
  res.end();

  // fs.readFile(__dirname + '/public_html/hello.html', 'utf-8', function(err, data) {
  //   if (err) {
  //     res.writeHead(404, { 'Content-Type': 'text/plain' });
  //     res.write('not found!');
  //     return res.end();
  //   }
  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.write(data);
  //   res.end();
  // });

  // switch(req.url) {
  //   case '/about':
  //     msg = 'about this page';
  //     break;
  //   case '/profile':
  //     msg = 'about me';
  //     break;
  //   default:
  //     msg = 'wrong page';
  //     break;
  // }
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('hello from ' + req.url + "\n");
  // res.write(msg);
  // res.end();
});
server.listen(settings.port, settings.host);
console.log('server listening ...');
