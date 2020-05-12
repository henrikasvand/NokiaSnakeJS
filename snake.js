
const cvs = document.getElementById("snakeCanvas");
const ctx = cvs.getContext("2d");

// creating one unit for the game
const box = 32;

//loading graphics for the game
const ground = new Image();
ground.src = "img/background.png";

const foodImg = new Image();
foodImg.src = "img/apple.png";

let dead =new Audio();
let eat =new Audio();
let up =new Audio();
let left =new Audio();
let right =new Audio();
let down =new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

//the Snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}
//create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//the score

let score = 0;

//snake controls
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    }
    else if (key == 38 && d != "DOWN") {
        up.play();
        d = "UP";
    }
    else if (key == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT";
    }
    else if (key == 40 && d != "UP") {
        down.play();
        d = "DOWN";
    }
}
// check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}


//draw everything

function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "black" : "darkgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "lightgreen";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats food

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // we don't remove the tail
    } else {
        // we remove the tail
        snake.pop();
    }

    //add new head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //game over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }

    // add new head


    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px arial";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// call draw function every 100ms;

let game = setInterval(draw, 100);