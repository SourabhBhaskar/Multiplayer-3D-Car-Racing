import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { myPlayer } from 'playroomkit';
import carIcons from '../../../constant/carIcons';


/**
 * Car
 */
const Car = ({ value }) => {
    const [carName, carIconUrl] = value;
    const handleClick = () => myPlayer().setState('game', { carname: carName });

    return (
        <li onClick={handleClick} className='flex items-center justify-center w-12 h-12 p-2 ring-1 hover:ring-2 bg-slate-200 rounded-full cursor-pointer'>
            <img src={carIconUrl} alt="car icon" className='w-10 h-10' />
        </li>
    );
}


/**
 * Car Selection
 */
function CarSelection() {
    const scrollListRef = useRef(null);
    
    const handleUp = () => {
        scrollListRef.current.scrollTo({
            top: scrollListRef.current.scrollTop - 100, 
            behavior: 'smooth'
        });
    };

    const handleDown = () => {
        scrollListRef.current.scrollTo({
            top: scrollListRef.current.scrollTop + 100, 
            behavior: 'smooth'
        });
    };

    return (
        <div className='w-[50px] h-full absolute right-0 flex justify-center items-center'>
            <div className='w-full h-[60%] flex flex-col items-center gap-1 group'>
                <button onClick={handleUp} className='flex-shrink-0 text-white focus:outline-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
                    <Icon icon="ep:arrow-up-bold" />
                </button>
                <ul ref={scrollListRef} className='flex-grow overflow-hidden flex flex-col gap-2 rounded-full px-2'>
                    {Object.entries(carIcons).map((icon, index) => <Car key={index} value={icon} />)}
                </ul>
                <button onClick={handleDown} className='flex-shrink-0 text-white focus:outline-none -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
                    <Icon icon="ep:arrow-down-bold" />
                </button>
            </div>
        </div>
    )
}


export default CarSelection;