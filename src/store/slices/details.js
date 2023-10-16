import { createSlice } from "@reduxjs/toolkit";


const detailsSlice = createSlice({
    name : 'details',
    initialState:{details : false},
    reducers:{
        setDetails:function(state,action){
            state.details = action.payload
        }
    }
})

export const {setDetails} = detailsSlice.actions
export default detailsSlice.reducer