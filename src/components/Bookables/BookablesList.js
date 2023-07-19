// BOOKABLES LIST WITH HOOK
import React, { Fragment, useReducer } from 'react';
import { bookables, sessions, days } from '../../static.json';
import { reducer } from './reducer';
import { FaArrowRight } from 'react-icons/fa';

const initialState = {
   group: 'Rooms',
   bookableIndex: 0,
   hasDetails: true,
   bookables,
};

export const BookablesList = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { group, bookableIndex, hasDetails, bookables } = state;
   const bookablesInGroup = bookables.filter((b) => b.group === group);
   const groups = [...new Set(bookables.map((b) => b.group))];
   const bookable = bookablesInGroup[bookableIndex];

   const nextBookable = () => {
      dispatch({
         type: 'NEXT_BOOKABLE',
      });
   };

   const changeGroup = (e) => {
      dispatch({
         type: 'SET_GROUP',
         payload: e.target.value,
      });
   };
   
   const changeBookable = (selectedIndex) => {
      dispatch({
         type: 'SET_BOOKABLE',
         payload: selectedIndex,
      });
   };

   const toggleHasDetails = () => {
      dispatch({
         type: 'TOGGLE_HAS_DETAILS',
      });
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
                  <li key={i} className={i === bookableIndex ? 'selected' : null}>
                     {/* () => setBookableIndex(i) is called lazy initial state, to prevent function run  every time this component is refreshed*/}
                     <button className='btn' onClick={() => changeBookable(i)}>
                        {b.title}
                     </button>
                  </li>
               ))}
            </ul>
            <p>
               <button
                  className='btn'
                  //onClick={() => setBookableIndex((i) => (i + 1) % bookablesInGroup.length)} this is the same as onClick={nextBookable}
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
                              {bookable.days.sort().map((d, i) => (
                                 <li key={i}>{days[d]}</li>
                              ))}
                           </ul>
                           <ul>
                              {bookable.sessions.sort().map((s, i) => (
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