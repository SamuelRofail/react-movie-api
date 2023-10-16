import { createSlice } from "@reduxjs/toolkit";


const MoviesSlice = createSlice({
    name : 'movies',
    initialState:{movies : [{}]},
    reducers:{
        setMovies:function(state,action){
            state.movies = action.payload
        }
    }
})

export const {setMovies} = MoviesSlice.actions
export default MoviesSlice.reducer