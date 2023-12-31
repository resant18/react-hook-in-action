import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBookables =  createAsyncThunk('bookable/getBookables', async (_, { rejectWithValue }) => {
   try {
      let response = await fetch('http://localhost:3001/bookables');
      let json = await response.json();      
      return json;
   }
   catch (error) {            
      return rejectWithValue(error.message);
   }
});

export const bookablesSlice = createSlice({
   name: 'bookable',   
   initialState: {
      group: "Rooms",
      bookableIndex: 0,
      hasDetails: true,
      bookables:[],
      isPresenting: false,
      isLoading: true,
      error: false
   },
   extraReducers: (builder) => {
      builder
         .addCase(getBookables.fulfilled, (state, action) => {
            return {
               ...state,
               bookables: action.payload,
               isPresenting: true,
               isLoading: false,
               error: false  
            }
         })
         .addCase(getBookables.pending, (state, action) => {
            return {
               ...state,
               bookables: action.payload,
               isPresenting: false,
               isLoading: true,
               error: false                              
            }
         })
         .addCase(getBookables.rejected, (state, action) => {            
            return {
               ...state,
               bookables: [],
               isPresenting: false,
               isLoading: false,
               error: action.payload
            }
         })
   },
   reducers: {      
      getNextBookable: (state, action) => {
         const count = state.bookables.filter(b => b.group === state.group).length;
         
         return {
            ...state,
            isPresenting: action.payload,
            bookableIndex: (state.bookableIndex + 1)  % count,
         }         
      },
      setBookableGroup: (state, action) => {
         return  {
            ...state,
            group: action.payload,            
            bookableIndex: 0,
            hasDetails: false,
         }
      },
      setBookableIndex: (state, action) => {
         return {
            ...state,
            isPresenting: false,
            bookableIndex: action.payload
         }
      },
      setHasDetails: (state, action) => {
         return {
            ...state,
            hasDetails: !state.hasDetails
         }
      }
   }   
})

// this is for dispatch
export const { getNextBookable, setBookableGroup, setBookableIndex, setHasDetails } = bookablesSlice.actions;

//this is for configureStore
export default bookablesSlice.reducer; 