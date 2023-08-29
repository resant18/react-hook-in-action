/*
Learning Notes:
This component is rendered 4 times.
1. Render the first time and shows loading bookables message.
   Run dispatch function inside useEffect which will call the component again.
2. On the second render still shows the loading  message.
   After getting the data, the hook 'isLoading' value change to false which rerender again.
3. Shows the bookables list with no bookable selected. 
   When isLoading is false and the date is ready, setBookable will cause rerender again for the fourth times.
4. It select the bookable in the bookables list.

The bookable changes rely on both bookable and bookableIndex which sometimes cause render twice.
It can be avoided if bookable is also maintained as redux state instead of as local state.
*/

import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import { getBookables, getNextBookable, setBookableGroup, setBookableIndex } from './BookablesSlice';

export const BookablesList = ({ setBookable }) => {      
   const dispatch = useDispatch();   
   const { group, bookables, bookableIndex, isLoading, error, isPresenting } = useSelector(state => state.bookable);
   const timerRef = useRef(null);
   const nextFocusedButton = useRef();

   const groups = bookables ? [...new Set(bookables.map((b) => b.group))] : [];
   const bookablesInGroup = bookables ? bookables.filter((b) => b.group === group) : [];
   
   // Use useEffect because getBookables fetch data for the component
   // Run render and then useEffect and because the bookables state changed
   // the component rerender again.   
   useEffect(() => {      
      dispatch(getBookables());                  
   }, []);   

   useEffect(() => {      
      if (!isLoading && bookableIndex !== undefined) {                
         setBookable(bookablesInGroup[bookableIndex]);         
      }
   }, [isLoading, bookableIndex, setBookable]);

   useEffect(() =>  {      
      if (!isLoading && bookableIndex !== undefined) {         
         setBookable(bookablesInGroup[bookableIndex]);
      }      
   }, [isLoading, bookableIndex]);

   // Use useEffect because it's working with timers
   useEffect(() => {             
      if (isPresenting) {             
         scheduleNext();
      }
      else {
         clearPresenting();
      }
   });

   const scheduleNext = () => {
      if (timerRef.current === null) {
         timerRef.current = setTimeout(() => {            
            timerRef.current = null;                      
            dispatch(getNextBookable(true));
            setBookable(bookablesInGroup[bookableIndex]);
         }, 3000);
      }
   }

   const clearPresenting = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;      
   }   

   const nextBookable = () => {         
      dispatch(getNextBookable(false));       
   };

   const changeGroup = (e) => {
      dispatch(setBookableGroup(e.target.value));    

      // Restarting the timer so that Presentation Mode shows the first item in the new group for its full, allotted time.
      if (isPresenting) {
         clearPresenting();
         scheduleNext();
      }      
   };
   
   const changeBookable = (selectedIndex) => {      
      dispatch(setBookableIndex(selectedIndex));      
      setBookable(bookablesInGroup[selectedIndex]);
      nextFocusedButton.current.focus();
   }; 

   if (isLoading) {
      return (
         <p><FaSpinner className='icon-loading' />{''}Loading bookables...</p>
      )
   };
   
   if (error) {
      return <p>{error}</p>;
   };

   if (!bookables || !Object.keys(bookables).length || bookables.length === 0) {
      return <p>No bookable data</p>;
   };
   
   return (
      <Fragment>
         <div>            
            <select value={group} onChange={changeGroup}>
               {groups.map((name, i) => (
                  <option key={i}>{name}</option>
               ))}
            </select>
            <ul className='bookables items-list-nav'>
               {bookablesInGroup.map((b, i) => (                  
                  <li key={i} className={i === bookableIndex ? 'selected' : null}>
                     <button className='btn' onClick={() => changeBookable(i)}>
                        {b.title}
                     </button>
                  </li>
               ))}
            </ul>
            <p>
               <button
                  className='btn'                  
                  onClick={nextBookable}
                  ref={nextFocusedButton}
                  autoFocus
               >
                  <FaArrowRight>
                     <span>Next</span>
                  </FaArrowRight>
               </button>
            </p>
         </div>         
      </Fragment>
   );
};
