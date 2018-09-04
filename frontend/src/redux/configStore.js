import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware} from 'react-router-redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import { i18nState} from 'redux-i18n';
import createHistory from 'history/createBrowserHistory';
//import reduxHistoryPushMiddleware from 'reduxHistoryPushMiddleware'
import user from 'redux/modules/user';
import post from 'redux/modules/post'

const env = process.env.NODE_ENV;

//console.log(env)

const history = createHistory();

const middleWares = [
    thunk,
    routerMiddleware(history)
   // reduxHistoryPushMiddleware(history)
];

if (env==="development"){
    const { logger } = require("redux-logger") ;
    middleWares.push(logger);

}

const reducer = combineReducers({
    user,
    post,
    routing : routerReducer,
    i18nState,
})

let store;

if (env==="development") {
    store=intialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middleWares)));
} else {
    store=intialState => createStore(reducer, applyMiddleware(...middleWares));
}

export { history } ;
export default store();
