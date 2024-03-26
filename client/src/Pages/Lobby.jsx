import React, { Suspense, useEffect, useReducer, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Gltf, Html, OrbitControls } from '@react-three/drei';
import JSZip from 'jszip';
import LobbyCar from '../components/Lobby/LobbyCar';
import CarSelection from '../components/Lobby/CarSelection';
import { useAssets } from '../context/context';
import modelImageMapping from '../utils/modelImageMapping.util';


const getParkingPostions = (playerCnt) => {
  let positions = null;
  if(playerCnt === 1)
    positions = [{x: 1, y: 0, Z: 0}];
  else if(playerCnt === 2)
    positions = [{x: -2, y: 0, z: 0}, {x: 0, y: 0, z: 0 }];
  else if(playerCnt === 3)
    positions = [{x: 0, y: 0, z: 0 }, {x: 4, y: 0, z: -1}, {x: -4, y: 0, z: -1}];
  else if(playerCnt === 4)
    positions = [{x: 2, y: 0, z: 0}, {x: -2, y: 0, z: 0}, {x: 6, y: 0, z: -1}, {x: -6, y: 0, z: -1}];
  else if(playerCnt === 5)
    positions = [{x: 0, y: 0, z: 0}, {x: 4, y: 0, z: -1}, {x: -4, y: 0, z: -1}, {x: 8, y: 0, z: -2}, {x: -8, y: 0, z: -2}];

  return positions;
}


const initialState = {
  players: [
    { username: 'A', socketId: '1', carname: 'sport' },
    { username: 'B', socketId: '2', carname: 'sport' },
    { username: 'C', socketId: '3', carname: 'sport' },
    { username: 'D', socketId: '4', carname: 'sport' },
    { username: 'E', socketId: '5', carname: 'sport' },
  ]
}

const reducer = (state, action) => {

}




function Lobby() {
  const { assets, setAssets } = useAssets();
  const [state, dispatch] = useReducer(reducer, initialState);
  const positions = getParkingPostions(state.players.length);

  useEffect(() => { 
    const fetchData = async() => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER + '/lobby');
        const blob = await response.blob();
        const zip = new JSZip();
        const zipFile = await zip.loadAsync(blob);

        const mapModels = [];
        const mapImages = [];
        const carModels = [];
        const carImages = [];
  
        for(const [relativePath, zipEntry] of Object.entries(zipFile.files)) {
            if(zipEntry.dir) 
                continue;

            const fileBlob = await zipEntry.async("blob");
            const name = zipEntry.name.split('/').pop();
            const url = URL.createObjectURL(fileBlob);
            
            if(relativePath.startsWith('maps/models'))
              mapModels.push({ name, url });
            else if(relativePath.startsWith('maps/images'))
              mapImages.push({ name, url });
            else if(relativePath.startsWith('cars/models'))
              carModels.push({ name, url });
            else if(relativePath.startsWith('cars/images'))
              carImages.push({ name, url });
            else continue;
        }
        
        const maps = modelImageMapping(mapModels, mapImages);
        const cars = modelImageMapping(carModels, carImages);
        setAssets({ maps, cars })
      } catch (error) {
        console.error('Error accessing file from zip:', error);
      }
    }
    fetchData();
  }, [])
  
  return (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <CarSelection />
      <Canvas>
        <ambientLight/>
        <pointLight position={[10, 10, 10]} />
        <gridHelper />
        <axesHelper />
        <OrbitControls />
        <Physics debug>
          <Suspense>
            {assets.cars && state.players.map((player, index) => <LobbyCar key={index} player={player} position={positions[index]} rotation={{ x: 0, y: Math.PI/2, z: 0}} />)}
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  )
}

export default Lobby;

