import React from 'react';
import { useNavigate } from 'react-router-dom';


function Introduction() {
  const navigate = useNavigate();
  return (
    <div className='flex gap-2'>
      <button>Play</button>
    </div>
  )
}


export default Introduction;