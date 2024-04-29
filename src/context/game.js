import React, { createContext, useState, useContext } from "react";


const gameContext = createContext();
const GameContextProvider = ({ children }) => {
    const [gameState, setGameState] = useState({
        players: [
            { username: 'Ironman', socketId: 'im11', carname: 'sport' },
            { username: 'Captan America', socketId: 'ca11', carname: 'sport' },
            { username: 'Thor', socketId: 't11', carname: 'sport' },
        ]
    });
    return (
        <gameContext.Provider value={[gameState, setGameState]}>
            {children}
        </gameContext.Provider>
    );
};


const useGameContext = () => {
    return useContext(gameContext);
};


export { GameContextProvider, useGameContext };
