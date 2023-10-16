import { createSlice } from "@reduxjs/toolkit";


const favoritesSlice = createSlice({
    name : 'favorites',
    initialState:{favorites : []},
    reducers:{
        addToFavo:function(state,action){
            console.log(action.payload);
            // state.favorites = action.payload
            state.favorites.push(action.payload)
        },
        removeFromFavo:function(state,action){
            // state.favorites = action.payload
            let newState = state.favorites.includes(action.payload)
            console.log(newState);
            state.favorites.splice(0,1)
        }
    }
})

export const {addToFavo ,removeFromFavo } = favoritesSlice.actions
export default favoritesSlice.reducer