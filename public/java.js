        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        var x = canvas.width/2;
        var y = canvas.height-30;

        var ballRadius = 10;  // 원 테두리
        var dx = 3; // 이동량
        var dy = -3; // 이동량


        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임 제거
            drawBall();    // 함수 호출
            drawPaddle();  // 패들 호출
            drawBricks();  // 블럭 추가
            collisionDetection();
            drawScore();
            x += dx;     // 이동
            y += dy;    // 이동

            if(x + dx > canvas.width-ballRadius || x + dx < ballRadius)  // 좌우 벽팅기기
            {
                dx = -dx;
            }
            if(y + dy < ballRadius) 
            {
                dy = -dy;
            } 
            else if(y + dy > canvas.height-ballRadius) 
            {
                if(x > paddleX && x < paddleX + paddleWidth) 
                {
                    dy = -dy;
                }
                else 
                {
                    alert("게임 종료");
                    document.location.reload();
                }
            }
            
            if(rightPressed && paddleX < canvas.width-paddleWidth)   // 패들 이동속도
            {
                paddleX += 7;
            }
            else if(leftPressed && paddleX > 0) 
            {
                paddleX -= 7;
            }

        } 


        function drawBall() {                     //공 생성 함수
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        ctx.arc(x, y, ballRadius, 0, Math.PI*2);

        var paddleHeight = 10;  // 패들 두께
        var paddleWidth = 90;   // 패들 길이
        var paddleX = (canvas.width-paddleWidth)/2;  // 전체(캔버스) 크기의 반  ( 가운데 )

        function drawPaddle() {    // 패들 추가
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight ,15);
            ctx.fillStyle = "Black";
            ctx.fill();
            ctx.closePath();
        }

        var rightPressed = false;  // 오른쪽키 안눌림 (기본상태 설정)
        var leftPressed = false;   // 왼쪽키 안눌림 (기본상태 설정)

        // 이동 이벤트 추가
        function keyDownHandler(e) {  // 눌럿을때
            if(e.keyCode == 39) {     // 39 오른쪽 커서
                rightPressed = true;
            }
            else if(e.keyCode == 37) { // 37 왼쪽커서
                leftPressed = true;
            }
        }

        function keyUpHandler(e) { // 누르지 않았을때
            if(e.keyCode == 39) {
                rightPressed = false;
            }
            else if(e.keyCode == 37) {
                leftPressed = false;
            }
        }

        var brickRowCount = 5;
        var brickColumnCount = 5;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 20;
        var brickOffsetLeft = 30;

        var bricks = [];
        for(c=0; c<brickColumnCount; c++) 
        {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) 
            {
                var bricks = [];
                for(c=0; c<brickColumnCount; c++) 
                {
                    bricks[c] = [];
                    for(r=0; r<brickRowCount; r++) 
                    {
                        bricks[c][r] = { x: 0, y: 0, status: 1 };
                    }
                }
            }
        }

        function collisionDetection() {             // 충돌 함수
            for(c=0; c<brickColumnCount; c++) {
                for(r=0; r<brickRowCount; r++) {
                    var b = bricks[c][r];
                    if(b.status == 1) 
                    {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) 
                        {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if(score == brickRowCount*brickColumnCount) 
                            {
                                alert("게임 클리어");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }
            
        function drawBricks() {
            for(c=0; c<brickColumnCount; c++) {
                for(r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1) {
                        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "White";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        var score = 0;
        function drawScore() {
            ctx.font = "26px Arial";
            ctx.fillStyle = "gray";
            ctx.fillText("Score: "+score, (canvas.width-paddleWidth)/2, (canvas.height-paddleHeight)/2);
        }

        setInterval(draw, 10);  // setInterval 반복 함수
