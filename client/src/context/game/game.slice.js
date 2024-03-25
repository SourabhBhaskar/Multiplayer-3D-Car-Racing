import { createSlice } from "@reduxjs/toolkit";
import map1 from '../../assets/maps/map1.glb';


const gameSlice = createSlice({
    name: 'gameSlice',
    initialState: {
        maps: {
            beach: null,
            dessert: null,
            terrin: null
        },
        cars: {
            
        },
    },
    reducers: {
        setMainCar: () => {

        },
    }
})


export const {} = gameSlice.actions;
export default gameSlice.reducer;