import React, { Suspense, useEffect, useRef } from 'react';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Map from '../components/Map';
import PlayerCar from '../components/PlayerCar';
import OpponentCar from '../components/OpponentCar';



function Game() {
  return (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <Canvas>
        <ambientLight/>
        <pointLight position={[10, 10, 10]} />
        <gridHelper />
        <axesHelper />
        <OrbitControls />
        <Physics debug>
          {/* <Map map={map1} /> */}
          {/* <PlayerCar /> */}
        </Physics>
      </Canvas>
    </div>
  )
}


export default Game;