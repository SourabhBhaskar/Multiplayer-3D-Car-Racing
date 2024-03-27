import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAfterPhysicsStep, useRapier } from '@react-three/rapier';


const up = new THREE.Vector3(0, 1, 0)
const _wheelSteeringQuat = new THREE.Quaternion()
const _wheelRotationQuat = new THREE.Quaternion()


export function useCarController(chassisRef, wheelsRef, wheelsInfo){
    const { world } = useRapier();
    const car = useRef(null);

    useEffect(() => {
        const { current: chassis } = chassisRef;
        const { current: wheels } = wheelsRef;

        if (!chassis || !wheels) return;

        const vehicle = world.createVehicleController(chassis);

        const suspensionDirection = new THREE.Vector3(0, -1, 0);

        wheelsInfo.forEach((wheel) => {
            vehicle.addWheel(wheel.position, suspensionDirection, wheel.axleCs, wheel.suspensionRestLength, wheel.radius);
        })

        wheelsInfo.forEach((wheel, index) => {
            vehicle.setWheelSuspensionStiffness(index, wheel.suspensionStiffness);
            vehicle.setWheelMaxSuspensionTravel(index, wheel.maxSuspensionTravel);
        })

        car.current = vehicle;
        return () => {
            car.current = undefined;
            world.removeVehicleController(vehicle);
        }
    }, [])

    useAfterPhysicsStep((world) => {
        if (!car.current) return;

        const controller = car.current

        controller.updateVehicle(world.timestep)

        const { current: wheels } = wheelsRef

        wheels?.forEach((wheel, index) => {
            const wheelAxleCs = controller.wheelAxleCs(index) || 0;
            const connection = controller.wheelChassisConnectionPointCs(index)?.y || 0;
            const suspension = controller.wheelSuspensionLength(index) || 0;
            const steering = controller.wheelSteering(index) || 0;
            const rotationRad = controller.wheelRotation(index) || 0;

            wheel.position.y = connection - suspension;

            _wheelSteeringQuat.setFromAxisAngle(up, steering);
            _wheelRotationQuat.setFromAxisAngle(wheelAxleCs, rotationRad);

            wheel.quaternion.multiplyQuaternions(_wheelSteeringQuat, _wheelRotationQuat);
        })
    })

    return car;
}


export default useCarController;