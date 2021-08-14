import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './components/StateProvider';
import { initialState } from "./components/reducer";
import { reducer } from "./components/reducer";
// import { productReducer } from "./reducers/productReducer";


// import { createStore } from 'redux'
// import rootReducer from './reducers/rootReducer'
// import { Provider } from "react-redux";
// import { createStore } from 'redux';
// const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        {/* This just passed in the data layer as prop */}
        {/* <Provider store={store}> */}
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        {/* </Provider> */}
        </StateProvider>
    </React.StrictMode>,
  document.getElementById("root")
    );


