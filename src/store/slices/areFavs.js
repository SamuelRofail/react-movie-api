import { createSlice } from "@reduxjs/toolkit";


const areFavsSlice = createSlice({
    name : 'areFavs',
    initialState:{areFavs : []},
    reducers:{
        changeFavs:function(state,action){
            state.areFavs.push(action.payload) 
        },
        emptyFavs:function(state,action){
            state.areFavs = []
        },
        editFavs:function async(state,action){
            state.areFavs.map((f) => {
                if(f.index == action.payload){
                    if(f.is){
                        f.is = false
                    }else{
                        f.is = true
                    }
                }
            })

        },
    }
})

export const {changeFavs,emptyFavs,editFavs} = areFavsSlice.actions
export default areFavsSlice.reducer