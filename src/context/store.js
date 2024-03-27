import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './players/players.slice';

const store = configureStore({
    reducer: {
        playersSlice
    }
})


export default store;