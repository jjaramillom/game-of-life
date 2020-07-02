import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import gameReducer from './store/reducers/game';
import UIReducer from './store/reducers/ui';

const rootReducer = combineReducers({
	ui: UIReducer,
	game: gameReducer,
});

const composeEnhancers =
	(process.env.NODE_ENV === 'development' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
