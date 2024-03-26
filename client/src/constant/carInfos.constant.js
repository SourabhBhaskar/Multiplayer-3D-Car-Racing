import * as THREE from 'three';


export let zipFile = null;

const rollsRoyceConstnts = {
    model: '',
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
        accelerateForce: 50,
        brakeForce: 1,
        steerAngle:  Math.PI / 4
    }
}


export{ 
    rollsRoyceConstnts,
};


