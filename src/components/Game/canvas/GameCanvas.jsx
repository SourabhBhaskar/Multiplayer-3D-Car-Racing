import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import Map from './Map';
import Cars from './Cars';


function GameCanvas() {
  return (
    <Canvas frameloop >
      <Suspense>
      <gridHelper />
      <axesHelper />
      <OrbitControls />
      <ambientLight />
      <Sky />
      {/* <Stars /> */}
      <Physics debug>
        <Map />
        <Cars />
      </Physics>
      </Suspense>
    </Canvas> 
  )
}


export default GameCanvas;
