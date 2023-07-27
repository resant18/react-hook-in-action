import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk('usersList/getUsers', async (_, {rejectWithValue}) => {
   try {
      let response = await fetch('http://localhost:3001/users');
      let json = await response.json();        
      return json;
   }
   catch (error) {
      return rejectWithValue(error.message);
   }
});

export const UsersSlice = createSlice({
   name: 'users',
   initialState: {
      isLoading: true,
      error: false,
      users: []
   },      
   extraReducers: (builder) => {
      builder
         .addCase(getUsers.fulfilled, (state, action) => {
            return {
               ...state,
               users: action.payload,
               isLoading: false,
               error: false
            };
         })
         .addCase(getUsers.pending, (state, action) => {
            return {
               ...state,
               users: action.payload,
               isLoading: true,
               error: false,
            };
         })
         .addCase(getUsers.rejected, (state, action) => {
            return {
               ...state,
               users: [],
               isLoading: false,
               error: action.payload
            };
         });
      // ,[getUsers.pending]: (state) => {
      //    state.status = 'Fetching users. Please wait for a moment...';
      // },
      // [getUsers.rejected]: (state) => {
      //    state.status = 'Failed to fetch data...';
      // }
   }
})

export default UsersSlice.reducer;