import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.mjs':  'text/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.txt':  'text/plain; charset=utf-8',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options':  'nosniff',
  'X-Frame-Options':         'SAMEORIGIN',
  'X-XSS-Protection':        '1; mode=block',
  'Referrer-Policy':         'strict-origin-when-cross-origin',
  'Permissions-Policy':      'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://placehold.co https://us-ms.gr-cdn.com https://us-wbe-img2.gr-cdn.com",
    "frame-src https://www.google.com",
    "connect-src 'self'",
    "form-action 'self'",
    "base-uri 'self'",
  ].join('; '),
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  // katalog (ścieżka z końcowym /) -> index.html, jak na Vercel
  else if (urlPath.endsWith('/')) urlPath += 'index.html';

  // Decode URL and resolve to absolute path — prevent path traversal
  let filePath;
  try {
    filePath = path.resolve(__dirname, '.' + decodeURIComponent(urlPath));
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('400 Bad Request');
    return;
  }

  // Block any path that escapes the web root
  if (!filePath.startsWith(path.resolve(__dirname))) {
    res.writeHead(403, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
    res.end('403 Forbidden');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      ...SECURITY_HEADERS,
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/`);
});
