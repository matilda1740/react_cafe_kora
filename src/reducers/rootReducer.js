 import userReducer from './userReducer'
 import productReducer from './productReducer'
 import { combineReducers } from 'redux'


 const rootReducer = combineReducers({
     userReducer,
     productReducer
 })

 export default rootReducer;