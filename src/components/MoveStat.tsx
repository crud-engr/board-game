import React from "react";
import { useGameContext } from "../contexts/gameContext";

export const MoveStat = () => {
  const { state: game } = useGameContext();
  return (
    <div className="moves-stat">
      <div>
        Maximum moves: <strong>{game.totalMoves}</strong>
      </div>
      <div>
        Total moves: <strong>{game.player.moves}</strong>
      </div>
    </div>
  );
};
