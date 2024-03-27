import * as THREE from 'three';


function getBoundingBoxFromScene(scene) {
    const overallBox = new THREE.Box3();
    scene.traverse((child) => {
        if (child.isMesh) {
            const childBox = new THREE.Box3().setFromObject(child);
            overallBox.union(childBox);
        }
    });
  
    const size = {
        x: overallBox.max.x - overallBox.min.x,
        y: overallBox.max.y - overallBox.min.y,
        z: overallBox.max.z - overallBox.min.z,
    }
    const boundingBox = new THREE.Vector3(size.x / 2, size.y / 2, size.z / 2);
    return boundingBox;
}


export default getBoundingBoxFromScene;