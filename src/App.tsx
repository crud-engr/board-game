import React from 'react'
import './styles/index.scss'
import { GameProvider, GameContext, useGameContext } from './contexts/gameContext'
import { HomeScreen } from './screens/Home'
import { GameScreen } from './screens/Game'

function App() {
  
  return (
    <GameProvider>
      <GameContext.Consumer>
        {
          (value) => value.state.screen === 'GAME' ? <GameScreen/> : <HomeScreen/> 
        }
      </GameContext.Consumer>
    </GameProvider>
  )
}

export default App
