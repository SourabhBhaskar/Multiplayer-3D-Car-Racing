import React, { useEffect } from 'react';
import { CuboidCollider, RigidBody} from '@react-three/rapier';


function Car({ carInitialState, carInfo }, carRef){
    const chassisRef = carRef.current.chassisRef;
    const wheelsRef = carRef.current.wheelsRef;
    return (
        <RigidBody
            position={carInitialState.position}
            rotation={carInitialState.rotation}
            canSleep={false}
            ref={chassisRef}
            colliders={false}
            type="dynamic"
        >
            <CuboidCollider args={[carInfo.chassis.size.x, carInfo.chassis.size.y-carInfo.wheels[0].radius/2, carInfo.chassis.size.z]} />
            <primitive object={carInfo.chassis.mesh} />
            {carInfo.wheels.map((wheel, index) => (
                <primitive key={index} ref={(ref) => ((wheelsRef.current)[index] = ref)} object={wheel.mesh} />
            ))}
        </RigidBody>
    )
}


export default React.forwardRef(Car);
