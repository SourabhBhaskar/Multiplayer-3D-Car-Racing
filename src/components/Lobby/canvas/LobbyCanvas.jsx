import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Garage from './Garage';
import Cars from './Cars';


function LobbyCanvas() {
  return (
    <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]} />
      <gridHelper/>
      <axesHelper />
      <OrbitControls />
      <Physics debug>
        <Garage />
        <Cars />
      </Physics>
    </Canvas>
  )
}


export default LobbyCanvas;