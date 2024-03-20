import React from 'react';
import { Physics } from '@react-three/rapier';
import Map from '../components/Map';
import Car from '../components/Car';
import CarController from '../components/CarController';
import map1 from '../assets/maps/beach.glb';
import map2 from '../assets/maps/dessert.glb';


function Game() {
  return (
    <Physics debug>
        <Map map={map1}/>
        <Car>
            <CarController/>
        </Car>
    </Physics>
  )
}


export default Game;