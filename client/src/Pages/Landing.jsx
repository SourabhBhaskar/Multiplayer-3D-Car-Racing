import React from 'react';
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();
  return (
    <div className='flex gap-2'>
      <button onClick={() => navigate('/signup')}>
        <a href='#'>signup</a>
      </button>
      <button onClick={() => navigate('/login')}>
        <a href='#'>login</a>
      </button>
      <button onClick={() => navigate('/lobby')}>
        <a href='#'>guest</a>
      </button>
    </div>
  )
}


export default Landing;