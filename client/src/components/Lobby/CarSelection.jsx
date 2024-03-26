import React, { useEffect, useState } from 'react';
import { useAssets } from '../../context/context';


function Car({ value }){

    return (
        <li className='w-auto h-auto text-white text-xl rounded-full p-4 border-2'>
            <img src={value.image} className='w-8 h-8 overflow-hidden' />
        </li>
    )
}


function CarSelection() {
    const { assets } = useAssets();
    const carImages = assets.cars;

    return (
        <div className='w-[100px] h-full absolute right-0 flex justify-center items-center'>
            <div className='w-full h-[500px] flex flex-col'>
                <button className='flex-shrink-0 text-white border-2 border-red-600'>up</button>
                <ul className='border-2 border-red-600 flex-grow overflow-hidden px-4'>
                    {carImages && carImages.map((value, index) => <Car key={index} value={value} />)}
                </ul>
                <button className='flex-shrink-0 text-white border-2 border-red-600'>down</button>
            </div>
        </div>
    )
}

export default CarSelection;