import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sessions, days } from '../../static.json';
import { setHasDetails } from './BookablesSlice';

export const BookablesDetails = () => {
   const { bookables, bookableIndex, hasDetails } = useSelector((state) => state.bookable);
   const dispatch = useDispatch();   
   const bookable = bookables ? bookables[bookableIndex] : null;

   const toggleHasDetails = () => {
      dispatch(setHasDetails());
   };

   return bookable ?
      (
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
      ) : null;   
};