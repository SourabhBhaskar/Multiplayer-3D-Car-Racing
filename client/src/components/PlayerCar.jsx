import { RigidBody, CuboidCollider } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import useCarInfo from '../hooks/useCarInfo';
import { rollsRoyceConstnts } from '../constant/carInfos.constant';
import useCarController from '../hooks/useCarController';
import CarControls from './CarControls';
import ChaseCamera from './ChaseCamera';


function PlayerCar({ 
    initialState={ 
        position: [0, 50, 0], 
        rotation: [0, 0, 0]
    } 
}) {

    const chassisBodyRef = useRef(null);
    const chassisMeshRef = useRef(null);
    const wheelsRef = useRef([]);
    
    const carInfo = useCarInfo(rollsRoyceConstnts);
    const carController = useCarController(chassisBodyRef, wheelsRef, carInfo.wheels)
    console.log(carInfo)
    return (
        <RigidBody position={initialState.position}
            rotation={initialState.rotation}
            canSleep={false}
            ref={chassisBodyRef}
            colliders={false}
            type="dynamic"
        >
            <CuboidCollider args={[carInfo.chassis.size.x, carInfo.chassis.size.y-carInfo.wheels[0].radius/2, carInfo.chassis.size.z]} />
            {<primitive ref={chassisMeshRef} object={carInfo.chassis.mesh} />}
            {carInfo.wheels.map((wheel, index) => (
                <primitive key={index} ref={(ref) => ((wheelsRef.current)[index] = ref)} object={wheel.mesh} />
            ))}
            <CarControls carController={carController} carInfo={carInfo} />
            <ChaseCamera ref={{chassisBodyRef, chassisMeshRef}} carController={carController} />
        </RigidBody>
    )
}

export default PlayerCar;