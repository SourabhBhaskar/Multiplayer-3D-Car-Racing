import React from 'react';
import LobbyUI from '../components/Lobby/ui/LobbyUI';
import LobbyCanvas from '../components/Lobby/canvas/LobbyCanvas';


function Lobby() {
  return (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <LobbyUI />
      <LobbyCanvas />
    </div>
  )
}


export default Lobby;