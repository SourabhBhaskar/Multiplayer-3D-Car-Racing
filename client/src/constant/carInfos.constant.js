import * as THREE from 'three';
import rollsRoyce from '../assets/cars/rollsRoyce.glb';


const rollsRoyceConstnts = {
    model: rollsRoyce,
    chassis: {},
    wheelOptions: {
        axleCs: new THREE.Vector3(0, 0, -1),
        suspensionRestLength: 0.125,
        suspensionStiffness: 24,
        suspensionDirection: new THREE.Vector3(0, -1, 0),
        maxSuspensionTravel: 1,
    },
    wheels: [],
    controls: {
        accelerateForce: 15,
        brakeForce: 1,
        steerAngle:  Math.PI / 4
    }
}


export{ 
    rollsRoyceConstnts,
};


