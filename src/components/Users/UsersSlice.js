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
      selectedUserIndex: 0,      
      isPresenting: true,
      isLoading: true,
      error: false,
      users: []
   },      
   extraReducers: (builder) => {
      builder
         .addCase(getUsers.fulfilled, (state, action) => {
            return {
               ...state,
               isPresenting: true,
               users: action.payload,
               isLoading: false,
               error: false
            };
         })
         .addCase(getUsers.pending, (state, action) => {
            return {
               ...state,
               isPresenting: false,
               users: action.payload,
               isLoading: true,
               error: false,
            };
         })
         .addCase(getUsers.rejected, (state, action) => {
            return {
               ...state,
               isPresenting: false,
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
   },
   reducers: {
      getNextUser: (state, action) => {
         const count = state.users.length;
         return {
            ...state,
            selectedUserIndex: (state.selectedUserIndex + 1) % count,
            isPresenting: action.payload,
         }
      },
      setUserIndex: (state, action) => {
         return {
            ...state,         
            selectedUserIndex: action.payload,
            isPresenting: false
         }
      }
   }
})

export const { getNextUser, setUserIndex } = UsersSlice.actions;
export default UsersSlice.reducer;
