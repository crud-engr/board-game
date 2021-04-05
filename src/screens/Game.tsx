import React from "react";
import { IAllowedMoves } from "../contexts/gameActions";
import { useGameContext } from "../contexts/gameContext";
const keys = new Map<string, string>([
  ["ArrowUp", "UP"],
  ["ArrowDown", "DOWN"],
  ["ArrowRight", "RIGHT"],
  ["ArrowLeft", "LEFT"],
]);
export const GameScreen = () => {
  const { state: game, dispatch } = useGameContext();
  const grid = [...Array(game.grid)];
  // key press listener
  React.useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (keys.has(event.key)) {
        dispatch({ type: "MOVE", value: keys.get(event.key) as IAllowedMoves });
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return (
    <div className="game-body">
      <div className="board-wrapper">
        <div className="game-stat">
            <div>
                Grid: <strong>{game.grid}&times;{game.grid}</strong>
            </div>
            <div>
                <img src="/public/vectors/life.svg"/>
                <div>
                    <div style={{width: `${(game.player.moves/game.totalMoves) * 100}%`}}/>
                </div>
            </div>
            <div>
                Time Spent: <strong> secs</strong>
            </div>
        </div>
        <div className="board">
          {grid.map((el, col) => (
            <div className="row" key={`col${col}`}>
              {grid.map((elm, row) => (
                <div className="cell" key={`row${row}col${col}`}>
                
                  {game.foods.find((f) => f.x === row && f.y === col) && (
                    <div className="food">
                      <img src={"/public/vectors/food.svg"} />
                    </div>
                  )}
                  {game.player.position.x === row &&
                    game.player.position.y === col && (
                      <div className="player">
                        <img src={"/public/vectors/player.svg"} />
                      </div>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="moves-stat">
          <div>
            Maximum moves: <strong>{game.totalMoves}</strong>
          </div>
          <div>
            Total moves: <strong>{game.player.moves}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
