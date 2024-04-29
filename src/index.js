import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GameContextProvider } from './context/game';
import { insertCoin } from 'playroomkit';


const root = ReactDOM.createRoot(document.getElementById('root'));
insertCoin({
  skipLobby: true
}).then(() => {
  root.render(
    <GameContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameContextProvider>
  );
});

