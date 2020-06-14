import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';


import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';




// Component -> index.js 등등 파일들을 컴포넌트에 넣어서 호출
// nodeBird에 store를 받아야하는데 넣어주는부분은 next-redux-wrapper가 해준다.
const NodeBird = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
    </Provider>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object.isRequired,
};

// withRedux()(NodeBird) 컴포넌트를 감싸주면 기존 컴포넌트의 기능을 확장 해준다.
// 미들웨어는 액션과 스토어 사이에서 동작
// compose -> 미들웨어 여러개 합성하는것
// applyMiddleware -> 미들웨어 적용해주는것
export default withRedux((initialState, options)=> {
  // 여기에다가 store 커스터마이징
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares)) 
  : compose(applyMiddleware(...middlewares), !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'?
   window.__REDUX_DEVTOOLS_EXTENSION__(): (f) => f,
   );
  const store =createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
})(NodeBird);