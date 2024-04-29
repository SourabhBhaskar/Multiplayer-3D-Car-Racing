import React from 'react';
import GameUI from '../components/Game/ui/GameUI';
import GameCanvas from '../components/Game/canvas/GameCanvas';


function Game() {
  return (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <GameUI />
      <GameCanvas />
    </div>
  )
}


export default Game;