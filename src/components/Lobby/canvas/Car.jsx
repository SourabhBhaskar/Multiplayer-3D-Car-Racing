import React, { useEffect, useRef, useState } from 'react';
import { Gltf, Html } from '@react-three/drei';
import gsap from 'gsap';
import { usePlayerState } from 'playroomkit';
import carModels from '../../../constant/carModels';
import getBoundingBoxFromScene from '../../../utils/getBoundingBoxFromScene.util';


function Car({ player, position }) {
  const [playerGameState, setPlayerGameState] = usePlayerState(player, 'game', { carname: 'sport' });
  const [playerProfileState, setPlayerProfileState] = usePlayerState(player, 'profile');

  const carRef = useRef(null);
  const carModelRef = useRef(null);

  const [carSize, setCarSize] = useState({ x: 0, y: 0, z: 0 });
  const [_, carModelUrl] = Object.entries(carModels).find(([name, model], index) => name === playerGameState.carname) || [undefined, undefined];
  
  useEffect(() => {
    // Animation
    const element = carRef.current;
    if(element){
      gsap.fromTo(element.position, { z: position.z-4 }, { z: position.z })
    }

    // Bounding-Box
    const size = getBoundingBoxFromScene(carModelRef.current);
    setCarSize(size);
  }, [])

  return  (
    <group ref={carRef} rotation={[0, Math.PI/2, 0]} position={[position.x, position.y, position.z]}>
      <Gltf ref={carModelRef} src={carModelUrl} />
      <Html>
        <div className='-translate-x-[50%] bg-blue-600 px-2 rounded-md'>
          <p>{playerProfileState.name}</p>
        </div>
      </Html>
    </group>
  )
}


export default React.memo(Car);