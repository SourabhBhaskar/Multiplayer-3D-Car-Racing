import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useAssets } from '../../context/context';


function MapSelection() {
    const { assets } = useAssets();
    const mapListRef = useRef(null);
    const maps = assets.maps;
    const handlePrev = () => {
        mapListRef.current.scrollTo({
            left: mapListRef.current.scrollLeft - 250, 
            behavior: 'smooth'
        });
    }
    
    const handleNext = () => {
        mapListRef.current.scrollTo({
            left: mapListRef.current.scrollLeft + 250, 
            behavior: 'smooth'
        });
    }

    return (
        <div className='w-auto h-auto'>
            <div className='w-[300px] h-[180px] relative rounded-m overflow-hidden rounded-md'>
                <div ref={mapListRef} className='w-full h-full overflow-hidden flex'>
                    { maps.map((map, index) => <img key={index} src={map.icon} className='flex-shrink-0 w-full h-full' />)}
                </div>
                <div className='w-full h-auto absolute bottom-0 flex-shrink-0 flex justify-between bg-slate-200 bg-opacity-50'>
                    <button onClick={handlePrev} >
                        <Icon icon="line-md:chevron-left" />
                    </button>
                    <p className='font-semibold'>{'Beach'}</p>
                    <button onClick={handleNext}>
                        <Icon icon="line-md:chevron-right" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default MapSelection;