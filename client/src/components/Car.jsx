import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Physics, RigidBody, useRevoluteJoint } from '@react-three/rapier';
import { Sphere } from '@react-three/drei';
// import { DynamicRayCastVehicleController } from '@dimforge/rapier3d-compat';
// // import CarController from './CarController';




function Car() {
  const chassisRef = useRef(null);
  const flwheelRef = useRef(null);
  const frwheelRef = useRef(null);
  const blwheelRef = useRef(null);
  const brwheelRef = useRef(null);
  const flwheelJoint = useRevoluteJoint(chassisRef, flwheelRef, [[-1, -0.2, -1], [0, 0, 0], [1, 0, 0]]);
  const frwheelJoint = useRevoluteJoint(chassisRef, frwheelRef, [[1, -0.2, -1], [0, 0, 0], [1, 0, 0]]);
  const blwheelJoint = useRevoluteJoint(chassisRef, blwheelRef, [[-1, -0.2, 1], [0, 0, 0], [1, 0, 0]]);
  const brwheelJoint = useRevoluteJoint(chassisRef, brwheelRef, [[1, -0.2, 1], [0, 0, 0], [1, 0, 0]]);

  return (
      <group >
        <RigidBody ref={chassisRef} position={[0, 4, 0]}>
          <mesh>
            <boxGeometry args={[1, 0.5, 2]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody>   
        <RigidBody ref={flwheelRef} colliders='ball'>
          <mesh>
            <sphereGeometry args={[0.4]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody> 
        <RigidBody ref={frwheelRef} colliders='ball'>
          <mesh>
            <sphereGeometry args={[0.4]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody> 
        <RigidBody ref={blwheelRef} colliders='ball'>
          <mesh>
            <sphereGeometry args={[0.4]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody> 
        <RigidBody ref={brwheelRef} colliders='ball'>
          <mesh>
            <sphereGeometry args={[0.4]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody> 
      </group>
  )
}

export default Car;


// const JointedThing = () => {
//   const bodyA = useRef(null);
//   const bodyB = useRef(null);
  
//   const joint = useRevoluteJoint(bodyA, bodyB, [
//     // Position of the joint in bodyA's local space
//     [0, 1, 0],
//     // Position of the joint in bodyB's local space
//     [0, -1, 0],
//     // Axis of the joint, expressed in the local-space of
//     // the rigid-bodies it is attached to. Cannot be [0,0,0].
//     [0, 1, 0]
//   ]);

//   return (
//     <group>
//       <RigidBody ref={bodyA} position={[0, 8, 0]}>
//         <mesh>
//           <boxGeometry />
//           <meshNormalMaterial />
//         </mesh>
//       </RigidBody>
//       <RigidBody ref={bodyB}>
//         <mesh>
//           <boxGeometry />
//           <meshNormalMaterial />
//         </mesh>
//       </RigidBody>
//     </group>
//   );
// };


