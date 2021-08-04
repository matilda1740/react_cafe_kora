import { createStore, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";

import rootReducer from "reducers/rootReducer";

const configureStore = (state = { usersState: {}, productState: {} }) => {  
    return createStore(rootReducer, state, applyMiddleware(reduxThunk));
}
export default configureStore;