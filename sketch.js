//Create variables here
var dog,dogimg,dogimg1;
var database;
var foodStock,foods;
var lastFed,fedTime;
var bedroom,washroom,garden;
var currentTime;
var gameState;

function preload(){
  dogimg=loadImage("images/dogImg.png");
  dogimg1=loadImage("images/dogImg1.png");
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
  milkimg=loadImage("images/Milk.png");
  livingroom=loadImage("images/Living Room.png");

	//load images here
}

function setup() {
database=firebase.database();
	createCanvas(500,500);

  foodObj=new Food();    
  
foodStock=database.ref('Food');
foodStock.on("value",readStock);
foodStock.set(20);

dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.15;

milkbottle1=createSprite(140,435,10,10);
milkbottle1.addImage(milkimg);
milkbottle1.scale=0.025;

milkbottle2=createSprite(210,280,10,10);
milkbottle2.addImage(milkimg);
milkbottle2.scale=0.025;
milkbottle2.visible=false;

}


function draw() {  
background("yellow");

foodObj.display();

writeStock(foods);

if(foods===0){
  dog.addImage(dogimg1);
  milkbottle2.visible=false;
}
else{
  dog.addImage(dogimg);
  milkbottle2.visible=true;
}



  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();

  });

  if(gameState===1){
    dog.addImage(dogimg1);
    dog.scale=0.175;
    dog.y=250;
  }

  if(gameState===2){
    dog.addImage(dogimg);
    dog.scale=0.175;
    milkbottle2.visible=false;
    dog.y=250;
  }

  var bath=createButton("I want to take bath");
  bath.position(580,125);
  if(bath.mousePressed(function(){
    gameState=3;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkbottle2.visible=false;    
  }

  var sleep=createButton("I am very sleepy");
  sleep.position(710,125);
  if(sleep.mousePressed(function(){
    gameState=4;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===4){
    dog.addImage(bedroom);
    dog.scale=1;
    milkbottle2.visible=false;    
  }

  var play=createButton("Lets PLAY !");
  play.position(500,160);
  if(play.mousePressed(function(){
    gameState=5;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===5){
    dog.addImage(livingroom);
    dog.scale=1;
    milkbottle2.visible=false;    
  }

  var PlayInGarden=createButton("Lets PLAY in park");
  PlayInGarden.position(585,160);
  if(PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/').update({'gameState':gameState});
  }));
  if(gameState===6){
    dog.y=175;
    dog.addImage(garden);
    dog.scale=1;
    milkbottle2.visible=false;    
  }

drawSprites();

textSize(17);
fill("black");
text("Milk bottles remaining:"+foods,170,440);

}

function readStock(data){
foods=data.val();

}

function writeStock(x){
 
  database.ref('/').update({
     Food:x
 })
}

