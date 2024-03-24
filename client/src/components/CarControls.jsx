import React from 'react';
import { KeyboardControls } from '@react-three/drei';


function CarControls({ children }) {
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
            { children }
        </KeyboardControls>
    )
}


export default CarControls;