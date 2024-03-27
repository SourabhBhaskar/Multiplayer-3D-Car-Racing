import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Introduction from './Pages/Introduction';
import Lobby from './Pages/Lobby';
import Game from './Pages/Game';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Introduction />} />
      <Route path='/lobby' element={<Lobby />} />
      <Route path='/game' element={<Game />} />
    </Routes>
  );
}


export default App;
