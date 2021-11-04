import React from "react";
import { Food } from "../components/Food";
import { MoveStat } from "../components/MoveStat";
import { Player } from "../components/Player";
import { IAllowedMoves } from "../contexts/gameActions";
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
                <img src="/vectors/life.svg"/>
                <div>
                    <div style={{width: `${(game.player.moves/game.totalMoves) * 100}%`}}/>
                </div>
            </div>
            <div>
                Time Spent: <strong> secs</strong>
            </div>
        </div>
        <div className="board">
          {grid.map((el, row) => (
            <div className="row" key={`row${row}`}>
              {grid.map((elm, cell) => (
                <div className="cell" key={`row${row}col${cell}`}>
                
                  {game.foods.find((f) => f.x === cell && f.y === row) && (
                    <Food/>
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
        <MoveStat/>
      </div>
    </div>
  );
};
