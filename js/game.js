const canvas = document.getElementById("game"); // указываем что canvas отоброзится в окне
const ctx = canvas.getContext("2d"); // указываем что наша игра будет 2d

// Устанавливаем изоброжение всего игрового поля
const ground = new Image();
ground.src = "img/ground.png";

// Устанавливаем изоброжение еды
const foodImg = new Image();
foodImg.src = "img/food.png";

// Создаем переменную которая отвечает за ширину каждого отдельного кводрата на поле игры
let box = 32;

// Переменная общего счета нашей игры. Начальное значение будет равно 0
let score = 0;

// Переменная для отоброжения по вверх картинки еды
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

// Переменная для отоброжения по вверх картинки змейки
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Движение змейки
document.addEventListener("keydown", direction);

let dir;
function direction(event) {
    if(event.keyCode === 37 && dir != "right")
        dir = "left";
    else if(event.keyCode === 38 && dir != "down")
        dir = "up";
    else if(event.keyCode === 39 && dir != "left")
        dir = "right";
    else if(event.keyCode === 40 && dir != "rigt")
        dir = "down";
}

// Если змейка съест свой хвост то будет проигрыш
function  eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if(head.x === arr[i].x && head.y === arr[i].y)
            clearInterval(game);
    }
}


// Создаем функцию которая будет рисовать объекты внутри canvas
function drawGame() {
    ctx.drawImage(ground, 0, 0);

// Рисуем еду в браузере
    ctx.drawImage(foodImg, food.x, food.y);

// Рисуем змейку
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i === 0 ? "green" : "chartreuse";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

// Отоброжаем текст
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

// Ресуем передвижение змейки
let snakeX = snake[0].x;
let snakeY = snake[0].y;

// Змейка ест еду
if(snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
    };
}else {
    snake.pop();
}

// Сдесь прописываем условие проигрыша если змейка вышла за поле
if(snakeX < box || snakeX > box * 17
   || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);



if(dir === "left") snakeX -= box;
if(dir === "right") snakeX += box;
if(dir === "up") snakeY -= box;
if(dir === "down") snakeY += box;

let newHead = {
    x: snakeX,
    y: snakeY
};

eatTail(newHead, snake);

snake.unshift(newHead);
}

// Функцию drawGame вызываем каждые 100 мл секунд для отоброжения в браузере
let game = setInterval(drawGame, 300);