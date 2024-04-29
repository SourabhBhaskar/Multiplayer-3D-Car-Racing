import React, { useState, useEffect } from 'react';
import { usePlayersList, myPlayer } from 'playroomkit';
import Car from './Car';


/**
 * Parking Position
 */
function getParkingPosition(playerCnt){
    if(playerCnt === 1) 
      return [{x: 0, y: 0, z: 0}];
    else if(playerCnt === 2) 
      return [{x: -2, y: 0, z: 0}, {x: 2, y: 0, z: 0}];
    else if(playerCnt === 3)
      return [{x: 0, y: 0, z: 0}, {x: -4, y: 0, z: -1}, {x: 4, y: 0, z: -1}];
    else if(playerCnt === 4)
      return [{x: -2, y: 0, z: 0}, {x: 2, y: 0, z: 0}, {x: -6, y: 0, z: -1}, {x: 6, y: 0, z: -1}];
    else if(playerCnt === 5)
      return [{x: 0, y: 0, z: 0}, {x: -4, y: 0, z: -1}, {x: 4, y: 0, z: -1}, {x: -8, y: 0, z: -2}, {x: 8, y: 0, z: -2}];
}


function Cars() {
    const playersList = usePlayersList();
    const myPlayerId = myPlayer().id;
    const [playersId, setPlayersId] = useState(playersList.map((p) => p.id));
    const [positions, setPositions] = useState(getParkingPosition(playersList.length));

    useEffect(() => {
      // Player Re-arrange
      const pIds = [...playersList.map((p) => p.id)];
      const myPlayerIndex = pIds.indexOf(myPlayerId);
      const temp = pIds[0];
      pIds[0] = pIds[myPlayerIndex];
      pIds[myPlayerIndex] = temp;
      setPlayersId(pIds); 

      // Position
      const p = getParkingPosition(playersList.length);
      setPositions(p);
    }, [playersList.length]);

    return (
        <group>
            { playersId.map((playerId, index) => {
                const player = playersList.find(player => player.id === playerId);
                return (
                <Car 
                  key={index} 
                  player={player} 
                  position={positions[index]}
                />
                )
            })}
        </group>
    )
}


export default Cars;
