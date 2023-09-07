import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHasDetails } from './UsersSlice';
import { UserContext } from './UsersView';

export const UsersDetails = () => {
   const dispatch = useDispatch();
   const { hasDetails } = useSelector((state) => state.user);
   const { user }  =  useContext(UserContext);

   const toggleHasDetails = () => {
      dispatch(setHasDetails());
   }

   if (!(user && Object.keys(user).length)) return;

   const { name, title, notes } = user;

   return (
      <div className='user-details'>
         <div className='item'>
            <div className='item-header'>
               <h2>{ name }</h2>
               <span className='controls'>
                  <input
                     type='checkbox'
                     name='hasDetail'
                     checked={ hasDetails }
                     onChange={ toggleHasDetails }
                  />
                  <label htmlFor='showDetail'>Show Detail</label>
               </span>
            </div>
            {hasDetails && (
               <div className='item-details'>
                  <p>Title: { title }</p>
                  <p>Notes: { notes }</p>
               </div>
            )}
         </div>
      </div>
   );
}