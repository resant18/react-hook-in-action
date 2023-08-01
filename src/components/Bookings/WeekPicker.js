import React, { useReducer, useRef } from 'react';
import weekReducer from './WeekSlice';
import { getWeek } from '../../utils/date-wrangler';
import { getPrevWeek, getTodayWeek, getNextWeek, getDateOfWeek } from './WeekSlice';
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from "react-icons/fa";

export const WeekPicker = ({ date }) => {         
   const [week, dispatch] = useReducer(weekReducer, date, getWeek);
   // Use useRef hook to get textbox value instead of directly reaching out to the DOM
   // using getElementById as React updates the DOM in response to state changes.
   const dateRef = useRef();
   
   return (
      <div>
         <p className='date-picker'>
            <button className='btn' onClick={() => dispatch(getPrevWeek())}>
               <FaChevronLeft />
               <span>Prev</span>
            </button>

            <button className='btn' onClick={() => dispatch(getTodayWeek())}>
               <FaCalendarDay />
               <span>Today</span>
            </button>

            <span>
               <input type='text' ref={dateRef} placeholder='eg: 2022-03-04' defaultValue='2022-03-04' />
               <button className='go btn' onClick={() => dispatch(getDateOfWeek(dateRef.current.value))}>
                  <FaCalendarCheck />
                  <span>Go</span>
               </button>
            </span>

            <button className='btn' onClick={() => dispatch(getNextWeek())}>
               <span>Next</span>
               <FaChevronRight />
            </button>
         </p>
         <p>
            {week.start.toDateString()} - {week.end.toDateString()}
         </p>
      </div>
   );
}