import React, { Suspense, useEffect, useReducer, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Gltf, Html, OrbitControls } from '@react-three/drei';
import JSZip from 'jszip';
import LobbyCar from '../components/Lobby/LobbyCar';
import { useAssets } from '../context/context';
import modelImageMapping from '../utils/modelImageMapping.util';
import { useSelector } from 'react-redux';
import UI from '../components/Lobby/UI';
import lobby from '../assets/lobby.glb';
console.log(lobby)
/**
 * Fetch URL's of Models & Icons
 */
const fetchData = async(setAssets) => {
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
        
        if(relativePath.indexOf('maps/models') !== -1)
          mapModels.push({ name, url });
        else if(relativePath.indexOf('maps/icons') !== -1)
          mapImages.push({ name, url });
        else if(relativePath.indexOf('cars/models') !== -1)
          carModels.push({ name, url });
        else if(relativePath.indexOf('cars/icons') !== -1)
          carImages.push({ name, url });
        else continue;
    }
    
    const maps = modelImageMapping(mapModels, mapImages);
    const cars = modelImageMapping(carModels, carImages);
    setAssets({ maps, cars });
  } catch (error) {
    console.error('Error accessing file from zip:', error);
  }
}


/**
 * Parking Position
 */
const getParkingPostions = (playerCnt) => {
  let positions = null;
  if(playerCnt === 1)
    positions = [{x: 0, y: 0, Z: 0}];
  else if(playerCnt === 2)
    positions = [{x: -2, y: 0, z: 0}, {x: 0, y: 0, z: 0 }];
  else if(playerCnt === 3)
    positions = [{x: 0, y: 0, z: 0 }, {x: 4, y: 0, z: -1}, {x: -4, y: 0, z: -1}];

  return positions;
}


/**
 * Lobby Component
 */
function Lobby() {
  const { assets, setAssets } = useAssets();
  const players = useSelector(s => s.playersSlice).players;
  const positions = getParkingPostions(3);

  useEffect(() => { 
    fetchData(setAssets);
  }, [])
  
  return assets.cars && assets.maps && (
    <div className='w-screen h-screen overflow-hidden bg-black'>
      <UI />
      <Canvas>
        <ambientLight/>
        <pointLight position={[10, 10, 10]} />
        <gridHelper/>
        <axesHelper />
        <OrbitControls />
        <Physics debug>
          <Suspense>
            { players.map((player, index) => <LobbyCar key={index} player={player} position={positions[index]} rotation={{ x: 0, y: Math.PI/2, z: 0}} />)}
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  )
}


export default Lobby;