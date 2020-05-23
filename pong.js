// paddle elements
var paddle1;
var paddle2;

//paddle velocity elements
var paddle1Vel;
var paddle2Vel;

// ball element
var ball;
// ball velocity element
var ballVel;

function setup() {
  createCanvas(600, 400);
  // set Y coordinates of paddles
  paddle1 = height / 2 - 50;
  paddle2 = height / 2 - 50;

  paddle1Vel = 0;
  paddle2Vel = 0;

// create ball
  ball = createVector(width / 2, height / 2);

// set random trajectory for ball
  ballVel = createVector(random(-2, 2), random(-2, 2));

}

// create canvas
function draw(){
  background(100);

// draw  paddles on canvas
  rect(20, paddle1, 10, 100);
  rect(width - 30, paddle2, 10, 100);

// draw ball on canvas
  ellipse(ball.x, ball.y, 20);

// handle paddle movement
  handleMovement();
// handle ball movement
  handleBall();

}

/* Function that handles ball movement*/
function handleBall(){

ball.x = ball.x + ballVel.x;
ball.y = ball.y + ballVel.y;

// top and bottom collisons
if (ball.y > (height - 10)  || ball.y < 10) {
  // Invert direction if ball meets top or bottom of canvas
  ballVel.y = ballVel.y * - 1;
}

// paddle collisions
if (ball.x < 20){
  // right side
if (ball.y < paddle1 && ball.y > paddle1 + 100){
  ballVel.x = ballVel * -1;
}

}
else if (ball.x > width - 30){
  // left side
  if (ball.y < paddle2 && ball.y > paddle2 + 100){
    ballVel.x = ballVel * -1;
  }
}

}

/* Function that handles paddle movement*/
function handleMovement(){
// player one controls
if (keyIsDown(87)){
  //move up
paddle1Vel = paddle1Vel - 5;
}
else if (keyIsDown(83)){
  //move down
  paddle1Vel = paddle1Vel + 5;

}

//player two controls
if (keyIsDown(UP_ARROW)){
  //move up
  paddle2Vel = paddle2Vel - 5;
}
else if (keyIsDown(DOWN_ARROW)){
  //move down
  paddle2Vel = paddle2Vel + 5;
}

paddle1 = paddle1 + paddle1Vel;
paddle2 = paddle2 + paddle2Vel;

// gives the illusion of friction
paddle1Vel = paddle1Vel * 0.4;
paddle2Vel = paddle2Vel * 0.4;

// constrain paddles
paddle1 = constrain(paddle1, 0, height - 100);
paddle2 = constrain(paddle2, 0, height - 100);

}
