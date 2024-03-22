import { configureStore } from '@reduxjs/toolkit';
import socket from './socket/socket.slice';
import loadingSlice from './loading/loadingSlice';


const store = configureStore({
    reducer: {
        socket
    }
})


export default store;