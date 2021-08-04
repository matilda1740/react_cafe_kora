import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import { initialState } from "./Components/reducer";
// import { reducer } from "./components/reducer";
import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import { Provider } from "react-redux";

// import configureStore from "store";
const store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        {/* This just passed in the data layer as prop */}
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById("root")
    );


