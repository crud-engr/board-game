import React, {createContext, useContext, } from 'react';
import { IGameAction } from './gameActions';
import {GameInitialState, IGameState} from './gameInitialState'
import { GameReducer } from './gameReducer';
type IGameContextProps = {
    state: IGameState, dispatch: React.Dispatch<IGameAction>
}
export const GameContext = createContext<IGameContextProps>({} as IGameContextProps);

export const GameProvider = ({children}:{children: JSX.Element }) => {
    const [state, dispatch] = React.useReducer(GameReducer, GameInitialState);
    return <GameContext.Provider value={{state, dispatch}}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)