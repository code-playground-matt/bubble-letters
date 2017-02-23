function Vehicle(x, y) {
  this.pos = createVector(random(-width, width), random(-height, height));
  this.vel = createVector(random(-1,1), random(-1,1));
  this.acc = createVector();
  this.target = createVector(x, y);
  this.r = 4;
  this.maxSpeed = 10;
  this.maxForce = 1;
}

Vehicle.prototype.behaviours = function() {
  var arrive = this.arrive(this.target);

  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  
  arrive.mult(1);
  flee.mult(5);
  
  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxSpeed);
  } 
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
}