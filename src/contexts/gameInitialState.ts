import { IGameCoord,  IGameScreen } from './../utils/common/types';
export const GameInitialState:IGameState = {
    screen: 'HOME',
    grid: 7,
    player: {moves: 0, position: {x: 0, y: 0}},
    foods: [],
    totalMoves: 0,
    time: 0
};

export type IGameState = {
    screen:  IGameScreen,
    grid: number
    player: {
        moves: number,
        position: IGameCoord,
    },
    foods: Array<IGameCoord>,
    totalMoves: number,
    time: number
}