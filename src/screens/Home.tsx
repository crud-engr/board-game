import React from "react";
import { useGameContext } from "../contexts/gameContext";

export const HomeScreen = () => {
  const { state, dispatch } = useGameContext();
  const [grid, setGrid] = React.useState(10);
  return (
    <div className="home-body">
      <div className="home-bg">
        <div className="home-container">
          <img className="player-img" src="/vectors/player.svg" />
          <h1 className="title">
            {state.screen === "WIN"
              ? "Bravo!"
              : state.screen === "LOSE"
              ? "Game over!"
              : "Greedy Hunter "}
          </h1>
          <div>
            {state.screen === "HOME" && (
              <>
                <p className="subtitle">
                  The aim is to eat all the food in record time
                </p>
                <p className="subtitle">Configure your game grid below 👇🏼</p>
              </>
            )}
            {state.screen === "WIN" && (
              <p className="subtitle">
                Total foods: {state.grid - state.foods.length}/{state.grid}
              </p>
            )}
            {["WIN", "LOSE"].includes(state.screen) && (
              <p className="subtitle">Time spent: {state.time} seconds</p>
            )}
          </div>

          <div className="grid-input">
            <span className="grid-input__label">Game grid</span>
            <select
              className="grid-input__input"
              value={grid}
              onChange={(e) => setGrid(parseInt(e.currentTarget.value))}
            >
              {[5, 6, 7, 8, 9, 10, 11, 12].map((element) => (
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
