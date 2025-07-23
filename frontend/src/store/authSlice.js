import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: false,
        loading: true,
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
        }

    }
})
export const {login,logout,setLoading} = authSlice.actions;
export default authSlice.reducer;