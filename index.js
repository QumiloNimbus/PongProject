const slider=document.getElementById("slider");
const ball=document.getElementById("ball");
const screen=document.getElementById("screen");
const score=document.getElementById("score");
const restartBtn=document.getElementById("restart");

slider.style.bottom="";
slider.style.left="";

let edge=false;
let scoreCount=0;
let screenTop=screen.offsetTop,
    screenLeft=screen.offsetLeft,
    screenRight=screen.offsetLeft+screen.offsetWidth,
    screenBottom=screen.offsetTop+screen.offsetHeight;


let ballX=100, ballY=5;
let theta=((Math.random()*101).toFixed(0)-50)*Math.PI/180;
console.log(theta);


let ballVelocity=5, ballVelocityX,ballVelocityY;


ballVelocityX=ballVelocity*Math.sin(theta);
ballVelocityY=ballVelocity*Math.cos(theta);

let sliderX=screenLeft+300, sliderY=screenBottom+400;
let sliderVelocityX=0;

ball.style.top=ballY+"px";
ball.style.left=ballX+"px";

document.addEventListener("keydown",sliderMove);

function sliderMove(event){
    if(event.key==="a" && edge===false){
        sliderVelocityX=-10;
        
    }else if(event.key==="d" && edge===false){
        sliderVelocityX=10;
    }

    
}

document.addEventListener("keyup",sliderStop);

function sliderStop(event){
    if(event.key==="a" || event.key==="d"){
        sliderVelocityX=0;
        
    }
    
}

function sliderPhysics(){
    sliderX+=sliderVelocityX;
    slider.style.left=sliderX+'px';
    
    sliderCollision();
}

function ballPhysics(){
    
    ballX+=ballVelocityX;
    ballY+=ballVelocityY;
    ball.style.top=ballY+"px";
    ball.style.left=ballX+"px";
    // console.log(ballX,ballY);
    ballCollision();
}

function ballCollision(){
    

    let ballRight=ball.offsetLeft+ball.offsetWidth;
    let ballBottom=ball.offsetTop+ball.offsetHeight;
    let ballLeft=ball.offsetLeft;
    let ballTop=ball.offsetTop;

    let sliderTop=slider.offsetTop,
        sliderBottom=slider.offsetTop+slider.offsetHeight,
        sliderLeft=slider.offsetLeft,
        sliderRight=slider.offsetLeft+slider.offsetWidth;

    if(ballRight>=screenRight){
        ballVelocityX*=-1;
    }
    if(ballLeft<=screenLeft){
        ballVelocityX*=-1;
    }
    if(ballTop<=screenTop){
        ballVelocityY*=-1;
    }
    if(ballBottom>=screenBottom){
        ballVelocityY*=-1;
        scoreCount="GAME OVER";
    }
    
    if(ballLeft<=sliderRight &&
        ballRight>=sliderLeft &&
        ballTop<=sliderBottom &&
        ballBottom>=sliderTop

    ){
        if(Math.abs(sliderVelocityX)!=0){
            ballVelocityX+=sliderVelocityX/3;
            ballVelocityY=Math.sqrt(Math.abs(Math.pow(ballVelocity,2)-Math.pow(ballVelocityX,2)));
            
        }
        scoreCount++;
        ballVelocityY*=-1;
    }

    if(ballTop<=sliderBottom &&
        ballBottom>=sliderBottom &&
        ballLeft<=sliderRight &&
        ballRight>=sliderLeft
    ){
        if(Math.abs(sliderVelocityX)!=0){
            ballVelocityX+=sliderVelocityX/3;
            ballVelocityY=Math.sqrt(Math.abs(Math.pow(ballVelocity,2)-Math.pow(ballVelocityX,2)));
            console.log(ballVelocityX,ballVelocityY);

        }
        
    }

    if(ballTop<=sliderTop &&
        ballBottom>=sliderBottom 
    ){
        if(ballLeft<=sliderRight && ballRight>=sliderRight){
            ballVelocityX*=-1;
        }else if(ballRight>=sliderLeft && ballLeft<=sliderLeft){
            ballVelocityX*=-1;
        }
        
    }

}

function sliderCollision(){
    let sliderTop=slider.offsetTop,
        sliderBottom=slider.offsetTop+slider.offsetHeight,
        sliderLeft=slider.offsetLeft,
        sliderRight=slider.offsetLeft+slider.offsetWidth;

    if(sliderLeft<=screenLeft){
        edge=true;
        sliderVelocityX*=-1;
        slider.style.left=(screenLeft+30)+'px';
        edge=false;
    }
    if(sliderRight>=screenRight){
        edge=true;
        sliderVelocityX*=-1;
        slider.style.left=(screenRight-slider.offsetWidth-30)+'px';
        edge=false;
    }
}
function mainPhysics(){
    
    sliderPhysics();
    ballPhysics();
    if(sliderVelocityX===0 || sliderVelocityX===-0){
        sliderVelocityX=0;
    }
    
    scoreTrack();
    // console.log(ballX,ballY)
}


let physics=setInterval(mainPhysics,10)

function scoreTrack(){
    if(Number.isInteger(scoreCount)){
        score.innerText=`Score: ${scoreCount}`;
    }else{
        restartBtn.style.display="inline";
        score.innerText=`GAME OVER`
        score.style.color="rgb(241, 100, 100)";
        // screen.style.display="none";
        clearInterval(physics);
    }
    
    
}

restartBtn.addEventListener("click",()=>{
    location.reload();
})
