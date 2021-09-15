const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let base1
let base2
let bridge
let stone
let zombieImg,zombie
let woodImg
let backgroundImg
let axeImg,axe
let stoneImg
let ground

let stones = []


function preload(){

 backgroundImg = loadImage("background.png");
 woodImg = loadImage("wood.png");
 //stoneImg = loadImage("stone.png");
 zombieImg = loadImage("zombie.png");




}


function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  axe = createImg('axe.png');
  axe.position(1080,225);
  axe.size(70,70);
  axe.mouseClicked(chop);

  zombie = createSprite(200,500,50,50);
  zombie.addImage(zombieImg,"zombie")
  zombie.scale = 0.2;
  zombie.velocityX = 10;

  //stone.addImage(stoneImg,"stone")

 // base1 = new Base(100,300,100,100);
  //base2 = new Base(1100,300,100,100);
  ground = new Base(600,600,1000,20)
  
  bridge = new Bridge(20, { x:30, y: 225 });
  jointPoint = new Base(1080, 225, 40, 20,);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(450,300);
    var y = random(-10,100);
    
    var stone = new Stone(x, y, 60, 60); 
    stones.push(stone);
    
  }



  frameRate(80);


}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  //base1.display();
  //base2.display();
  bridge.show();
  ground.display();


  if(zombie.position.x >1000){

  zombie.velocityX = -10

  }

  if(zombie.position.x <200){

    zombie.velocityX = 10
  
    }
 
  for (var stone of stones) {
    stone.display();
  }

  //rectMode(CENTER)

  drawSprites();
}

function chop(){

bridge.break();
jointLink.cut();


}
