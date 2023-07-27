import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookableReducer from './components/Bookables/BookablesSlice';
import userReducer from './components/Users/UsersSlice';

const reducer = combineReducers({   
   bookable: bookableReducer,
   user: userReducer
});

const store = configureStore({
   reducer
});

export default store;
