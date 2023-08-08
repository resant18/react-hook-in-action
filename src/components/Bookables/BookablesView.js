import React, { useState } from 'react';
import { Fragment } from 'react';
import { BookablesList } from './BookablesList';
import { BookablesDetails } from './BookablesDetails';

export const BookablesView = () => {   
   const [ bookable, setBookable ] = useState([]);   

   return (
      <Fragment>
         <BookablesList bookable = { bookable } setBookable = { setBookable } />
         <BookablesDetails />
      </Fragment>
   );
};