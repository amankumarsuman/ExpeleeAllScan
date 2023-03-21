import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

import { allscanReducer } from "./reducer";

const reducer = combineReducers({
  // cart: cartReducer
  allscan: allscanReducer,
});

export default configureStore({
  reducer,
  composeWithDevTools,
});
