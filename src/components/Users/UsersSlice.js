import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('usersList/getUsers', async () => {
   let response = await fetch('http://localhost:3001/users');
   let json = await response.json();        
   return json;
});

export const UsersSlice = createSlice({
   name: 'users',
   initialState: {},      
   extraReducers: {
      [getUsers.fulfilled]: (state, action) => {
         return {
            ...state,
            data: action.payload
         }
      }
      // ,[getUsers.pending]: (state) => {
      //    state.status = 'Fetching users. Please wait for a moment...';
      // },
      // [getUsers.rejected]: (state) => {
      //    state.status = 'Failed to fetch data...';
      // }
   }
})

export default UsersSlice.reducer;