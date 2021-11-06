import React from "react";
import { Sprite } from "../components/Sprite";
import { Player } from "../components/Player";
import { useGameContext } from "../contexts/gameContext";
import { useKeyPress } from "../hooks/useKeyPress";

export const GameScreen = () => {
  const { state: game } = useGameContext();
  const grid = [...Array(game.grid)];

  // key press listener
  useKeyPress()

  return (
    <div className="game-body">
      <div className="board-wrapper">
        <div className="game-stat">
            <div>
                Grid: <strong>{game.grid}&times;{game.grid}</strong>
            </div>
            <div>
                
                <div>
                    <div style={{width: `${(game.player.moves/game.totalMoves) * 100}%`}}/>
                </div>
            </div>
            
        </div>
        <div className="board">
          {grid.map((el, row) => (
            <div className="row" key={`row${row}`}>
              {grid.map((elm, cell) => (
                <div className="cell" key={`row${row}col${cell}`}>
                
                  {game.foods.find((f) => f.x === cell && f.y === row) && (
                    <Sprite/>
                  )}
                  {game.player.position.x === cell &&
                    game.player.position.y === row && (
                      <Player/>
                    )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
