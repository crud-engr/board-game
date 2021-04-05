export type IAllowedMoves = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type IGameAction = 
 | {type: 'START', value: {grid: number}}
 | {type: 'MOVE', value: IAllowedMoves}
 