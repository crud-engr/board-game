import { IGameState } from "./gameInitialState";
import { IAllowedMoves, IGameAction } from "./gameActions";
import { IGameCoord, IGameScreen } from "../utils/common/types";
export const GameReducer = (
  state: IGameState,
  action: IGameAction
): IGameState => {
  switch (action.type) {
    case "START":
      const grid = action.value.grid - 1;
      const foodPositions = generateFoodPosition(grid);
      const playerPosition = generatePlayerPosition(grid, foodPositions);
      return {
        ...state,
        screen: "GAME",
        grid: action.value.grid,
        player: {
          ...state.player,
          moves: 0,
          position: playerPosition as { x: number; y: number },
        },
        foods: foodPositions,
        totalMoves: Math.round((grid * grid) / 2),
        time: 0,
      };
    case "MOVE":
      const newPosition = playerNewPosition(
        state.player.position,
        action.value,
        state.grid
      );
      const isAMove = !isSameCoord(state.player.position, newPosition);
      let newFood = [...state.foods];
      // check if food in cell
      if (isAMove) {
        const foodInCell = state.foods.findIndex((f) =>
          isSameCoord(f, newPosition)
        );
        if (foodInCell >= 0) {
          newFood = state.foods.splice(foodInCell, 1);
        }
      }
      const playerMoves = isAMove ? state.player.moves + 1 : state.player.moves;
      return {
        ...state,
        foods: newFood,
        screen: getCorrectScreen(newFood, state.totalMoves, playerMoves),
        player: {
          ...state.player,
          moves: playerMoves,
          // TODO replace with newPosition instead
          position: playerNewPosition(
            state.player.position,
            action.value,
            state.grid
          ),
        },
      };
    default:
      return {
        ...state,
      };
  }
};

function generateRandomPosition(min: number, max: number) {
  return { x: getRandomInt(min, max), y: getRandomInt(min, max) };
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function isSameCoord(oldPos: IGameCoord, newPos: IGameCoord) {
  return oldPos.x === newPos.x && oldPos.y === newPos.y;
}
function generateFoodPosition(grid: number): Array<IGameCoord> {
  const foodPositions: Array<IGameCoord> = [];
  while (foodPositions.length < grid + 1) {
    const randomPosition = generateRandomPosition(0, grid);
    if (!foodPositions.find((f) => isSameCoord(f, randomPosition))) {
      foodPositions.push(randomPosition);
    }
  }
  return foodPositions;
}

function getCorrectScreen(
  newFoods: IGameCoord[],
  totalMoves: number,
  playerMoves: number
): IGameScreen {
  let screen: IGameScreen = "GAME";
  if (newFoods.length < 1) {
    screen = "WIN";
  } else if (playerMoves >= totalMoves) {
    screen = "LOSE";
  }
  return screen;
}

function generatePlayerPosition(grid: number, foodPositions: IGameCoord[]) {
  const playerPosition: IGameCoord = { x: -1, y: -1 };
  do {
    const randomPosition = generateRandomPosition(0, grid);
    if (!foodPositions.find((f) => isSameCoord(f, randomPosition))) {
      playerPosition.x = randomPosition.x;
      playerPosition.y = randomPosition.y;
    }
  } while (playerPosition.x === -1 && playerPosition.y === -1);
  return playerPosition;
}

function playerNewPosition(
  oldPosition: IGameCoord,
  direction: IAllowedMoves,
  grid: number
): IGameCoord {
  switch (direction) {
    case "UP":
      return {
        x: oldPosition.x,
        y: oldPosition.y <= 0 ? 0 : oldPosition.y - 1,
      };
    case "DOWN":
      return {
        x: oldPosition.x,
        y: oldPosition.y < grid - 1 ? oldPosition.y + 1 : oldPosition.y,
      };
    case "RIGHT":
      return {
        y: oldPosition.y,
        x: oldPosition.x < grid - 1 ? oldPosition.x + 1 : oldPosition.x,
      };
    case "LEFT":
      return {
        y: oldPosition.y,
        x: oldPosition.x <= 0 ? 0 : oldPosition.x - 1,
      };
    default:
      return oldPosition;
  }
}
