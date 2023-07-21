import { createSlice } from '@reduxjs/toolkit';

export const bookablesSlice = createSlice({
   name: 'bookable',   
   initialState: {},
   reducers: {
      getNextBookable: (state, action) => {
         const count = state.bookables.filter(b => b.group === state.group).length;
         
         return {
            ...state,
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