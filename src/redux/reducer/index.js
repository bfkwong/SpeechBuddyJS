import { combineReducers } from "redux";

import textStoreReducer from "./textStoreReducer";

export default combineReducers({ textStore: textStoreReducer });
