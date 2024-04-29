import React, { Suspense, useState } from 'react';
import { myPlayer, usePlayersList, useMultiplayerState } from 'playroomkit';
import Car from './Car';
import useCarInfo from '../../../hooks/useCarInfo';
import carModels from '../../../constant/carModels';


function Cars() {
    const playersList = usePlayersList();
    const s = useMultiplayerState();
    return (
        <>
            { playersList.map((player, index) => <Car key={player.id} player={player} position={[0, 5, index+20]} rotation={[0, 0, 0]} />)}
        </>
    )
}


export default Cars;