let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Cargar imagenes
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// Algunas variables
let gap = 85;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

// Archivos de audio
let fly = new Audio();
let scor = new Audio();
let oof = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
oof.src = "sounds/oof.mp3"

// Añadiendo click para saltar
document.addEventListener("click",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// Coordenadas de la tuberia
let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// Dibujando imagenes
function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(let i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // Dectectar colisión
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            oof.play();
            setTimeout(function(){location.reload()}, 700); // recargar pagina
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























