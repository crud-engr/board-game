import React from 'react'
import { IAllowedMoves } from '../contexts/gameActions';
import { useGameContext } from '../contexts/gameContext';

const keys = new Map<string, string>([
    ["ArrowUp", "UP"],
    ["ArrowDown", "DOWN"],
    ["ArrowRight", "RIGHT"],
    ["ArrowLeft", "LEFT"],
  ]);
export const useKeyPress = () => {
    const {dispatch } = useGameContext();
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
};
