

function changeCarReducer(state, action){
    state.players[0].carname = action.payload;
}


export default changeCarReducer