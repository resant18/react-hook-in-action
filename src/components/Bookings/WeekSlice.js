import {  createSlice } from '@reduxjs/toolkit';
import { getWeek } from '../../utils/date-wrangler';

export const weekSlice = createSlice({
   name: 'week',   
   initialState: {},
   reducers: {
      getNextWeek: (state, action) => {         
         return getWeek(state.date, 7);
      },
      getPrevWeek: (state, action) => {
         return getWeek(state.date, -7);
      },
      getTodayWeek: (state, action) => {         
         return getWeek(new Date());
      },
      getDateOfWeek: (state, action) => {
         return getWeek(new Date(action.payload));         
      }
   }
});

export const { getNextWeek, getPrevWeek, getTodayWeek, getDateOfWeek } = weekSlice.actions;
export default weekSlice.reducer;