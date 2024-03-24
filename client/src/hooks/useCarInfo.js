import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import getBoundingBoxFromScene from "../utils/getBoundingBoxFromScene.util";


function useCarInfo(constants) {
    const gltf = useLoader(GLTFLoader, constants.model);
    const meshes = gltf.scene.children;

    const chassis = {};
    const flwheel = {};
    const frwheel = {};
    const blwheel = {};
    const brwheel = {};
    meshes.forEach(mesh => {
        const position = mesh.position;
        const size = getBoundingBoxFromScene(mesh);
        switch(mesh.name){
            case 'chassisbody':
                chassis.size = size;
                chassis.mesh = mesh;
            case 'flwheel':
                flwheel.position = position;
                flwheel.size = size;
                flwheel.radius = size.y;
                frwheel.mesh = mesh;
                break;
            case 'frwheel':
                frwheel.position = position;
                frwheel.size = size;
                frwheel.radius = size.y;
                flwheel.mesh = mesh;
                break;
            case 'blwheel':
                blwheel.position = position;
                blwheel.size = size;
                blwheel.radius = size.y;
                blwheel.mesh = mesh;
                break;
            case 'brwheel':
                brwheel.position = position;
                brwheel.size = size;
                brwheel.radius = size.y;
                brwheel.mesh = mesh;
                break;
        }
    });
    
    const carInfo = {
        ...constants,
        chassis: { ...chassis },
        wheels: [
           { ...flwheel, ...constants.wheelOptions },
           { ...frwheel, ...constants.wheelOptions },
           { ...blwheel, ...constants.wheelOptions },
           { ...brwheel, ...constants.wheelOptions },
        ],
    }

    return carInfo;
}


export default useCarInfo;

