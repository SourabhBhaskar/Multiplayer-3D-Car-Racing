import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing';
import Start from './Pages/Start';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Lobby from './Pages/Lobby';
import Game from './Pages/Game';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/start' element={<Start />} />
      <Route path='/lobby' element={<Lobby />} />
      <Route path='/game' element={<Game />} />
    </Routes>
  );
}


export default App;
