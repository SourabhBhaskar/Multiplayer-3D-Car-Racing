import React from 'react';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Map from '../components/Map';
import Vehicle from '../components/Vehicle';
import map1 from '../assets/maps/beach.glb';
import map2 from '../assets/maps/dessert.glb';


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
          <Map map={map1} />
          <Vehicle />
        </Physics>
      </Canvas>
    </div>
  )
}


export default Game;