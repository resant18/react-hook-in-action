import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

export const UsersList = () => {
   const {users, isLoading, error} = useSelector(state => state.user);
   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
   const [hasDetail, setHasDetail] = useState(false);   

   const user = users && Object.keys(users).length > 0 ? users[selectedUserIndex] : '';   

   if (isLoading) {
      return (
         <p><FaSpinner className='icon-loading'/>{''}Loading users...</p>
      )
   }   
   
   if (error) {
      return <p>{error}</p>;
   }

   if (!Object.keys(users).length) return <p>No user list</p>;
   if (user === '') return;   

   return (
      <Fragment>
         <div>
            <ul className='users items-list-nav'>
               {users.map((u, i) => (
                  <li key={i} className={i === selectedUserIndex ? 'selected' : null}>
                     <button className='btn' onClick={() => setSelectedUserIndex(i)}>
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
};