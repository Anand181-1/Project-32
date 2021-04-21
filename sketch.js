const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,ball,ground;
var stand1,stand2;
var ball;
var slingShot;
var polygon_img, cup1, cup2, backgroundImage, lost;
var score = 0;
var attempt = 0;
var gameState = "1";
var gamestate = "start";

function preload(){
  polygon_img = loadImage("polygon.png");
  backgroundImage = loadImage("SP.jpg");
  lost = loadImage("Lose.jpeg");
}

function setup() {
  createCanvas(900,400);

  engine = Engine.create();
  world = engine.world;
  
  Engine.run(engine);
  
  ground = new Ground();
  stand1 = new Stand(390,300,250,10);
  stand2 = new Stand(700,200,200,10);
 
  remake();

  //ball holder with slings
  ball = Bodies.circle(50,200,20);
  World.add(world,ball);

  slingShot = new Slingshot(ball,{x:115,y:200});

  cup1 = new Cup(0, 0);
  cup2 = new Cup(0, 0);
}
 function draw() {
  Engine.update(engine);

  if (gameState === "1") {
    if (gamestate === "start") {

      background(backgroundImage);
      textSize(20);
      fill("lime");
      text("You are a soldier who has to destroy 3 bases of the terrorist to protect the country.", 70, 30);
      text("Drag the Hexagonal Stone and Release it to launch. Press space for the second chance.", 50, 60);
      text("You have to destroy them in the given moves.", 247, 90);
      fill("cyan");
      text("Press space to continue", 680, 390);
      noFill();

    }
     if (gamestate === "play") {
    
      background(56,44,44);
      fill("white");
      textSize(18);
      text("Score: " + score, 25, 25);
      text("Attempts= " + attempt + "/5", 755, 25)
      noFill();
  
      ground.display();
      stand1.display();
      stand2.display();
      strokeWeight(2);
      stroke(15);

      //first tower
      fill("skyblue");
      block1.display();
      block2.display();
      block3.display();
      block4.display();
      block5.display();
      block6.display();
      block7.display();
    
      fill("pink");
      block8.display();
      block9.display();
      block10.display();
      block11.display();
      block12.display();
    
      fill("turquoise");
      block13.display();
      block14.display();
      block15.display();

      fill("grey");
      block16.display();
    
      //second tower
      fill("skyblue");
      blocks1.display();
      blocks2.display();
      blocks3.display();
      blocks4.display();
      blocks5.display();
    
      fill("turquoise");
      blocks6.display();
      blocks7.display();
      blocks8.display();
    
      fill("pink")
      blocks9.display();
    
      fill("gold");
      imageMode(CENTER)
      image(polygon_img ,ball.position.x,ball.position.y,40,40);
      noFill();
      noStroke();
      stroke("white");
      strokeWeight(1);

      // first tower
      block1.score();
      block2.score();
      block3.score();
      block4.score();
      block5.score();
      block6.score();
      block7.score();
      block8.score();
      block9.score();
      block10.score();
      block11.score();
      block12.score();
      block13.score();
      block14.score();
      block15.score();
      block16.score();

      // second tower
      blocks1.score();
      blocks2.score();
      blocks3.score();
      blocks4.score();
      blocks5.score();
      blocks6.score();
      blocks7.score();
      blocks8.score();
      blocks9.score();

      slingShot.display();

      if (score === 500) {
        gamestate = "end1";
      }
      if (attempt >= 5) {
        if (ball.speed < 1) {
          if (frameCount%250 === 0){
            if (block1.visibility !== 255 || block2.visibility !== 255 || block3.visibility !== 255 || block4.visibility !== 255 || block5.visibility !== 255 || block6.visibility !== 255 || block7.visibility !== 255 || block8.visibility !== 255 || block9.visibility !== 255 || block10.visibility !== 255 || block11.visibility !== 255 || block12.visibility !== 255 || block13.visibility !== 255 || block14.visibility !== 255 || block15.visibility !== 255 || block16.visibility !== 255 || blocks1.visibility !== 255 || blocks2.visibility !== 255 || blocks3.visibility !== 255 || blocks4.visibility !== 255 || blocks5.visibility !== 255 || blocks6.visibility !== 255 || blocks7.visibility !== 255 || blocks8.visibility !== 255 || blocks9.visibility !== 255) {
              gamestate = "end2";
            }
          }
        }
      }
    }else if (gamestate === "end1") {
      background("green");
      Matter.Body.setPosition(cup1.body, {x:150, y:200});
      Matter.Body.setPosition(cup2.body, {x:750, y:200})
      textSize(24);
      fill("red");
      text("The First Base is Yours", 320, 200);
      textSize(24);
      text("Score: " + score, 390, 235);
      textSize(16);
      text("The Second Base and the Third Base would", 295, 350);
      text("be made in the second part of the game.", 310, 370);
      cup1.display();
      cup2.display();
    }else if(gamestate === "end2") {
      background(lost);
      fill("white");
      textSize(20);
      text("Press right arrow to restart", 280, 50);
      noFill();
    }
  }
}

  function mouseDragged(){
    if (slingShot.sling.bodyA !== null && mouseX < 300 && attempt !== 5) {
      Matter.Body.setPosition(ball,{x:mouseX,y:mouseY});
    }
  }

  function mouseReleased(){
    if(mouseX < 300) {
      slingShot.fly();
      attempt++;
    }
  }

  function keyPressed () {
    if (keyCode === 32) {
      if (gamestate === "start"){
        attempt = 0;
         remake();
        gamestate = "play";
        score = 0;

      }

      if (gamestate === "play"){
        Matter.Body.setPosition(ball, {x:115, y:200});
        slingShot.attach(ball);
        

      }
    }

    if (keyCode === RIGHT_ARROW) {

      if (gamestate === "end2") {
        gameState = "1";
        gamestate = "start";
        destroy();
      }

      if (gamestate === "end1") {
        gameState = "2";
        gamestate = "start";
      }
    }
  }

  function destroy(){
    World.remove(world, block1);
    World.remove(world, block2);
    World.remove(world, block3);
    World.remove(world, block4);
    World.remove(world, block5);
    World.remove(world, block6);
    World.remove(world, block7);
    World.remove(world, block8);
    World.remove(world, block9);
    World.remove(world, block10);
    World.remove(world, block11);
    World.remove(world, block12);
    World.remove(world, block13);
    World.remove(world, block14);
    World.remove(world, block15);
    World.remove(world, block16);
    World.remove(world, blocks1);
    World.remove(world, blocks2);
    World.remove(world, blocks3);
    World.remove(world, blocks4);
    World.remove(world, blocks5);
    World.remove(world, blocks6);
    World.remove(world, blocks7);
    World.remove(world, blocks8);
    World.remove(world, blocks9);


  }

  function remake() {
     //level one
  block1 = new Block(300,275,30,40);
  block2 = new Block(330,275,30,40);
  block3 = new Block(360,275,30,40);
  block4 = new Block(390,275,30,40);
  block5 = new Block(420,275,30,40);
  block6 = new Block(450,275,30,40);
  block7 = new Block(480,275,30,40);
  
  //level two
  block8 = new Block(330,235,30,40);
  block9 = new Block(360,235,30,40);
  block10 = new Block(390,235,30,40);
  block11 = new Block(420,235,30,40);
  block12 = new Block(450,235,30,40);
  
  //level three
  block13 = new Block(360,195,30,40);
  block14 = new Block(390,195,30,40);
  block15 = new Block(420,195,30,40);
  
  //top
  block16 = new Block(390,155,30,40);

  //level one
  blocks1 = new Block(640,175,30,40);
  blocks2 = new Block(670,175,30,40);
  blocks3 = new Block(700,175,30,40);
  blocks4 = new Block(730,175,30,40);
  blocks5 = new Block(760,175,30,40);
  
  //level two
  blocks6 = new Block(670,135,30,40);
  blocks7 = new Block(700,135,30,40);
  blocks8 = new Block(730,135,30,40);
  
  //top
  blocks9 = new Block(700,95,30,40);
   }