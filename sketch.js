var tower,towerImage;
var ghost,ghostImage;
var doorsGroup,door,doorImg;
var climbersGroup,climber,climberImage;
var iblock,iblockGroup;
var gameState="PLAY";
var spookySound;
function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300,600,600);
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  doorsGroup = new Group();
  climbersGroup = new Group();
  iblockGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.4;
  
}
function draw(){
  background(0);
 
 
  if(gameState==="PLAY"){
     if(tower.y>400){
    tower.y = 300;
  }
    spookySound.play();
  spawnDoors();
  
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-3; 
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+3; 
  }
  if(keyDown("SPACE")){
    ghost.velocityY = -5; 
  }
      ghost.velocityY = ghost.velocityY + 0.5;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    if(iblockGroup.isTouching(ghost)||ghost.y>600){
      gameState = "END";
      ghost.destroy();
    }
    drawSprites();
  }
  if(gameState==="END"){
    textSize(50);
    fill("red");
    text("GAME OVER",180,300);
    spookySound.stop();
  }
  
}
function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(200,-50);
    door.addImage("door",doorImg);
    climber = createSprite(200,10);
    climber.addImage("climber",climberImage);
    climber.velocityY = 2;
    iblock = createSprite(200,20);
    iblock.width = climber.width;
    iblock.height = 2;
    iblock.velocityY = 2;
    door.velocityY = 2;
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    iblock.x = door.x;
    door.lifetime = 650;
    climberlifetime = 650;
    iblock.lifetime = 650;
    doorsGroup.add(door);
    climbersGroup.add(climber);  
    iblockGroup.add(iblock);
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
}
