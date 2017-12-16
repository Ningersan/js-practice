import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import routes from './routes';
import reducers from './infrastructure/reducers'

const root = document.getElementById('app');

// 第一个参数是一个合并的reducers，第二个参数是一个initState
let store = createStore(reducers)

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
