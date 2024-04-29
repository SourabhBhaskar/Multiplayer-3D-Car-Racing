import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import _ from 'lodash';
import getBoundingBoxFromScene from "../utils/getBoundingBoxFromScene.util";
import carModels from "../constant/carModels";
import carInfos from '../constant/carInfos';


function useCarInfo(carName){
    const carInfo = _.cloneDeep((carInfos[carName] || carInfos.defaultInfo));
    const gltf = useGLTF(carModels[carName]);
    const scene = useMemo(() => gltf.scene.clone(), [carName]);

    const chassis = {};
    const flwheel = {};
    const frwheel = {};
    const blwheel = {};
    const brwheel = {};
    scene.children.forEach(mesh => {
        const position = mesh.position;
        const size = getBoundingBoxFromScene(mesh);
        switch(mesh.name){
            case 'chassis':
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

    const updatedCarInfo = {
        ...carInfo,
        chassis: { ...chassis },
        wheels: [
           { ...flwheel, ...carInfo.wheelOptions },
           { ...frwheel, ...carInfo.wheelOptions },
           { ...blwheel, ...carInfo.wheelOptions },
           { ...brwheel, ...carInfo.wheelOptions },
        ],
    }

    const memoIzedInfo = useMemo(() => updatedCarInfo, [carName]);
    return memoIzedInfo;
}


export default useCarInfo;