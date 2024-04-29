import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { useIsHost, useMultiplayerState } from 'playroomkit';
import mapImages from '../../../constant/mapImages';


/**
 * Map
 */
const Map = ({ map }) => {
    const isHost = useIsHost();
    const mapName = map[0];
    const mapPath = map[1];
    const [globalGameState, setGlobalGameState] = useMultiplayerState('game', { mapname: 'terrin' });

    const handleClick = () => {
        setGlobalGameState({ mapname: mapName });
    }

    return (
        <img onClick={handleClick} src={mapPath} className='flex-shrink-0 w-full h-full' />
    )
}


/**
 * Map Selection
 */
function MapSelection() {
    const mapListRef = useRef(null);
    const maps = Object.entries(mapImages);

    const handleScroll = () => {
        mapListRef.current.scrollTo({
            left: mapListRef.current.scrollLeft - 300,
            behavior: 'smooth'
        });
    }

    return (
        <div className='w-auto h-auto'>
            <div className='w-[300px] h-[180px] relative rounded-m overflow-hidden rounded-md'>
                <div ref={mapListRef} className='w-full h-full overflow-hidden flex'>
                    { maps.map((map, index) => <Map key={index} map={map}/>)}
                </div>
                <div className='w-full h-auto absolute bottom-0 flex-shrink-0 flex justify-between bg-slate-200 bg-opacity-50'>
                    <button onClick={() => handleScroll('prev')} >
                        <Icon icon="line-md:chevron-left" />
                    </button>
                    <p className='font-semibold'>{'Beach'}</p>
                    <button onClick={() => handleScroll('next')}>
                        <Icon icon="line-md:chevron-right" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default MapSelection;