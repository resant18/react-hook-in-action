import React, { Fragment, useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNextUser, setUserIndex } from "./UsersSlice";
import { UserContext } from './UsersView';
import { FaSpinner } from 'react-icons/fa';

export const UsersList = () => {
   const { users, selectedUserIndex, isPresenting, isLoading, error } = useSelector(state => state.user);
   const { user, setUser } = useContext(UserContext);
   const timerRef = useRef(null); 
   const dispatch = useDispatch();   

   // User Data is already fetched in the UsersPicker.
   // However, this is another way to fetch it:
   // const fetchUsers = (async () => {
   //    dispatch(getUsers());
   // })
   //  OR:
   // const fetchUsers =  useCallback(() => {
   //    dispatch(getUsers());
   // }, []);

   // useEffect(() => {
   //    fetchUsers();
   //    setUser(users[selectedUserIndex]);
   // }, []);

   useEffect(() => {
      if (!isLoading) {
         setUser(users[selectedUserIndex]);
      }      
   }, [isLoading, selectedUserIndex]);   

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

   if (isLoading || !Object.keys(user).length) {
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
                  <li key={u.id} className={u.id === user.id ? 'selected' : null}>
                     <button className='btn' onClick={() => changeUser(i)}>
                        {u.name}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
         
      </Fragment>
   );
}