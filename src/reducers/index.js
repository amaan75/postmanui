import { combineReducers } from "redux";
import authReducer from "./authReducer"
import errReducer from "./errReducer"
import sideBar from "./sideBar"
export default combineReducers({
    auth: authReducer,
    err: errReducer,
    sideBar: sideBar,
})