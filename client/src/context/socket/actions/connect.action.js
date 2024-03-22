import {  io } from 'socket.io-client';

function connectAction(state, action){
    const url = process.env.REACT_APP_SERVER;
    const connection = new io(url, { autoConnect: false });
    connection.connect();
}


export default connectAction;