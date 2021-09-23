var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle=null;
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;

var turn=0;

var midX;
var gameState="play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));


   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }



    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,20);
  text("Turn taken/5 : "+turn,20,40);
  Engine.update(engine);

  if(turn>=5 && particle===null){
    gameState="end";
  }

  if(gameState==="end"){
    
    textSize(30);
    fill("purple");
    text("GAME OVER",200,200);
  }
 
  //for displaying plinkos
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }


   //for displaying particle
     if(particle!=null){
      particle.display();
        if(particle.body.position.y>=divisionHeight+140){
          var posX=particle.body.position.x;
          if(posX<=320){
              score=score+500;
          }else if(posX>320 && posX<=480){
              score=score+100;
          }else if(posX>480){
              score=score+200;
          }
         
          particle=null;
        }
     }

   

   
   //for diplaying divisions
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();     
    

     //start:to display the score card for each division
     midX=divisions[k].body.position.x +20;
     if(midX<=280){
      text(500,midX,height-divisionHeight/2-50);
     }else if(midX>280 && midX<=440){
      text(100,midX,height-divisionHeight/2-50);
     }else {
      text(200,midX,height-divisionHeight/2-50);
     }
     //end:to display the score card for each division

     
   }

   stroke("yellow");
   line (0,divisionHeight+140,width,divisionHeight+140);



}

function mousePressed(){
    //create particles at poistion of mouseX
    if(turn<5){
      turn=turn+1;
      particle=new Particle(mouseX, 10,10);
      text(mouseX+","+mouseY,mouseX,mouseY)
    }

  
  
}