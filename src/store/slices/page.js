import { createSlice } from "@reduxjs/toolkit";


const pageSlice = createSlice({
    name : 'page',
    initialState:{page : 1},
    reducers:{
        increasePage: function(state,action){
            state.page = state.page+1
            console.log(` state.page ${ state.page}`);

        },
        decreasePage: function(state,action){
            state.page = state.page-1
        },
        setPage:function(state,action){
            console.log(` action.payload ${ action.payload}`);
            state.page = action.payload
            console.log(` state.page ${ state.page}`);

        }
    }
})

export const {increasePage , decreasePage , setPage} = pageSlice.actions
export default pageSlice.reducer