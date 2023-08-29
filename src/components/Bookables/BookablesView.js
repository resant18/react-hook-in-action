//** SEPARATE THE BOOKABLE LIST AND DETAILS BY PASSING DOWN THE SETBOOKABLE PROP **
import React, { useState, Fragment } from 'react';
import { BookablesList } from './BookablesList';
import { BookablesDetails } from './BookablesDetails';

export const BookablesView = () => {
   const [ bookable, setBookable ] = useState({});

   return (
      <Fragment>
         <BookablesList setBookable={ setBookable } />
         <BookablesDetails bookable={ bookable}  />
      </Fragment>
   );
};
