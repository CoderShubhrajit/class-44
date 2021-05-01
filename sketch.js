var road,roadImg;
var player,plImg,plImg2;
var mud,mudImg;
var npc,img1,img2,img3,img4,img5,img6,img7,img8;
var npcGroup;
var setImg;
var pavement1,pavement2;
var score = 0;
var lifeline = 5;
var visible;
var riddle1,riddle2,riddle3;
var gk1,gk2,gk3;
var equation1,equation2,equation3;

function preload(){
  roadImg = loadImage("images/track.png");
  plImg = loadImage("images/handCart.png");
  mudImg = loadImage("images/mud.png");
  img1 = loadImage("imgs/npc1.png");
  img2 = loadImage("imgs/npc2.png");
  img3 = loadImage("imgs/npc3.png");
  img4 = loadImage("imgs/npc4.png");
  img5 = loadImage("imgs/npc5.png");
  img6 = loadImage("imgs/npc6.png");
  img7 = loadImage("imgs/npc7.png");
  img8 = loadImage("imgs/npc8.png");
}

function setup() {
  createCanvas(800,600);

  npcGroup = createGroup();

  player = createSprite(400,300);
  player.addImage(plImg);
  player.scale = 0.6;

  pavement1 = createSprite(30,-600*3,60,600*7);
  pavement1.visible = true;

  pavement2 = createSprite(770,-600*3,60,600*7);
  pavement2.visible = true;
}

function draw() {
  background("black");

  image(roadImg,0,-600*6,800,600*7);
  camera.y = player.y;
  
  if(keyDown("right")){
    player.x = player.x+2;
  }

  if(keyDown("left")){
    player.x = player.x-2;
  }

  if(keyDown("up")){
    player.y = player.y-2;
    spawnMud();
    spawnNPCs();
  }

  if(keyDown("down")){
    player.y = player.y+2;
  }

  if(npcGroup.isTouching(player)){
    score = score - 20;
    npcGroup.destroyEach();
    lifeline -= 1;
    player.tint(255,255,255);
    if(player.tint > 100){
      player.tint(255,126,19);
    }
    /*player.tint = 255;
    player.tint -= 5;*/
  }

  if(npcGroup.y > player.y){
    score += 5;
  }

  /*if(score >= 100){
    player.addImage()
  }*/

  drawSprites();

  textSize(25);
  fill("White");
  text("Score : "+score,10,player.y -300);
  text("Lifelines : "+lifeline,10,player.y - 200);
}

function spawnMud(){
  if(frameCount % 600 === 0){
    mud = createSprite(random(150,600),player.y - 300);
    mud.addImage(mudImg);
    mud.scale = 0.18;
    mud.y = mud.y + 2;
    mud.depth = player.depth-1; 
  }

  if(frameCount % 400 === 0){
    fill("white");
    text("Mud is approaching, chance to repair it... Solve the quiz !",400,300);
  }
}

function spawnNPCs(){
  if(frameCount % 200 === 0){
    npc = createSprite(random(150,600),player.y - 300);
    npc.velocityY = 2;
    setImg = Math.round(random(1,8));
    switch(setImg){
      case 1 : npc.addImage(img1);
      break;
      case 2 : npc.addImage(img2);
      break;
      case 3 : npc.addImage(img3);
      break;
      case 4 : npc.addImage(img4);
      break;
      case 5 : npc.addImage(img5);
      break;
      case 6 : npc.addImage(img6);
      break;
      case 7 : npc.addImage(img7);
      break;
      case 8 : npc.addImage(img8);
      break;
      default : break;
      }
      npc.scale = 0.8;
      npcGroup.add(npc);
  }
}

/*displayWidth,height changes
create pavement sprites and collide the player
// lessen the random x position of mud and npc cars
mud vanish on math equation, score = score + 25
change image of player if score crosses 100 points
decrease 20 points on giving wrong answer of mud equation
// increase score by 5 if one car passes by the player
// if cars colide with player, lifeline = lifeline - 1;
pass ten cars or solve two mud equations to go to the next level
// power, lifeline*/