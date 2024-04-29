import React from 'react';
import MapSelection from './MapSelection';
import CarSelection from './CarSelection';
import Start from './Start';
import Room from './Room';


function LobbyUI() {
  return (
    <div className='w-screen h-screen absolute z-20 overflow-hidden bg-transparent p-2 font-mono'>
        <div className='w-full h-full relative'>
            <div className='w-full h-auto absolute top-0'></div>
            <div className='w-full h-auto absolute bottom-0 '>
                <MapSelection />
                <div className='w-[300px] h-auto flex'>
                  <Start />
                  <Room />
                </div>
            </div>
            <div className='w-auto h-full absolute left-0'></div>
            <div className='w-auto h-full absolute right-0'>
              <CarSelection />
            </div>
        </div>
    </div>
  )
}


export default LobbyUI;