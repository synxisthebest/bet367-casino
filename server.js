const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let safePath = req.url.split('?')[0];
  if (safePath === '/') safePath = '/index.html';
  const filePath = path.join(__dirname, safePath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

const os = require('os');
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254')) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
  const lanIp = getLocalIp();
  console.log(`\n  🎰 BET367 ROYALE - LUXURY CASINO LOCAL SERVER`);
  console.log(`  > Local:   http://localhost:${PORT}/`);
  console.log(`  > Network (LAN): http://${lanIp}:${PORT}/\n`);
  console.log(`  Mở điện thoại (cùng kết nối Wi-Fi) và truy cập: http://${lanIp}:${PORT}/\n`);
});

