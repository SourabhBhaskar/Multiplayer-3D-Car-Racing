import { createSlice } from '@reduxjs/toolkit';


const playersSlice = createSlice({
    name: 'playerSlice',
    initialState: {
        data: [
            { player: { name: 'A', socketId: '1' }, car: { name: 'sport' }, isNew: false},
            { player: { name: 'B', socketId: '2' }, car: { name: 'van' }, isNew: false },
            { player: { name: 'C', socketId: '3' }, car: { name: 'roadster' }, isNew: false }, 
            { player: { name: 'D', socketId: '4' }, car: { name: 'suv' }, isNew: false },
            { player: { name: 'E', socketId: '5' }, car: { name: 'monstertruck' }, isNew: false },
          ]
    },
    reducers: {

    }
})


export const {} = playersSlice.actions;
export default playersSlice.reducer;