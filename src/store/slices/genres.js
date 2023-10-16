import { createSlice } from "@reduxjs/toolkit";


const genresSlice = createSlice({
    name : 'genres',
    initialState:{genres : [{}]},
    reducers:{
        setGenres:function(state,action){
            console.log(action.payload);
            state.genres = action.payload
        }
    }
})

export const {setGenres} = genresSlice.actions
export default genresSlice.reducer