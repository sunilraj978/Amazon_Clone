import {createStore,applyMiddleware,compose,combineReducers} from 'redux';

import thunk from 'redux-thunk'
import { cartReducer } from './components/reducer/cartReducer';
import { orderReducer } from './components/reducer/orderReducer';
import { ProductReducer } from './components/reducer/reducer';

const initialState = {}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({
    products:ProductReducer,
    cart:cartReducer,
    order:orderReducer
}),
initialState,composeEnhancer(applyMiddleware(thunk))
)


export default store;