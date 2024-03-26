import React, { useEffect, useRef } from 'react';
import { Gltf, Html } from '@react-three/drei';
import gsap from 'gsap';
import { useAssets } from '../../context/context';


function LobbyCar({ player, position, rotation }) {
  const carRef = useRef(null);
  const { assets } = useAssets();
  const carModel = assets.cars.find((c) => c.name === player.carname.toLowerCase());

  useEffect(() => {
    const element = carRef.current;
    if(element){
      gsap.fromTo(element.position, { z: position.z-4 }, { z: position.z })
    }
  }, [])

  return (
    <group ref={carRef} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      <Gltf src={carModel.model}  />
      <Html >
        <div>{player.username}</div>
      </Html>
    </group>
  )
}

export default React.memo(LobbyCar);