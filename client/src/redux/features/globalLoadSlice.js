import { createSlice } from "@reduxjs/toolkit";

export const globalLoadSlice = createSlice({
    name:"GlobalLoad",
    initialState:{
        globalLoad:true
    },
    reducers:{
        setGlobalLoading:(state,action)=>{
            state.globalLoad = action.payload
        }
    }
})

export const {
    setGlobalLoading,
} = globalLoadSlice.actions;

export default globalLoadSlice.reducer;