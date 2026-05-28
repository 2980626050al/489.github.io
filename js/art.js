let particles = [];
let colors;

function setup() {
    let canvas = createCanvas(600, 500);
    canvas.parent('art-canvas');
    colors = [
        '#2E7D32',
        '#4CAF50',
        '#FF9800',
        '#FFB74D',
        '#81C784'
    ];
    
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    noStroke();
}

function draw() {
    background(255, 248, 225, 20);
    
    for (let p of particles) {
        p.update();
        p.display();
    }
}

class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(20, 60);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
        this.color = random(colors);
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.02, 0.02);
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        fill(this.color);
        this.drawShape();
        pop();
    }
    
    drawShape() {
        let choice = floor(random(3));
        if (choice === 0) {
            ellipse(0, 0, this.size, this.size);
        } else if (choice === 1) {
            rectMode(CENTER);
            rect(0, 0, this.size * 0.8, this.size * 0.8);
        } else {
            this.drawHeart(this.size * 0.5);
        }
    }
    
    drawHeart(size) {
        beginShape();
        for (let t = 0; t < TWO_PI; t += 0.1) {
            let x = 16 * pow(sin(t), 3) * size / 16;
            let y = -(13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) * size / 16;
            vertex(x, y);
        }
        endShape(CLOSE);
    }
}