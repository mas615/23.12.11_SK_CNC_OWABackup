// index_https_inmem.js
const https = require('https');
const express = require('express');
const cors = require('cors');
const selfsigned = require('selfsigned');

const app = express();

var allowedOrigin = 'https://dev-admin.cloudz.co.kr';
// CORS 옵션
var corsOptions = {
  origin: allowedOrigin,
  methods: ['GET','POST','OPTIONS'],
  // jQuery가 자동으로 보내는 X-Requested-With 를 허용
  allowedHeaders: ['Content-Type', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204
};

// CORS 미들웨어 (전역)
app.use(cors(corsOptions));

// 간단 라우트
app.get('/', (req, res) => {
  res.send('Hello HTTPS (self-signed, in-memory)!');
});

// payload 예시
app.get('/payload', (req, res) => {
  const js = "console.log('POC: in-memory cert payload'); alert('POC');";
  res.status(200).type('text/javascript').send(js);
});

// 자가서명 인증서 생성 (동기)
const attrs = [{ name: 'commonName', value: 'localhost' }];
const opts = {
  days: 365,
  keySize: 2048,
  algorithm: 'sha256',
  extensions: [{ name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }, { type: 2, value: '127.0.0.1' }] }]
};
const pems = selfsigned.generate(attrs, opts);

// pems.private (key), pems.cert (cert)
const server = https.createServer({
  key: pems.private,
  cert: pems.cert
}, app);

server.listen(3000, () => {
  console.log('HTTPS server (self-signed, in-memory) listening on https://localhost:3000');
});
