// BOOKABLES LIST WITHOUT HOOK
import React, { Fragment, useState } from "react";
import { bookables, sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export const BookablesList = () => {
   const [group, setGroup] = useState("Rooms");
   const bookablesInGroup = bookables.filter((b) => b.group === group);
   const [bookablesIndex, setBookableIndex] = useState(0);
   const groups = [...new Set(bookables.map((b) => b.group))];
   const [hasDetail, setHasDetail] = useState(false);

   const bookable = bookablesInGroup[bookablesIndex];
   const nextBookable = () => {
      // Lazy initial state:
      // Pass the updater function a function to increment the index
      // Passing a function here instead of the state value for the index to allow React efficiently
      // schedule when any updates take place. (p.  55)
      // rename bookablesIndex as i to shorten it.
      setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
   };

   const changeGroup = (e) => {
      setGroup(e.target.value);
      setBookableIndex(0);
      setHasDetail(false);
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
                  <li key={i} className={i === bookablesIndex ? "selected" : null}>
                     {/* () => setBookableIndex(i) is called lazy initial state, to prevent function run  every time this component is refreshed*/}
                     <button className='btn' onClick={() => setBookableIndex(i)}>
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
                           id='hasDetail'
                           name='hasDetail'
                           checked={hasDetail}
                           onChange={() => setHasDetail((hasDetail) => !hasDetail)}
                        />
                        <label htmlFor='showDetail'>Show Detail</label>
                     </span>
                  </div>
                  <p>{bookable.notes}</p>

                  {hasDetail && (
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
