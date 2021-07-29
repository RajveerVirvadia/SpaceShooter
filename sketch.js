var peacefulBackground , normalBackground , hardBackground ;
var gameState = 1;
var pc , pcImage , pcBulletsImage , pcBullets;
var bulletSound;
var alien1 , alien1Image , alienBullets , alienBullets;
var score = 0;

function preload(){
  peacefulBackground = loadImage("Images/Peaceful.jpg");
  normalBackground = loadImage("Images/Normal.jpg");
  hardBackground = loadImage("Images/Hard.jpg");
  pcImage = loadImage("Images/Player.png");
  pcBulletsImage = loadImage("Images/PlayerBullets.png");
  bulletSound = loadSound("sounds/BulletSound.mp3");
  alien1Image = loadImage("Images/Alien1.png");
  alienBulletsImage = loadImage("Images/AliensLazer.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  pc = createSprite(500,500);
  pc.addImage(pcImage);
  pc.scale = 0.2;

  pcBulletsGroup = new Group();
  alien1Group = new Group();
  alienBulletsGroup = new Group();

  edges = createEdgeSprites();
}

function draw() {
  background(peacefulBackground); 

  fill("yellow");
  textSize(30);
  text("SCORE:"+score,50,50);

  if(keyDown(LEFT_ARROW)){
      pc.x=pc.x-6;
  }
  if(keyDown(RIGHT_ARROW)){
    pc.x=pc.x+6;
}
  if(keyWentDown("space")){
    pcBullets = createSprite(pc.x,pc.y);
    pcBullets.velocityY = -9
    pcBullets.addImage(pcBulletsImage);
    pcBullets.scale = 0.1;
    bulletSound.play();
    
    pcBulletsGroup.add(pcBullets);
  }
  

  aliens();

  if(score>5){
    alien1Group.setVelocityXEach(5);
  }

  if(pcBulletsGroup.isTouching(alien1Group)){
    alien1Group.destroyEach();
    score = score+5;
  }
  if(alienBulletsGroup.isTouching(pc)){
    pc.destroy();
    
  }
  alien1Group.bounce(edges[1]);
  alien1Group.bounce(edges[2]);

  drawSprites();



}
function aliens(){
  if(frameCount%100===0){
    var no = Math.round(random(20,windowWidth-20));
    alien1 = createSprite(no,-10);
    alien1.velocityY = 3;
    alien1.addImage(alien1Image);
    alien1.scale = 0.5;
    var alienBullets = createSprite(alien1.x , alien1.y);
    alienBullets.addImage(alienBulletsImage);
    alienBullets.velocityY = 6;
    alienBullets.scale = 0.1;
    alien1Group.add(alien1);
    alienBulletsGroup.add(alienBullets);

    
    
  }

}