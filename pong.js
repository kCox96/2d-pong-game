const START_SPEED = 6;
const BALL_RADIUS = 30;

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 150;

// paddle elements
var paddle1;
var paddle2;

//paddle velocity elements
var paddle1Vel;
var paddle2Vel;

// score elements
var p1Score;
var p2Score;

// ball element
var ball;
// ball velocity element
var ballVel;

function preload(){
  // load background image
  bg = loadImage('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');

}

function setup() {
  createCanvas((windowWidth - 50), (windowHeight -50));

  textAlign(CENTER);
  textSize(30);
  fill(255);
  textFont('Impact');



  // set Y coordinates of paddles so they initialise at mid-screen
  paddle1 = height / 2 - 50;
  paddle2 = height / 2 - 50;

  paddle1Vel = 0;
  paddle2Vel = 0;

  p1Score = 0;
  p2Score = 0;

  // create ball in the middle of canvas
  ball = createVector(width / 2, height / 2);

  // set random trajectory for ball
  ballVel = createVector(random(-2, 3), random(-2, 3));
  // set speed
  ballVel.setMag(START_SPEED);
}

// create canvas
function draw() {
  // resize image to fit canvas
  bg.resize((windowWidth - 50), (windowHeight -50));
  background(bg);

  // draw  paddles on canvas
  rect(PADDLE_WIDTH * 2, paddle1, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - (PADDLE_WIDTH * 3), paddle2, PADDLE_WIDTH, PADDLE_HEIGHT);

  // draw ball on canvas
  ellipse(ball.x, ball.y, BALL_RADIUS);

  // draw scoreboard
  text("Player 1:  " + p1Score + "  |  " + "Player 2:  " + p2Score, width / 2, 50);
  // handle paddle movement
  handleMovement();
  // handle ball movement
  handleBall();

}

/* Function that handles ball movement*/
function handleBall() {

  ball.x = ball.x + ballVel.x;
  ball.y = ball.y + ballVel.y;

  // top and bottom collisons
  if (ball.y > (height - 10) || ball.y < 10) {
    // Invert y direction if ball meets top or bottom of canvas
    ballVel.y = ballVel.y * -1;
  }

  // paddle collisions
  if (ball.x <= PADDLE_WIDTH * 3.5) {
    // left paddle

    // out of bounds
    if (ball.x <= PADDLE_WIDTH) {
      p2Score++;
      reset();
      return;
    }

    if (ball.y > paddle1 && ball.y < paddle1 + PADDLE_HEIGHT) {
      // stop ball getting stuck inside paddle
      if (ballVel.x < 0) {
        // reverse ball direction
        ballVel.x = ballVel.x * -1;
        // speed up ball
        ballVel.mult(random(1, 1.5));
      }
    }

  } else if (ball.x >= width - (PADDLE_WIDTH * 3.5)) {
    // right paddle

    // out of bounds
    if (ball.x >= width - PADDLE_WIDTH) {
      p1Score++;
      reset();
      return;
    }

    if (ball.y > paddle2 && ball.y < paddle2 + PADDLE_HEIGHT) {
      // stop ball getting stuck inside paddle
      if (ballVel.x > 0) {

        // Invert x axis direction
        ballVel.x = ballVel.x * -1;
        // speed up ball
        ballVel.mult(random(1, 1.5));
      }
    }
  }

}

/* Function that handles paddle movement*/
function handleMovement() {
  // player one controls
  if (keyIsDown(87)) {
    //move up
    paddle1Vel = paddle1Vel - 5;
  } else if (keyIsDown(83)) {
    //move down
    paddle1Vel = paddle1Vel + 5;

  }

  //player two controls
  if (keyIsDown(79)) {
    //move up
    paddle2Vel = paddle2Vel - 5;
  } else if (keyIsDown(75)) {
    //move down
    paddle2Vel = paddle2Vel + 5;
  }

  // change paddle position
  paddle1 = paddle1 + paddle1Vel;
  paddle2 = paddle2 + paddle2Vel;

  // gives the illusion of friction
  paddle1Vel = paddle1Vel * 0.4;
  paddle2Vel = paddle2Vel * 0.4;

  // constrain paddles
  paddle1 = constrain(paddle1, 0, height - PADDLE_HEIGHT);
  paddle2 = constrain(paddle2, 0, height - PADDLE_HEIGHT);

}

function reset() {
  // set to default speed
  ballVel.setMag(START_SPEED);
  // set ball to center
  ball = createVector(width / 2, height / 2);
}

// resize canvas and background when browser window is resized
function windowResized(){
  resizeCanvas((windowWidth - 50),(windowHeight - 50));
  bg.resize((windowWidth - 50),(windowHeight - 50));
}
