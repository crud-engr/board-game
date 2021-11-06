import React from "react";
import { useGameContext } from "../contexts/gameContext";

export const HomeScreen = () => {
  const { state, dispatch } = useGameContext();
  const [grid, setGrid] = React.useState(10);
  return (
    <div className="home-body">
      <div className="home-bg">
        <div className="home-container">
          <img className="player-img" src="/vectors/player.png" />
          <h1 className="title">
            {state.screen === "WIN"
              ? "Good!"
              : state.screen === "LOSE"
              ? "Game over!"
              : "Eat Sprite"}
          </h1>
          <div>
            {state.screen === "HOME" && (
              <>
                <p className="subtitle">
                  Eat all the sprite in a period of time. Move very fast!!!
                </p>
                
              </>
            )}
            {state.screen === "WIN" && (
              <p className="subtitle">
                Total foods: {state.grid - state.foods.length}/{state.grid}
              </p>
            )}
            {["WIN", "LOSE"].includes(state.screen)}
          </div>

          <div className="grid-input">
            <span className="grid-input__label">Enter Grid</span>
            <select
              className="grid-input__input"
              value={grid}
              onChange={(e) => setGrid(parseInt(e.currentTarget.value))}
            >
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <button
            className="start-button"
            onClick={() => dispatch({ type: "START", value: { grid } })}
          >
            {state.screen === "HOME" ? "Start game" : "Start again"}
          </button>
        </div>
      </div>
    </div>
  );
};
