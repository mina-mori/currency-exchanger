import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allCurrencies: [] as string[],
};

export const currenciesSlice = createSlice({
    name: 'allCurrenciesSlice',
    initialState,
    reducers: {
        setCurrencies(state, action) {
            state.allCurrencies = action.payload;
        },
        resetCurrencies(state) {
            state.allCurrencies = [];
        }
    }

});


export const { setCurrencies, resetCurrencies } = currenciesSlice.actions;
export const allCurrenciesSelector = (state: any) => state.allCurrencies;
export default currenciesSlice.reducer;
