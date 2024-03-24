import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Gltf } from '@react-three/drei';


function Map({ map }) {
  const model = useLoader(GLTFLoader, map);
  console.log(model)
  return(
    <RigidBody type='fixed' colliders='trimesh'>
      <Gltf src={map} />
    </RigidBody>
  )
}



// function Map({ map }) {
//   const model = useLoader(GLTFLoader, map);
//   console.log(model)
//   return(
//     <RigidBody type='fixed' rotation={[-Math.PI/2, 0, 0]}>
//       <mesh>
//         <planeGeometry args={[100, 100]} />
//         <meshNormalMaterial />
//       </mesh>
//     </RigidBody>

//   )
// }


export default Map;



