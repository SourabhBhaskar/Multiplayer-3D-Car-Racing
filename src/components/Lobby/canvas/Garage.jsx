import React, { useEffect, useRef } from 'react';
import { PointLightHelper } from 'three';
import lobbyModels from '../../../constant/lobbyModels';
import { Cloud, Gltf, Sky, Sparkles, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';


function Garage() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 2, 7.5);
  }, [])

  return (
    <group>
      <Gltf src={lobbyModels.garage} />
    </group>
  )
}


export default Garage;