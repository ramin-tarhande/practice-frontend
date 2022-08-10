import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from 'antd'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {allReducers} from './SharedState'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


const store=createStore(
  allReducers
);

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider direction='rtl'>
    <Provider store={store}>
      <App />
    </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
