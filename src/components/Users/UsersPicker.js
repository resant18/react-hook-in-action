import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { getUsers } from "./UsersSlice";

export const UsersPicker = () => {   
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getUsers());
   }, []);   
      
   // Better approach: Return only specific state, instead of
   // return the entire state, since it can lead to unnecessary rerenders.   
   // const { user } = useSelector(state => state);

   const { users, isLoading } = useSelector(state => state.user);

   if (isLoading) {
      return <FaSpinner className='icon-loading' />
   }
   
   return (      
      <select>
         <option>Users</option>
         {Object.keys(users).length && users.map((u, i) => (
            <option key={i}>{u.name}</option>
         ))}
      </select>
   );   
};