import React, { useRef } from "react";
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { myPlayer, usePlayerState } from "playroomkit";
import useCarInfo from "../../../hooks/useCarInfo";
import CarControls from "./CarControls";
import useCarController from "../../../hooks/useCarController";
import ChaseCamera from "./ChaseCamera";


function Car({ player, position, rotation }) {
    const myPlayerId = myPlayer().id;
    const [playerCarState, setPlayerCarState] = usePlayerState(player, 'car', { name: 'sport' });
    const carInfo = useCarInfo(playerCarState.name);

    const chassisBodyRef = useRef(null);
    const chassisMeshRef = useRef(null);
    const wheelMeshRefs = useRef([]);

    const carController = useCarController(chassisBodyRef, wheelMeshRefs, carInfo.wheels);
    return (
        <RigidBody 
            position={position}
            rotation={rotation}
            canSleep={false}
            ref={chassisBodyRef}
            colliders={false}
            type="dynamic"
            
        >
            <CuboidCollider args={[carInfo.chassis.size.x, carInfo.chassis.size.y-carInfo.wheels[0].radius/2, carInfo.chassis.size.z]} />
            {<primitive ref={chassisMeshRef} object={carInfo.chassis.mesh} />}
            {carInfo.wheels.map((wheel, index) => (
                <primitive key={index} ref={(ref) => ((wheelMeshRefs.current)[index] = ref)} object={wheel.mesh} />
            ))}
            { player.id === myPlayerId && <CarControls carController={carController} carInfo={carInfo} />}
            { player.id === myPlayerId && <ChaseCamera ref={{chassisBodyRef, chassisMeshRef}} carController={carController} />}
        </RigidBody> 
    );
}



export default React.memo(Car);
