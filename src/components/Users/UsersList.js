import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

export const UsersList = () => {
   const userList = useSelector(state => state.user.data);
   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
   const [hasDetail, setHasDetail] = useState(false);

   const user = userList ? userList[selectedUserIndex] : '';

   if (user === '') return;

   return (
      <Fragment>
         <div>
            <ul className='users items-list-nav'>
               {userList.map((u, i) => (
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