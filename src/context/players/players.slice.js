import { createSlice } from '@reduxjs/toolkit';
import changeCarReducer from './reducers/changeCar.rducer';


const playersSlice = createSlice({
    name: 'playerSlice',
    initialState: {
        players: [
            { username: 'Aaaaaaa', socketId: '1', carname: 'sport' },
            { username: 'Bbbbbbb', socketId: '2', carname: 'sport' },
            { username: 'Ccccccc', socketId: '3', carname: 'sport' },
          ]
          
    },
    reducers: {
        setChangeCar: changeCarReducer
    }
})


export const {
    setChangeCar
} = playersSlice.actions;
export default playersSlice.reducer;