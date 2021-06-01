import { combineReducers } from "redux";
import authReducer from './authReducer';
import userReducer from './user.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
})


export default rootReducer;