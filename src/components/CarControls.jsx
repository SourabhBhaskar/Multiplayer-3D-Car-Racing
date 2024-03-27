import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls } from '@react-three/drei';


const Controls = ({ carController, carInfo }) => {
    const [, getKeyboardControls] = useKeyboardControls();
    useFrame((state, delta) => {
        if (!carController.current || !carInfo) return

        const controls = getKeyboardControls();
        const controller = carController.current;
    
        const engineForce = Number(controls.forward || -controls.back) * carInfo.controls.accelerateForce - Number(controls.back);
        controller.setWheelEngineForce(0, engineForce);
        controller.setWheelEngineForce(1, engineForce);

        const wheelBrake = Number(controls.brake) * carInfo.controls.brakeForce;
        controller.setWheelBrake(0, wheelBrake);
        controller.setWheelBrake(1, wheelBrake);
        controller.setWheelBrake(2, wheelBrake);
        controller.setWheelBrake(3, wheelBrake);

        const currentSteering = controller.wheelSteering(0) || 0;
        const steerDirection = Number(controls.left) - Number(controls.right);
        const steering = THREE.MathUtils.lerp(currentSteering, carInfo.controls.steerAngle * steerDirection, 0.5);
        controller.setWheelSteering(0, steering);
        controller.setWheelSteering(1, steering);
    })

    return <></>
}


function CarControls({ carController, carInfo }) {
    const controls = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'back', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'brake', keys: ['Space'] },
        { name: 'reset', keys: ['KeyR'] },
    ]

    return (
        <KeyboardControls map={controls}>
            <Controls carController={carController} carInfo={carInfo} />
        </KeyboardControls>
    )
}


export default CarControls;