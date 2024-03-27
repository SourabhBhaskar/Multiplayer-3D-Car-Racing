import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Gltf, Html } from '@react-three/drei';
import gsap from 'gsap';
import { useAssets } from '../../context/context';



function LobbyCar({ player, position, rotation }) {
  const carRef = useRef(null);
  const nameRef = useRef(null);
  const { assets } = useAssets();
  const car = assets.cars.find((c) => c.name === player.carname)

  useEffect(() => {
    const element = carRef.current;
    if(element){
      gsap.fromTo(element.position, { z: position.z-4 }, { z: position.z })
    }
  }, [])

  return (
    <group ref={carRef} position={[position.x, position.y, position.z]} rotation={[rotation.x, rotation.y, rotation.z]}>
      <Gltf src={car.model} />
      <Html style={{translate: '-50%'}}>
        <div className='bg-black bg-opacity-75 text-white px-3 py-1 rounded-md text-sm'>
          {player.username}
        </div>
      </Html>
    </group>
  )
  
  
}

export default LobbyCar;