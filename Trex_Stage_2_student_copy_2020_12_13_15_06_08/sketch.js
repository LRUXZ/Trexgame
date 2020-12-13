var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudimage,cloudsGroup
var obstacle,o1,o2,o3,o4,o5,o6, obstaclesGroup
var gameOver,gameOverImage
var restart,restartImage
var score
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  score=0
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
gameOver = createSprite(200,100);
restart = createSprite(200,140);
gameOver.addImage (gameOverImage);
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background("grey");
  
  text("Score: "+ score, 250, 100);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(frameRate()/60);
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 155){
      trex.velocityY = -12 ;
     
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided)
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
function spawnClouds (){
  if(frameCount%60===0){
     cloud=createSprite(600,80,40,10)
    cloud.y=random(70,150)
    cloud.velocityX=-3
    cloud.addImage(cloudimage)
    cloud.scale=0.5
    cloud.lifetime=200
    trex.depth=cloud.depth
    cloudsGroup.add(cloud)
    trex.depth=trex.depth+1
     }
}
function spawnObstacles (){
  if(frameCount%60===0){
     obstacle=createSprite(600,175,10,40)
    
    obstacle.velocityX=-6
    
    obstacle.scale=0.5
    obstacle.lifetime=100
    var r=Math.round(random(1,6))
    switch (r){
      case 1:obstacle.addImage(o1);
        break;
        case 2:obstacle.addImage(o2);
        break;
        case 3:obstacle.addImage(o3);
        break;
        case 4:obstacle.addImage(o4);
        break;
        case 5:obstacle.addImage(o5);
        break;
        case 6:obstacle.addImage(o6);
        break;
        default: break 
        
   
    }
        obstaclesGroup.add(obstacle)
     }
}