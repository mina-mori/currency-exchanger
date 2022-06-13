import { combineReducers } from "@reduxjs/toolkit";
import currenciesSlice from "./currenciesSlice";

const rootReducer = combineReducers({
    currencies: currenciesSlice
});

export default rootReducer;