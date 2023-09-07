// Passing data using Context
import React, { Fragment, useState, createContext } from 'react';
import { UsersList } from './UsersList';
import { UsersDetails } from './UsersDetails';

export const UserContext = createContext();

export const UsersView = () => {   
   const [ user, setUser ] = useState({});      

   return (
      <UserContext.Provider value={{ user, setUser }}>
         <Fragment>            
            <UsersList />
            <UsersDetails />
         </Fragment>
      </UserContext.Provider>
   );
};
