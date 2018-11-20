import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createBrowserHistory} from 'history';

import createStore from './store';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const store = createStore(history);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
