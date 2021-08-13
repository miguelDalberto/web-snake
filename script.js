const board = document.getElementById('board')
const boardContext = board.getContext('2d')

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
]

let changingDirection = false;
let xVelocity = 10;
let yVelocity = 0;

let foodx;
let foody;


const clearCanvas = () => {
  boardContext.fillStyle = 'grey'
  boardContext.strokestyle = 'black'

  boardContext.fillRect(0, 0, board.width, board.height)
  boardContext.strokeRect(0, 0, board.width, board.height)
}

const drawSnake = () => {
  snake.forEach((i) => {
    boardContext.fillStyle = 'lightgreen'
    boardContext.strokestyle = 'darkgreen'

    boardContext.fillRect(i.x, i.y, 10, 10)
    boardContext.strokeRect(i.x, i.y, 10, 10)
  })
}

const advanceSnake = () => {
  snake.unshift({
    x: snake[0].x + xVelocity, 
    y: snake[0].y + yVelocity
  })

  if(snake[0].x === foodx && snake[0].y === foody) {
    createFood()
  } else{
    snake.pop()
  }
}

const hasGameEnded = () => {
  for(let i = 4; i < snake.length; i++) { // hit itself
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ) {
      return true
    }
  }

  return (
    snake[0].x < 0 || // hit left
    snake[0].x > board.width - 10 || // hit right
    snake[0].y < 0 || // hit top
    snake[0].y > board.height - 10 // hit bottom
  )
}

const changeDirection = ({ keyCode }) => {
  if(changingDirection)return;
  changingDirection = true;
  
  switch(keyCode) {
    case(37): // left key
      if(xVelocity === 10) return;
      xVelocity = -10;
      yVelocity = 0;

      break;
    case(38): // up key
      if(yVelocity === 10)return;
      xVelocity = 0;
      yVelocity = -10;

      break;
    case(39): // right key
      if(xVelocity === -10)return;
      xVelocity = 10;
      yVelocity = 0;

      break;
    case(40): // down key
      if(yVelocity === -10)return;
      xVelocity = 0;
      yVelocity = 10;

      break;
  }
}

document.addEventListener('keydown', changeDirection)

const createFood = () => {

  const randomFoodCoords = (min, max) => {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

  foodx = randomFoodCoords(0, board.width - 10)
  foody = randomFoodCoords(0, board.height - 10)
  
  snake.forEach((i) => {
    if ( i.x === foodx && i.y === foody) createFood();
  })
}

const drawFood = () => {
  boardContext.fillStyle = 'red'
  boardContext.strokestyle = 'maroon'
  boardContext.fillRect(foodx, foody, 10, 10)
  boardContext.strokeRect(foodx, foody, 10, 10)
}

createFood()
const main = () => {
  if (hasGameEnded()) {
    boardContext.fillStyle = "black"
    boardContext.font = "30px sans"
    boardContext.fillText("Game over!", 10, 50)
    return;
  }

  changingDirection = false;
  setTimeout(() => {
    clearCanvas()
    advanceSnake()
    drawSnake()
    drawFood()
    main()
  }, 200)
}

main()
