import { useEffect, useRef, useState } from 'react';


const keyControlMap = {
    ArrowDown: 'backward',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'forward',
    a: 'left',
    d: 'right',
    s: 'backward',
    w: 'forward',
    A: 'left',
    D: 'right',
    S: 'backward',
    W: 'forward',
    ' ': 'brake',
};


const useVehicleControls = () => {
    const [controls, setControls] = useState({
        backward: false,
        forward: false,
        left: false,
        right: false,
        brake: false,
    });

    useEffect(() => {
        const handleKeydown = (e) => {
            const key = e.key;
            const isValid = keyControlMap[key] !== undefined ? true : false;
            const isChanged = controls[keyControlMap[key]] === false ? true : false;
            if(!isValid || !isChanged) 
                return ;
            const updatedControls = { ...controls };
            updatedControls[keyControlMap[e.key]] = true;
            setControls(updatedControls);
        };

        const handleKeyup = (e) => {
            const key = e.key;
            const isValid = keyControlMap[key] !== undefined ? true : false;
            const isChanged = controls[keyControlMap[key]] === true ? true : false;
            if(!isValid || !isChanged) 
                return ;
            const updatedControls = { ...controls };
            updatedControls[keyControlMap[e.key]] = false;
            setControls(updatedControls);
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('keyup', handleKeyup);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('keyup', handleKeyup);
        };
    }, [controls]);

    return controls;
};


export default useVehicleControls;