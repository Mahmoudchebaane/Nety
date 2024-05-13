import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your user reducer

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;