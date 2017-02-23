var font;

var textToDraw = [];

var vehicles = [];
var boundary = [];

var fSize = 100;
var fLineSpace = 100;

var biggestX = null;
var biggestY = null;

var showGrid = false;
var showBoundaryBox = false;

var debugEllipses = [];

var currentMouseX = 0;
var currentMouseY = 0;

var currentFlee = createVector(0, 0);

function preload() {
  console.log('preload() started');
  
  font = loadFont('Zantroke.otf');
  
  console.log('preload() finished');
}

function setup() {
  console.log('setup() started');

  createCanvas(800, 600);

  textToDraw.push('Ava');
  textToDraw.push('Jake');
  
  
  
  windowResized();
  
  console.log('setup() finished');
}

function draw() {
  
  background(0);

  if (showGrid) {
    drawGrid();
  }
  
  //translate(windowWidth/2 - biggestX/2, windowHeight/2 - biggestY/2);
  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.show();
  }
  
  if (showBoundaryBox) {
    for (var i = 0; i < boundary.length; i++) {
      boundary[i].show();
    }
  }
  
  for (var i = 0; i < debugEllipses.length; i++) {
    push();
    noStroke();
    fill(0, 255, 0);
    ellipse(debugEllipses[i].x, debugEllipses[i].y, 5, 5);
    pop();
  }
}

function drawGrid() {
  for (var x = 0; x < width; x += 100) {
      stroke(0, 0, 255);
      strokeWeight(1);
      line(x, 0, x, height);
  }
  for (var y = 0; y < height; y += 100) {
      stroke(0, 0, 255);
      strokeWeight(1);
      line(0, y, width, y);
  }
}

function calcDimensions() {
  boundary = [];
  vehicles = [];
  for (var i = 0; i < textToDraw.length; i++) {
    var x = 50;
    var y = (i + 1) * fLineSpace;
    var points = font.textToPoints(textToDraw[i], x, y+20,fSize);
    for (var j = 0; j < points.length; j++) {
      var pt = points[j];
      var vehicle = new Vehicle(pt.x, pt.y);
      vehicles.push(vehicle);
    }
    var b = new boxBoundary();
    b.getBoundaryFromPoints(points);
    if (biggestX == null || b.topRight.x > biggestX) { biggestX = b.topRight.x; }
    if (biggestY == null || b.bottomRight.y > biggestY) { biggestY = b.bottomRight.y; }
    
    boundary.push(b);
    
    console.log(textToDraw[i], b.topLeft, b.topRight, b.bottomLeft, b.bottomRight);
  }
}

function windowResized() {
  console.log('windowResized() started');
  
  resizeCanvas(windowWidth, windowHeight);
  
  calcDimensions();
  
  // Reset variables here

  console.log('windowResized() finished');
}

function mouseDragged() {
  currentMouseX = mouseX;
  currentMouseY = mouseY;
  currentFlee = createVector(mouseX, mouseY);
}

function mousePressed() {
  var x = mouseX;
  var y = mouseY;
  console.log('mx: ' + x + ', my: ' + y);
  

  //debugEllipses.push(createVector(x - width/4, y - height/4));
  
}