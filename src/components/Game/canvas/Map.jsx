import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Gltf } from '@react-three/drei';
import { useMultiplayerState } from 'playroomkit';
import mapIModels from '../../../constant/mapModels';


function Map() {
  const [mapState, _ ] = useMultiplayerState('map', { name: 'beach' });
  const mapModel = mapIModels[mapState.name];

  return(
    <RigidBody type='fixed' colliders='trimesh'>
      <Gltf src={mapModel} />
    </RigidBody> 
  )
}


export default Map;