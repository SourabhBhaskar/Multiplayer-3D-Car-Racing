import React, { createRef, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {} from '@react-three/drei';
import { RigidBody, useAfterPhysicsStep, vec3, useRapier, CuboidCollider } from '@react-three/rapier';
import { DynamicRayCastVehicleController } from '@dimforge/rapier3d-compat';



const up = new THREE.Vector3(0, 1, 0)
const _wheelSteeringQuat = new THREE.Quaternion()
const _wheelRotationQuat = new THREE.Quaternion()

const wheelOptions = {
  directionCs: new THREE.Vector3(0, -1, 0),
  axleCs: new THREE.Vector3(0, 0, -1),
  suspensionRestLength: 0.125,
  suspensionStiffness: 24,
  maxSuspensionTravel: 1,
  radius: 0.15,
}

const wheels = [
  { chassisConnectionCs: new THREE.Vector3(-0.65, -0.15, -0.45) },
  { chassisConnectionCs: new THREE.Vector3(-0.65, -0.15, 0.45) },
  { chassisConnectionCs: new THREE.Vector3(0.65, -0.15, -0.45) },
  { chassisConnectionCs: new THREE.Vector3(0.65, -0.15, 0.45) },
];


function Vehicle() {
  const { world } = useRapier();
  const chassisRef = useRef(null);
  const wheelsRef = useRef(wheels.map(() => createRef()));
  const vehicleController = useRef(null);

  useEffect(() => {
      if (!chassisRef.current || !wheelsRef.current) 
        return;

      const vehicle = world.createVehicleController(chassisRef.current);

      wheels.forEach((wheel, index) => {
        const { chassisConnectionCs } = wheel;
        const { directionCs, axleCs, suspensionRestLength, radius, suspensionStiffness, maxSuspensionTravel } = wheelOptions;
        vehicle.addWheel(chassisConnectionCs, directionCs, axleCs, suspensionRestLength, radius);
        vehicle.setWheelSuspensionStiffness(index, suspensionStiffness);
        vehicle.setWheelSuspensionStiffness(index, maxSuspensionTravel);
      })

      vehicleController.current = vehicle;
      return () => {
          vehicleController.current = undefined
          world.removeVehicleController(vehicle.wheelChassisConnectionPointCs(0));
      }
  }, [])
  useAfterPhysicsStep((world) => {
    if (!vehicleController.current) return

    const controller = vehicleController.current

    controller.updateVehicle(world.timestep)

    const { current: wheels } = wheelsRef

    wheels?.forEach((wheel, index) => {
        const wheelAxleCs = controller.wheelAxleCs(index)
        const connection = controller.wheelChassisConnectionPointCs(index)?.y || 0
        const suspension = controller.wheelSuspensionLength(index) || 0
        const steering = controller.wheelSteering(index) || 0
        const rotationRad = controller.wheelRotation(index) || 0

        wheel.position.y = connection - suspension

        _wheelSteeringQuat.setFromAxisAngle(up, steering)
        _wheelRotationQuat.setFromAxisAngle(wheelAxleCs, rotationRad)

        wheel.quaternion.multiplyQuaternions(_wheelSteeringQuat, _wheelRotationQuat)
    })
})


  useFrame((state, delta) => {
    vehicleController.current.setWheelEngineForce(0, 1000);
    vehicleController.current.setWheelEngineForce(1, 1000);
    // vehicleController.current.setWheelEngineForce(2, 1000);
    // vehicleController.current.setWheelEngineForce(3, 1000);
  })

  return (
    <RigidBody
      position={[0, 4, 0]}
      rotation={[0, 0, 0]}
      canSleep={false}
      ref={chassisRef}
      colliders={false}
      type="dynamic"
    >
      <CuboidCollider args={[0.8, 0.2, 0.4]} />
      <mesh >
          <boxGeometry args={[1.6, 0.4, 0.8]} />
          <meshNormalMaterial />
      </mesh>
      {wheels.map((wheel, index) => (
          <group key={index} ref={(ref) => ((wheelsRef.current)[index] = ref)} position={wheels[index].chassisConnectionCs}>
              <group rotation-x={-Math.PI / 2}>
                  <mesh>
                      <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
                      <meshStandardMaterial color="#222" />
                  </mesh>
                  <mesh scale={1.01}>
                      <cylinderGeometry args={[0.15, 0.15, 0.25, 6]} />
                      <meshStandardMaterial color="#fff" wireframe />
                  </mesh>
              </group>
          </group>
      ))}
    </RigidBody>
  )
}

export default Vehicle