import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Game from './Pages/Game';


function App() {
  return (
    <div className='w-screen h-screen bg-black'>
      <Canvas frameloop='demand'>
        <ambientLight/>
        <pointLight position={[10, 10, 10]} />
        <gridHelper />
        <axesHelper />
        <OrbitControls />
          <Game />
      </Canvas>
    </div>
  );
}


export default App;

