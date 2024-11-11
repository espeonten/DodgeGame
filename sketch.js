//make player move using right and left keys
//create a spawn object function at the end
//call the function
//display a text message for timer at center
//create gamestate variables
//divide game into two states: play and end
//enter code accordingly in those

var player;
var o;
var edges;
var canJump = false;
var score = 0;
var gamestate = "play";
var oGroup;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  edges = createEdgeSprites()
  player = createSprite(20, height - 30, 40, 40)
  player.shapeColor = "blue"

  oGroup = new Group()
}

//runs continuously
function draw() {
  console.log(mouseX, mouseY)
  background("white")
  fill("gray")
  textSize(100)
  text(score, width / 2, height / 2)
  player.collide(edges)
  if(player.isTouching(oGroup)) {
    gamestate = "end"
  }
  if(player.y > height - 100 && player.y < height) {
    canJump = true
  }
  else {
    canJump = false
  }
  if(keyDown("right")) {
    player.x += 10
  }
  else if(keyDown("left")) {
    player.x -= 10
  }
  else if(keyDown("up") && canJump == true) {
    player.y -= 100
  }
  player.y += 10
  if(frameCount % 30 == 0) {
    score += 1
  }
  spawnObstacles()
  drawSprites()
}

function spawnObstacles() {
  if(frameCount % 15 == 0) {
    randomX = Math.round(random(0, width))
    o = createSprite(randomX, -20, 40, 40)
    o.shapeColor = "red"
    o.velocityY += 10
    o.lifetime = (height + 20) / 10
    oGroup.add(o)
  }
}