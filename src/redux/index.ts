import { combineReducers } from "@reduxjs/toolkit";
import currenciesSlice from "./currenciesSlice";

const rootReducer = combineReducers({
    allCurrencies: currenciesSlice
});

export default rootReducer;