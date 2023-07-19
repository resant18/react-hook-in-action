// BOOKABLES LIST WITH HOOK & STORE USING REDUX TOOLKIT
import React, { Fragment } from 'react';
import { sessions, days } from '../../static.json';
import { useSelector, useDispatch } from 'react-redux';
import { getNextBookable, setBookableGroup, setBookableIndex, setHasDetails } from './BookablesSlice';
import { FaArrowRight } from 'react-icons/fa';

export const BookablesList = () => {   
   const dispatch = useDispatch();
   const { group, bookableIndex, hasDetails, bookables } = useSelector( state => state );            
   const bookablesInGroup = bookables.filter((b) => b.group === group);
   const groups = [...new Set(bookables.map((b) => b.group))];
   const bookable = bookablesInGroup[bookableIndex];      

   const nextBookable = () => {
      dispatch(getNextBookable());
   };

   const changeGroup = (e) => {
      dispatch(setBookableGroup(e.target.value));
   };
   
   const changeBookable = (selectedIndex) => {      
      dispatch(setBookableIndex(selectedIndex));
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




