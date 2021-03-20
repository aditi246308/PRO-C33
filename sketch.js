var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
var divisions, divisionHeight, plinkos, particle, count = 0, gameState = "start";


var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
function setup() {
  createCanvas(1200, 1000);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var d = 0; d <=width; d=d+100) {
    divisions.push(new Divisions(d,height-divisionHeight/2,100,divisionHeight));
 }

  
  for (var i = 75; i <=width; i=i+50) {
    plinkos.push(new Plinko(i,75));
 }

 for (var i = 50; i <=width-10; i=i+50) {
     plinkos.push(new Plinko(i,175));
 }

 for (var i = 75; i <=width; i=i+50) {
     plinkos.push(new Plinko(i,275));
 }

 for (var i = 50; i <=width-10; i=i+50) {
     plinkos.push(new Plinko(i,375));
 }

}

    

    
function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  fill("white");
  textSize(35);
  text("500",5,550);
  text("500",105,550);
  text("500",205,550);

  Engine.update(engine);

  ground.display();

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();  
  }

  
  if(particle!= null){
    particle.display();
    if(particle.body.position.y > 760){
      if(particle.body.position.x > 300){
        score = score+500;
        particle = null;
        if(count >= 5)
          gameState = "end"; 
      }
      else if(particle.body.position.x < 600 && particle.body.position.x > 301){
        score = score+ 100;
        particle = null;
        if(count >= 5)
        gameState = "end"; 
      }

      else if(particle.body.position.x < 900 && particle.body.position.x > 601){
        score = score+200;
        particle = null;
        if(count >= 5)
        gameState = "end"; 
      }
    }
  }

  for(var k = 0; k< divisions.length; k++){
    divisions[k].display();
  }
  

  if(gameState === "end"){
    textSize(90);
    text("GAME OVER",600,500);
  }

}


function mousePressed(){
  if(gameState !== "end"){
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}

