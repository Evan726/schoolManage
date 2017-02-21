import {
	createStore,
	applyMiddleware,
	compose
} from "redux";
import {
	rootReducer
} from '../reducers';
import thunkMiddleware from 'redux-thunk';
import api from '../middleware/api';
const createStoreWithMiddleware = compose(
	applyMiddleware(
		thunkMiddleware, api
	),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)


export default function configureStore(initalState) {
	const store = createStoreWithMiddleware(rootReducer, initalState)

	//热替换选项
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers')
			store.replaceReducer(nextReducer)
		})
	}

	return store
}