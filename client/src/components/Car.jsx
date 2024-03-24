import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CuboidCollider, RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useControls } from 'leva';
import useCar from '../hooks/useCar';


const spawn = {
    position: [0, 8, 0],
    rotation: [0, Math.PI / 2, 0]
}



const cameraOffset = new THREE.Vector3(-10, 3, 0)
const cameraTargetOffset = new THREE.Vector3(0, 1.5, 0)

const _bodyPosition = new THREE.Vector3()
const _airControlAngVel = new THREE.Vector3()
const _cameraPosition = new THREE.Vector3()
const _cameraTarget = new THREE.Vector3()


function Car({ carInfo, position=[7, 4, 0], rotation=[0, 0, 0] }){
    const { world, rapier } = useRapier()
    const threeControls = useThree((s) => s.controls)
    const [, getKeyboardControls] = useKeyboardControls()

    const chasisMeshRef = useRef(null)
    const chasisBodyRef = useRef(null)
    const wheelsRef = useRef([])

    const car = useCar(chasisBodyRef, wheelsRef, carInfo.wheels);

    const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 100, -300))
    const [smoothedCameraTarget] = useState(new THREE.Vector3())

    const ground = useRef();

    useFrame((state, delta) => {
        if (!chasisMeshRef.current || !car.current || !!threeControls) return

        const t = 1.0 - Math.pow(0.01, delta)

        /* controls */

        const controller = car.current
        const chassisRigidBody = controller.chassis()

        const controls = getKeyboardControls()

        // rough ground check
        let outOfBounds = false

        const raycastResult = world.castRay(
            new rapier.Ray(chassisRigidBody.translation(), { x: 0, y: -1, z: 0 }),
            1,
            false,
            undefined,
            undefined,
            undefined,
            chassisRigidBody,
        )

        ground.current = undefined

        if (raycastResult) {
            const collider = raycastResult.collider
            const userData = collider.parent()?.userData;
            outOfBounds = userData?.outOfBounds

            ground.current = collider
        }

        const engineForce = Number(controls.forward) * carInfo.controls.accelerateForce - Number(controls.back)

        controller.setWheelEngineForce(0, engineForce)
        controller.setWheelEngineForce(1, engineForce)

        const wheelBrake = Number(controls.brake) * carInfo.controls.brakeForce;
        controller.setWheelBrake(0, wheelBrake)
        controller.setWheelBrake(1, wheelBrake)
        controller.setWheelBrake(2, wheelBrake)
        controller.setWheelBrake(3, wheelBrake)

        const currentSteering = controller.wheelSteering(0) || 0
        const steerDirection = Number(controls.left) - Number(controls.right)

        const steering = THREE.MathUtils.lerp(currentSteering, carInfo.controls.steerAngle * steerDirection, 0.5)

        controller.setWheelSteering(2, steering)
        controller.setWheelSteering(3, steering)

        // air control
        if (!ground.current) {
            const forwardAngVel = Number(controls.forward) - Number(controls.back)
            const sideAngVel = Number(controls.left) - Number(controls.right)

            const angvel = _airControlAngVel.set(0, sideAngVel * t, forwardAngVel * t)
            angvel.applyQuaternion(chassisRigidBody.rotation())
            angvel.add(chassisRigidBody.angvel())

            chassisRigidBody.setAngvel(new rapier.Vector3(angvel.x, angvel.y, angvel.z), true)
        }

        if (controls.reset || outOfBounds) {
            const chassis = controller.chassis()
            chassis.setTranslation(new rapier.Vector3(...spawn.position), true)
            const spawnRot = new THREE.Euler(...spawn.rotation)
            const spawnQuat = new THREE.Quaternion().setFromEuler(spawnRot)
            chassis.setRotation(spawnQuat, true)
            chassis.setLinvel(new rapier.Vector3(0, 0, 0), true)
            chassis.setAngvel(new rapier.Vector3(0, 0, 0), true)
        }

        /* camera */

        // camera position
        const cameraPosition = _cameraPosition

        if (!!ground.current) {
            // camera behind chassis
            cameraPosition.copy(cameraOffset)
            const bodyWorldMatrix = chasisMeshRef.current.matrixWorld
            cameraPosition.applyMatrix4(bodyWorldMatrix)
        } else {
            // camera behind velocity
            const velocity = chassisRigidBody.linvel()
            cameraPosition.copy(velocity)
            cameraPosition.normalize()
            cameraPosition.multiplyScalar(-10)
            cameraPosition.add(chassisRigidBody.translation())
        }

        cameraPosition.y = Math.max(cameraPosition.y, (car.current?.chassis().translation().y ?? 0) + 1)

        smoothedCameraPosition.lerp(cameraPosition, t)
        state.camera.position.copy(smoothedCameraPosition)

        // camera target
        const bodyPosition = chasisMeshRef.current.getWorldPosition(_bodyPosition)
        const cameraTarget = _cameraTarget

        cameraTarget.copy(bodyPosition)
        cameraTarget.add(cameraTargetOffset)
        smoothedCameraTarget.lerp(cameraTarget, t)

        state.camera.lookAt(smoothedCameraTarget)
    })

    return (
        <RigidBody
            position={position}
            rotation={rotation}
            canSleep={false}
            ref={chasisBodyRef}
            colliders={false}
            type="dynamic"
        >
            <CuboidCollider args={[carInfo.chassis.size.x, carInfo.chassis.size.y-carInfo.wheels[0].radius/2, carInfo.chassis.size.z]} />
            <primitive ref={chasisMeshRef} object={carInfo.chassis.mesh} />
            {carInfo.wheels.map((wheel, index) => (
                <primitive key={index} ref={(ref) => ((wheelsRef.current)[index] = ref)} object={wheel.mesh} />
            ))}
        </RigidBody>
    )
}


export default Car;
