function boxBoundary() {
  this.topLeft;
  this.topRight;
  this.bottomLeft;
  this.buttomRight;
  
  this.getBoundaryFromPoints = function (pts) {
    var lowestX = null;
    var highestX = null;
    var lowestY = null;
    var highestY = null;
    
    // Find boundars based on points.
    for (var i = 0; i < pts.length; i++) {
      var pt = pts[i];
      if (lowestX === null || pt.x < lowestX) {
        lowestX = pt.x;
      }
      if (lowestY === null || pt.y < lowestY) {
        lowestY = pt.y;
      }
      if (highestX === null || pt.x > highestX) {
        highestX = pt.x;
      }
      if (highestY === null || pt.y > highestY) {
        highestY = pt.y;
      }
    }
    // Set points
    this.topLeft = createVector(lowestX, lowestY);
    this.topRight = createVector(highestX, lowestY);
    this.bottomLeft = createVector(lowestX, highestY);
    this.bottomRight = createVector(highestX, highestY);
  }
  
  this.show = function() {
    stroke(255,0,0);
    strokeWeight(1);
    noFill();
    beginShape();
      vertex(this.topLeft.x, this.topLeft.y);
      vertex(this.topRight.x, this.topRight.y);
      vertex(this.bottomRight.x, this.bottomRight.y);
      vertex(this.bottomLeft.x, this.bottomLeft.y);
    endShape(CLOSE);
  }
}