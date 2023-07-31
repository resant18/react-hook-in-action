import React, { Fragment, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNextUser, setUserIndex } from "./UsersSlice";
import { FaSpinner } from 'react-icons/fa';

export const UsersList = () => {
   const {users, selectedUserIndex, isPresenting, isLoading, error} = useSelector(state => state.user);   
   const [hasDetail, setHasDetail] = useState(false);  
   const timerRef = useRef(null); 
   const dispatch = useDispatch();

   const user = users ? users[selectedUserIndex] : '';

   useEffect(() => {
      if (isPresenting) {
         scheduleNext();
      }
      else {
         clearPresenting();
      };
   });
   
   const scheduleNext = () => {
      if (timerRef.current === null) {
         timerRef.current = setTimeout(() => {
            timerRef.current = null;
            dispatch(getNextUser(true));
         }, 3000);
      };
   };

   const clearPresenting = () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
   };

   const changeUser = (selectedIndex) => {
      dispatch(setUserIndex(selectedIndex));
   }

   if (isLoading) {
      return (
         <p><FaSpinner className='icon-loading'/>{''}Loading users...</p>
      );
   };
   
   if (error) {
      return <p>{error}</p>;
   };

   if (!Object.keys(users).length) return <p>No user list</p>;   

   return (
      <Fragment>
         <div>
            <ul className='users items-list-nav'>
               {users.map((u, i) => (
                  <li key={i} className={i === selectedUserIndex ? 'selected' : null}>
                     <button className='btn' onClick={() => changeUser(i)}>
                        {u.name}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
         {user && (
            <div className='user-details'>
               <div className='item'>
                  <div className='item-header'>
                     <h2>{user.name}</h2>
                     <span className='controls'>
                        <input
                           type='checkbox'
                           name='hasDetail'
                           checked={hasDetail}
                           onChange={() => setHasDetail((hasDetail) => !hasDetail)}
                        />
                        <label htmlFor='showDetail'>Show Detail</label>
                     </span>
                  </div>
                  {hasDetail && (
                     <div className='item-details'>
                        <p>Title: {user.title}</p>
                        <p>Notes: {user.notes}</p>
                     </div>
                  )}
               </div>
            </div>
         )}
      </Fragment>
   );
}