import { myPlayer, useIsHost, usePlayerState, usePlayersList } from 'playroomkit';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Start(){
  const navigate = useNavigate();
  const isHost = useIsHost();
  const player = myPlayer();
  const [playerGameState, setPlayerGameState] = usePlayerState(player, 'game');
  const playerList = usePlayersList();

  const handleStart = () => {
    // console.log(playerGameState)
    // playerList.forEach((player) => {
      
    //   // console.log(player.getState().game.ready)
    // })
    // setPlayerGameState({ ...playerGameState, start: !playerGameState.start});
  }

  const handleReady = () => {
    setPlayerGameState({ ...playerGameState, ready: playerGameState.ready === undefined || playerGameState.ready === false ? true : false });
  }

  return (
    <div className='w-[70%] h-[50px] rounded-md relative'>
      { isHost 
      ? <button onClick={handleStart} className="flex w-full h-full bg-slate-200 border border-black rounded-md text-black font-extrabold text-xl py-3 px-4 focus:outline-none focus-visible:outline-none focus:before absolute transform transition duration-200 cursor-pointer">Start Race</button>
      : <button onClick={handleReady} className="flex w-full h-full bg-slate-200 border border-black rounded-md text-black font-extrabold text-xl py-3 px-4 focus:outline-none focus-visible:outline-none focus:before absolute transform transition duration-200 cursor-pointer">{playerGameState.ready ? 'Cancel' : 'Ready'}</button>}
    </div>
  )
}

export default Start;
