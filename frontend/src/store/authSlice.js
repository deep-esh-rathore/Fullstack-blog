import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: false,
        loading: true,
        message: null,
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload.user;
            state.status = true;
            state.loading = false;
        },
        logout:(state)=>{
            state.user = null;
            state.status = false;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload; // dynamically set message
        },
        clearMessage: (state) => {
            state.message = null; // clear after some time or when dismissed
        }

    }
})
export const {login,logout,setLoading,setMessage,clearMessage} = authSlice.actions;
export default authSlice.reducer;