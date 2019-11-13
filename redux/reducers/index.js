import { combineReducers } from 'redux';

import authReducer from './authReducer';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  counterReducer: counterReducer
});

export default rootReducer;
