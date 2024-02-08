window.onload = function(){
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");

    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    var ms = 10;
    var squares = [];
    for (var i = 0; i<ms; i++){
        squares.push({
            x: Math.random()*W,
            y: Math.random()*H,
            s: Math.random()*10,
            l: Math.random()*100
        })
    }

    function drawSquares(){
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        // ctx.strokeStyle = "white";
        ctx.beginPath();
        for(var i = 0; i<ms; i++){
            var s = squares[i];
            ctx.moveTo(s.x, s.y);
            ctx.fillRect(s.x, s.y, s.l, s.l)
            ctx.fill();
        }
        moveSquare();
    }

    function moveSquare(){
        for(var i = 0; i<ms; i++){
            var s = squares[i];
            s.y -= s.s;

            if(s.y+s.l<0){
                squares[i]={
                    x: Math.random()*W,
                    y: H,
                    s: Math.random()*10,
                    l: Math.random()*100
                }
            }
        }
    }

    setInterval(drawSquares, 25);
}