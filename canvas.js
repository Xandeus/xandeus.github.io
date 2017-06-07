// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight-5;


// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];
var gravity = 1;
var friction = .9;
var mouseCX;
var mouseCY;

// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;	
	canvas.height = innerHeight;

	init();
});

addEventListener("click", function() {

	mouseCX = mouse.x;
	mouseCY = mouse.y;
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1,y1,x2,y2){
	x3 = x2-x1;
	y3 = y2-y1;
	return Math.sqrt(Math.pow(x3,2) + Math.pow(y3,2));
}
// Objects
function Object(x, y,dx,dy,radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = randomColor(colors);

	this.update = function() {
		if((this.x + this.radius + this.dx) > canvas.width || (this.x - this.radius + this.dx) < 0){
			this.dx = -this.dx;
		}
		if((this.y + this.radius + this.dy) > canvas.height){
			this.dy = -this.dy * friction;
			this.dx *= friction;
		}
		else{
			this.dy += gravity;
		}
		this.x+=this.dx;
		this.y+=this.dy;
		if(distance(mouseCX,mouseCY, this.x,this.y) < this.radius){
			this.dx += randomIntFromRange(-50,50);
			this.dy += randomIntFromRange(-50,50);
		}
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


// Implementation
var balls;
function init() {
	balls = [];
	for(var i = 0; i<15;i++){
		var radius = randomIntFromRange(8,20);
		var x = randomIntFromRange(radius,canvas.width-radius);
		var y = randomIntFromRange(0,canvas.height-radius);
		var dx = randomIntFromRange(-2,2);
		var dy = randomIntFromRange(-2,2);
		balls.push(new Object(x,y,dx,dy,radius));
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < balls.length;i++){
		balls[i].update();
	}
	mouseCX = undefined;
	mouseCY = undefined;
}

init();
animate();