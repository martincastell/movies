import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ROOT_STATE from './state/root';

ReactDOM.render(
  <App state={ROOT_STATE} />,
  document.getElementById('root')
);
