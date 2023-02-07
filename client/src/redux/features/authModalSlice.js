import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
    name:"AuthModel",
    initialState:{
        authModalOpen:false,
        signInOrSignUp:"signIn"
    },
    reducers:{
        setAuthModalOpen:(state,action)=>{
            state.authModalOpen = action.payload
        },
        setSignInOrSignUp:(state,action)=>{
            state.signInOrSignUp = action.payload
        }
    }
})

export const {
    setAuthModalOpen,
    setSignInOrSignUp
} = authModalSlice.actions;

export default authModalSlice.reducer;