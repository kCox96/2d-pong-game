
let button;

function preload(){
// load background image
bg = loadImage('https://images.unsplash.com/photo-1498736297812-3a08021f206f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1357&q=80');
}

function setup(){
  createCanvas((windowWidth - 50), (windowHeight -50));

  textAlign(CENTER);
  textSize(30);
  fill(255);
  textFont('Impact');

  button = createButton('Play!');

}

function draw(){
  let col = color(22,198,61);
  bg.resize((windowWidth - 50), (windowHeight - 50));
  background(bg);

  text("Welcome to pong! \n The game works as follows: \n The left paddle is player one. "
  + "Move the paddle up using 'w' and down using 's'. "
  + "\n The right paddle is player two. " +
   "Move the paddle up using 'o' and down using 'k'. "
  + "\n The ball will speed up with every turn, so be careful!", width/2, height/2);

  button.size(100, 50);
  button.style('background-color', col);
  button.position((width/2) - 25, (height/2) + 200);
  button.mousePressed(pageRedirect);

}

// redirect to pong.html
function pageRedirect(){
  window.location.href = "pong.html";
}

// resize canvas and background when browser window is resized
function windowResized(){
  resizeCanvas((windowWidth - 50),(windowHeight - 50));
  bg.resize((windowWidth - 50),(windowHeight - 50));
}
