import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalContextProvider from './context/globalContext';
import "./css/index.css"


ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider >
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


