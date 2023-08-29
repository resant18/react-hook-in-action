import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   // Using React.StrictMode StrictMode renders components twice (on dev but not production) 
   // in order to detect any problems with your code and warn you about them (which can be quite useful).
   //<React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
