import React, { useReducer } from 'react';
import weekReducer from './WeekSlice';
import { getWeek } from '../../utils/date-wrangler';
import { getPrevWeek, getTodayWeek, getNextWeek, getDateOfWeek } from './WeekSlice';
import { FaChevronLeft, FaCalendarDay, FaChevronRight } from "react-icons/fa";

export const WeekPicker = ({ date }) => {         
   const [week, dispatch] = useReducer(weekReducer, date, getWeek);
   
   return (
   <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch(getPrevWeek())}
        >
          <FaChevronLeft/>
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch(getTodayWeek())}
        >
          <FaCalendarDay/>
          <span>Today</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch(getNextWeek())}
        >
          <span>Next</span>
          <FaChevronRight/>
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
   );
}