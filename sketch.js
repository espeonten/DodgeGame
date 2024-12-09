var player, player2, player3, player4, player5, player6, player7, player8;
var o;
var restart;
var jSound;
var edges;
var canJump = false;
var movement = false, movement1 = false, movement2 = false;
var score = 0;
var gamestate = "play";
var oGroup;

function preload() {
  jSound = loadSound("jump.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");

  edges = createEdgeSprites()
  createPlayers()

  restart = createSprite(20, 0, 10000, 10000)
  restart.shapeColor = rgb(0, 0, 0, 0.00001)
  
  oGroup = new Group()
}

//runs continuously
function draw() {
  console.log(mouseX, mouseY)
  background("white")
  fill("gray")
  textSize(100)
  text(score, width / 2, height / 2)
  if(gamestate == "play") {
    collidePlayers()
    player.velocityY += 0.2
    player2.velocityY += 0.2
    player3.velocityY += 0.2
    player4.velocityY += 0.2
    player5.velocityY += 0.2
    player6.velocityY += 0.2
    player7.velocityY += 0.2
    player8.velocityY += 0.2
    if(player.isTouching(oGroup)) {
      gamestate = "end"
    }
    if(frameCount % 30 == 0) {
      score += 1
    }
    if(player.y > height - 100 && player.y < height) {
      canJump = true
    }
    else {
      canJump = false
    }
    if(keyDown("right")) {
      movement = true
      player.x += 15
      player2.x = player.x - 10
      player3.x = player.x - 14
      player4.x = player.x - 18
      player5.x = player.x - 22
      player6.x = player.x - 26
      player7.x = player.x - 30
      player8.x = player.x - 34
    }
    else {
      movement = false
    }
    if(movement == false) {
      player2.x = player.x
      player3.x = player.x
      player4.x = player.x
      player5.x = player.x
      player6.x = player.x
      player7.x = player.x
      player8.x = player.x
    }
    if(keyDown("left")) {
      player.x -= 15
      player2.x = player.x + 10
      player3.x = player.x + 14
      player4.x = player.x + 18
      player5.x = player.x + 22
      player6.x = player.x + 26
      player7.x = player.x + 30
      player8.x = player.x + 34
    }
    if(keyDown("up") && canJump == true) {
      jSound.play()
      player.y -= 200
      player2.y = player.y - 10
      player3.y = player.y - 14
      player4.y = player.y - 18
      player5.y = player.y - 22
      player6.y = player.y - 26
      player7.y = player.y - 30
      player8.y = player.y - 34
    }
    spawnObstacles()
  }
  if(gamestate == "end") {
    player.visible = false
    player2.visible = false
    player3.visible = false
    player4.visible = false
    player5.visible = false
    player6.visible = false
    player7.visible = false
    player8.visible = false
    oGroup.destroyEach()
    background("black")
    fill("white")
    text("You died with a score of: " + score + " seconds\n        Click to play again!", 59, height / 2)
    if(mousePressedOver(restart)) {
      gamestate = "play"
      score = 0
      player.visible = true
      player2.visible = true
      player3.visible = true
      player4.visible = true
      player5.visible = true
      player6.visible = true
      player7.visible = true
      player8.visible = true
    }
  }
  
  drawSprites()
}

function spawnObstacles() {
  if(frameCount % 15 == 0) {
    randomX = Math.round(random(0, width))
    o = createSprite(randomX, -40, 40, 40)
    o.shapeColor = "red"
    o.velocityY += 10 + score / 10
    o.lifetime = (height + 20) / 10
    oGroup.add(o)
  }
}
