const http = require('http');

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Kubernetes!\n');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
