class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);

    //this.state=int(random(3));
    this.state = 2;

    this.maxSpeed = 12;
    this.maxForce = 0.1;
    this.r = 3;

    this.wanderTheta = 0;
    this.xoff = PI / 2;
    this.xoffval = random(0.01, 0.04);

    this.currentPath = [];
    this.paths = [this.currentPath];
    this.colPicker = ["#175F2E", "#478C2C", "#87B72E", "#E2C685", "#A11F30"]
    //this.colPicker=["#fce2fb","#fef5ee","#932598","#c91367","#380a8a"]
    this.col = this.colPicker[int(random(this.colPicker.length))];
  }

  wander() {
    let angle = noise(this.xoff) * TWO_PI * 2;
    let steer = p5.Vector.fromAngle(angle);
    steer.setMag(this.maxForce);
    this.applyForce(steer);
    this.xoff += this.xoffval;
  }

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 300;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    let hitEdge = false;
    if (this.pos.x > width + this.r) {
      this.acc = createVector(0, 0);
      this.update();
      hitEdge = true;
    } else if (this.pos.x < -this.r) {
      this.pos.x = -this.r;
      hitEdge = true;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
      hitEdge = true;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.currentPath.push(this.pos.copy());
  }

  show() {
    if (this.state == 0) {
      push();
      stroke(this.col);
      noFill();
      strokeWeight(0.5);
      ellipse(this.pos.x, this.pos.y, 15)
      pop();
    }
    else if (this.state == 1) {
      push();
      for (let path of this.paths) {
        beginShape();
        stroke(this.col);
        noFill();
        for (let v of path) {
          vertex(v.x, v.y);
        }
        endShape();
      }
      pop();
    }
    else if (this.state == 2) {
      push();
      for (let path of this.paths) {
        beginShape();
        stroke(this.col);
        strokeWeight(1.5);
        noFill();
        for (let v of path) {
          vertex(v.x, v.y);
          ellipse(v.x, v.y, 3);
        }
        endShape();
      }
      pop();
    }
    else if (this.state == 3) {
      push();
      fill(this.col);
      noStroke();
      rect(this.pos.x, this.pos.y, 10, 2)
      pop();
    }
  }
}

class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(5);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill("#F063A4");
    push();
    translate(this.pos.x, this.pos.y);
    rect(0, 0, this.r * 2);
    pop();
  }
}
