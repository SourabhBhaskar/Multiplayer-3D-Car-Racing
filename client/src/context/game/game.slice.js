import { createSlice } from "@reduxjs/toolkit";
import map1 from '../../assets/maps/map1.glb';


const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: {
        map: {},
        main_car: {},
        other_car: {}
    },
    reducers: {
        setMainCar: () => {},
        
    }
})


export const {} = gameSlice.actions;
export default gameSlice.reducer;