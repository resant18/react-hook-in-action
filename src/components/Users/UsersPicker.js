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

   const user = useSelector(state => state.user);

   if (!user || Object.keys(user).length === 0) {
      return <FaSpinner className='icon-loading' />
   }
   
   return (      
      <select>
         <option>Users</option>
         {user.data.map((u, i) => (
            <option key={i}>{u.name}</option>
         ))}
      </select>
   );   
};