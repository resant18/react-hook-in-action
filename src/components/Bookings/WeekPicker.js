import React, { useReducer, useState, useRef } from 'react';
import weekReducer from './WeekSlice';
import { getWeek } from '../../utils/date-wrangler';
import { getPrevWeek, getTodayWeek, getNextWeek, getDateOfWeek } from './WeekSlice';
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from "react-icons/fa";

export const WeekPicker = ({ date }) => {         
  const [week, dispatch] = useReducer(weekReducer, date, getWeek);
  // Use useRef hook to get textbox value instead of directly reaching out to the DOM
  // using getElementById as React updates the DOM in response to state changes.
  //  const dateRef = useRef();

  // Even better to use useState to manage the custome date textbox
  // because the texbox value is part of component's state.
  const [customDate, setCustomDate] = useState('');

  const changeTodayWeek = () => {
    const todayDateString = new Date().toLocaleDateString('en-CA');
    setCustomDate(todayDateString);
    dispatch(getTodayWeek());
  }
   
  return (
    <div>
        <p className='date-picker'>
          <button className='btn' onClick={() => dispatch(getPrevWeek())}>
              <FaChevronLeft />
              <span>Prev</span>
          </button>

          <button className='btn' onClick={changeTodayWeek}>
              <FaCalendarDay />
              <span>Today</span>
          </button>

          <span>
              <input type='text' 
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                placeholder='eg: 2022-03-04' />
              <button className='go btn' onClick={() => dispatch(getDateOfWeek(customDate))}>
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