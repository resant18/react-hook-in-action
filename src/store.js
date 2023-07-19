import { configureStore } from '@reduxjs/toolkit';
import bookableReducer from './components/Bookables/BookablesSlice';
import { bookables } from './static.json';

const initialState = {
   group: "Rooms",
   bookableIndex: 0,
   hasDetails: true,
   bookables,
};

const store = configureStore({
   reducer: bookableReducer,
   preloadedState: initialState,
});

export default store;
