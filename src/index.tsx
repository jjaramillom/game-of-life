import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import gameReducer from './store/reducers/game';
import UIReducer from './store/reducers/ui';

const rootReducer = combineReducers({
	ui: UIReducer,
	game: gameReducer,
});

const store = createStore(
	rootReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

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
