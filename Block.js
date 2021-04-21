class Block{
  constructor(x, y, width, height) {
      var options = {
          restitution :0.4,
          friction :0.0
      }

      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.visibility = 255;
      World.add(world, this.body);
  }

  detectCollision(b){
    var d = dist(this.body.position.x, this.body.position.y, b.body.position.x, b.body.position.y);
    if(d <= 50){
      World.remove(world,this.body)
      push();
      this.visibility = this.visibility - 5;
      tint(255, this.visiblity);
      pop();
    }
  }

  display(){
    var angle = this.body.angle;
    var pos= this.body.position;
    if (this.body.speed < 3) {
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      rect(0,0,this.width, this.height);
      pop();
    }else if (this.body.speed > 3){
        World.remove(world,this.body)
        push();
        this.visibility = this.visibility - 5;
        tint(255,this.visiblity);
    }
  } 

  score() {
    if(this.visibility < 0 && this.visibility >-105) {
      score++;
    }
  }

  reload() {
    World.add(world, this.body);
  }
   
}
