import React, { useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";


const cameraOffset = new THREE.Vector3(-10, 3, 0);
const cameraTargetOffset = new THREE.Vector3(0, 1.5, 0);
const _bodyPosition = new THREE.Vector3();
const _cameraTarget = new THREE.Vector3();


function ChaseCamera({ carController }, carRefs){
    const _cameraPosition = new THREE.Vector3();
    const [smoothedCameraPosition] = useState(new THREE.Vector3(0, 100, -300));
    const [smoothedCameraTarget] = useState(new THREE.Vector3());

    useFrame((state, delta) => {
        if (!carController.current) 
            return;

        const carBody = carRefs.chassisBodyRef.current;
        const carMesh = carRefs.chassisMeshRef.current;
        if(!carBody || !carMesh)
            return ;

        const controller = carController.current;
        const t = 1.0 - Math.pow(0.01, delta);
        const cameraPosition = _cameraPosition;

        const velocity = carBody.linvel()
        cameraPosition.copy(velocity)
        cameraPosition.normalize()
        cameraPosition.multiplyScalar(-10)
        cameraPosition.add(carBody.translation())

        cameraPosition.y = Math.max(cameraPosition.y, (controller?.chassis().translation().y ?? 0) + 1)
        smoothedCameraPosition.lerp(cameraPosition, t)
        state.camera.position.copy(smoothedCameraPosition)

        const bodyPosition = carMesh.getWorldPosition(_bodyPosition)
        const cameraTarget = _cameraTarget

        cameraTarget.copy(bodyPosition)
        cameraTarget.add(cameraTargetOffset)
        smoothedCameraTarget.lerp(cameraTarget, t)
        state.camera.lookAt(smoothedCameraTarget)
    })

    return (
        <></>
    )
}


export default React.forwardRef(ChaseCamera);