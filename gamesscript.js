"use strict"


const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.background = "aqua";
const context = canvas.getContext("2d");
canvas.style.backgroundImage = "url('../images/back.png')";
canvas.style.backgroundSize = "cover";
//PLAYER CREATION CLASS

let offset = 0;
let hillset = 0;

let gravity = 0.5;
let key="";

class player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.width = 66;
        this.height = 150;
        this.frames=1;
    }
    draw() {
        
        
        //if(this.velocity.y==0 && this.velocity.x==0  )
            //context.drawImage(playerStandLeftimg,177*this.frames,0,177,400, this.position.x, this.position.y, this.width, this.height);
            
        if(this.velocity.y==0 && this.velocity.x==0)
        {
                if(key=="right")
                    context.drawImage(playerStandRightimg,177*this.frames,0,177,400, this.position.x, this.position.y, this.width, this.height);
                if(key=="left")
                    context.drawImage(playerStandLeftimg,177*this.frames,0,177,400, this.position.x, this.position.y, this.width, this.height);

        }
        if(this.velocity.x>0)
            context.drawImage(playerRunRightimg,340*this.frames,0,340,400, this.position.x, this.position.y, 120, this.height);
        if(this.velocity.x<0)
            context.drawImage(playerRunLeftimg,340*this.frames,0,340,400, this.position.x, this.position.y, 120, this.height);
    
       //context.fillStyle = "red";
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    update() {
this.frames++;
        if(this.frames>24)
        this.frames=1;
        if ((this.position.y + this.height + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;
        }
        else
            this.velocity.y += gravity;



        for (let i = 0; i < platformsArray.length; i++) {
            if ((this.position.x >= platformsArray[i].position.x)
                && (this.position.x <= (platformsArray[i].position.x + platformsArray[i].width))
                && ((this.position.y + this.height+this.velocity.y) >= platformsArray[i].position.y)
                && (this.position.y <= (platformsArray[i].position.y + 1))) {
                this.velocity.y = 0;


            }
        }
        /*if ((this.position.x >= platform1.position.x)
            && (this.position.x <= (platform1.position.x + platform1.width))
            && ((this.position.y + 30) >= platform1.position.y)
            && (this.position.y <= (platform1.position.y + 1))) {
            this.velocity.y = 0;


        }*/

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.draw();
    }

}


let playerStandRightimg = new Image();
playerStandRightimg.src = "../images/spriteStandRight.png";

let playerRunRightimg = new Image();
playerRunRightimg.src = "../images/spriteRunRight.png";

let playerRunLeftimg = new Image();
playerRunLeftimg.src = "../images/spriteRunLeft.png";

let playerStandLeftimg = new Image();
playerStandLeftimg.src = "../images/spriteStandLeft.png";




class platforms {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y };
        this.width = width;
        this.height = height;
    }

    draw() {
        let platformsimg= new Image();
        platformsimg.src = "../images/platform.png";
        context.drawImage(platformsimg, this.position.x, this.position.y, this.width, this.height);
        //context.fillStyle = "blue";
        //context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class hillsImg{

    constructor(x, y) {
        this.position = { x: 0, y: 100};
        
    }

    draw() {
        let hillsimg= new Image();
        hillsimg.src = "../images/hills.png";
        context.drawImage(hillsimg, this.position.x, this.position.y);
    }
} 

let hillsArray = [];
const hills = new hillsImg();
hillsArray.push(hills);


let platformsArray = [];
let platform = new platforms(0, 550, 800, 200);
let platform1 = new platforms(platform.width-1, 550, 800, 200);
//let platform2 = new platforms(600, 600, 100, 20);
//let platform3= new platforms(800, 300, 100, 20)
//let platform4= new platforms(1000, 200, 100, 20);
//let platform5 = new platforms(1400, 600, 100, 20);
//let platform6= new platforms(1600, 400, 100, 20);
//let platform7= new platforms(2000, 500, 100, 20);

platformsArray.push(platform);
platformsArray.push(platform1);
//platformsArray.push(platform2);
//platformsArray.push(platform3);
//platformsArray.push(platform5);
//platformsArray.push(platform4);
//platformsArray.push(platform6);
//platformsArray.push(platform7);
let players = new player();
players.draw();
function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);
 
    for (let i = 0; i < hillsArray.length; i++) {
        hillsArray[i].draw();
    }

    //players.draw();
    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].draw();
    }
    players.update();

}
gameAnimation();

addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {
        key="right";
        players.velocity.x = 5;
        if (players.position.x + players.width >400)

         {   moveOffset(-5);
            moveHills(-5);
           
         }

    } else if (e.key === "ArrowLeft") {
        key="left";
        if(players.position.x>0){
        players.velocity.x = -5;}
        if (players.position.x + players.width >400)

         {   moveOffset(5);
            moveHills(5);
         }


    }
    if (e.key ==="ArrowUp") {
      // if (players.position.y + players.height > canvas.height - 10)
           players.velocity.y = -14;


    }

});

addEventListener("keyup", function (e) {
    if (e.key == "ArrowRight") {
        players.velocity.x = 0;


    } if (e.key == "ArrowLeft") {
        players.velocity.x = 0;


    }

})
    ;

function moveOffset(x) {
    offset += x;
    for (let i = 0; i < platformsArray.length; i++) { platformsArray[i].position.x += x; }
}
moveOffset(-5);
function moveHills(a) {
    hillset += a;
    for (let i = 0; i < hillsArray.length; i++) { hillsArray[i].position.x += a; }
}
moveHills(-5);  