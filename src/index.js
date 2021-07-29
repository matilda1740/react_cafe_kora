import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from "./components/StateProvider";
// import { initialState } from "./Components/reducer";
import { reducer } from "./components/reducer";

ReactDOM.render(
    <React.StrictMode>
        {/* This just passed in the data layer as prop */}
        <StateProvider reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>,
  document.getElementById("root")
    );


