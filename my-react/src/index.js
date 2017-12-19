import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import routes from './routes';
import reducers from './infrastructure/reducers'
import { fetchData } from './infrastructure/actions/'

const url = 'http://10.16.164.34:8088/api/assistance/home/banner'
const root = document.getElementById('app');

const loggerMiddleware = createLogger();

// 第一个参数是一个合并的reducers，第二个参数是一个initState
let store = createStore(reducers, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ))

store.dispatch(fetchData(url));

console.log(store.getState());

if ( __DEV__ ){
  console.log("现在是开发环境")
}

if (__PROD__) {
  console.log("现在是生产环境")
}

render(
  <Provider store={store}>
    {routes}
  </Provider>
  ,
  root)
