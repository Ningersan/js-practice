import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import routes from './routes';
import { fetchData } from './infrastructure/actions/'
import reducers from './infrastructure/reducers'

const root = document.getElementById('app');

const loggerMiddleware = createLogger();

// 第一个参数是一个合并的reducers，第二个参数是一个initState, 第三个参数是一个enhance
let store = createStore(reducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
))

// 请求轮播图的图片
store.dispatch(fetchData('api/assistance/home/banner'))

if ( __DEV__ ){
  console.log("现在是开发环境")
  console.log(store.getState());
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
