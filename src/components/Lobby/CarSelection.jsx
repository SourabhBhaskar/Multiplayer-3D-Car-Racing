import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useAssets } from '../../context/context';
import { useDispatch } from 'react-redux';
import { setChangeCar } from '../../context/players/players.slice';


const Car = React.memo(({ value }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        const carName = value.name;
        dispatch(setChangeCar(carName))
    }

    return (
        <li onClick={handleClick} className='flex items-center justify-center w-12 h-12 p-2 ring-1 hover:ring-2 bg-slate-200 rounded-full cursor-pointer'>
            <img src={value.icon} alt="car icon" className='w-10 h-10' />
        </li>
    );
})




function CarSelection() {
    const { assets } = useAssets();
    const scrollListRef = useRef(null);
    const carImages = assets.cars;

    const handleUp = () => {
        scrollListRef.current.scrollTo({
            top: scrollListRef.current.scrollTop - 50, 
            behavior: 'smooth'
        });
    };

    const handleDown = () => {
        scrollListRef.current.scrollTo({
            top: scrollListRef.current.scrollTop + 50, 
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
                    {carImages && carImages.map((value, index) => <Car key={index} value={value} />)}
                </ul>
                <button onClick={handleDown} className='flex-shrink-0 text-white focus:outline-none -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
                    <Icon icon="ep:arrow-down-bold" />
                </button>
            </div>
        </div>

    )
}


export default CarSelection;