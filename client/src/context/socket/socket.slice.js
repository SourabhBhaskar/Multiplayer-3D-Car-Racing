import { createSlice } from '@reduxjs/toolkit';
import connectAction from './actions/connect.action';


const socketSlice = createSlice({
    name: 'socketSlice',
    initialState: {
        io: null
    },
    reducers: {
        connect: connectAction
    }
})


export const {
    connect
} = socketSlice.actions;
export default socketSlice.reducer;