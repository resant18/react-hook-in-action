// BOOKABLES LIST WITH HOOK & STORE USING REDUX TOOLKIT
import React, { Fragment, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import { sessions, days } from '../../static.json';
import { getBookables, getNextBookable, setBookableGroup, setBookableIndex, setHasDetails } from './BookablesSlice';

export const BookablesList = () => {   
   const dispatch = useDispatch();
   const { group, bookableIndex, hasDetails, isLoading, error, bookables, isPresenting } = useSelector((state) => state.bookable);
   const timerRef = useRef(null);
   const nextFocusedButton = useRef();

   // Use useEffect because getBookables fetch data for the component
   useEffect(() => {
      dispatch(getBookables());
   }, []);    

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
         }, 3000);
      }
   }

   const clearPresenting = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;      
   }
   
   if (isLoading) {
      return (
         <p><FaSpinner className='icon-loading' />{''}Loading bookables...</p>
      )
   }
   
   if (error) {
      return <p>{error}</p>;
   }   

   if (!bookables || !Object.keys(bookables).length || bookables.length === 0) {
      return <p>No bookable data</p>;
   }

   const bookablesInGroup = bookables.filter((b) => b.group === group);
   const groups = [...new Set(bookables.map((b) => b.group))];
   const bookable = bookablesInGroup[bookableIndex];

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
      nextFocusedButton.current.focus();
   };

   const toggleHasDetails = () => {
      dispatch(setHasDetails());
   };   

   return (
      <Fragment>
         <div>
            <select onChange={changeGroup}>
               {groups.map((name, i) => (
                  <option key={i}>{name}</option>
               ))}
            </select>
            <ul className='bookables items-list-nav'>
               {bookablesInGroup.map((b, i) => (
                  <li key={i} className={i === bookableIndex ? "selected" : null}>                     
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
         {bookable && (
            <div className='bookable-details'>
               <div className='item'>
                  <div className='item-header'>
                     <h2>{bookable.title}</h2>
                     <span className='controls'>
                        <input
                           type='checkbox'
                           id='hasDetails'
                           name='hasDetails'
                           checked={hasDetails}
                           onChange={toggleHasDetails}
                        />
                        <label htmlFor='showDetails'>Show Details</label>
                     </span>
                  </div>
                  <p>{bookable.notes}</p>

                  {hasDetails && (
                     <div className='item-details'>
                        <h3>Availability</h3>
                        <div className='bookable-availability'>
                           <ul>
                              {
                                 // Replaced sort() with toSorted() function to avoid a mutation during render.
                                 bookable.days.toSorted().map((d, i) => (
                                    <li key={i}>{days[d]}</li>
                                 ))}
                           </ul>
                           <ul>
                              {bookable.sessions.toSorted().map((s, i) => (
                                 <li key={i}>{sessions[s]}</li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         )}
      </Fragment>
   );
};




