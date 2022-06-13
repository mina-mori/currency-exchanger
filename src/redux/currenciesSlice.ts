import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currenciesAbbr: [] as string[],
    currenciesName: {} as any
};

export const currenciesSlice = createSlice({
    name: 'currenciesSlice',
    initialState,
    reducers: {
        setCurrenciesAbbr(state, action) {
            state.currenciesAbbr = action.payload;
        },
        setCurrenciesName(state, action) {
            state.currenciesName = action.payload;
        },
        resetCurrencies(state) {
            state.currenciesAbbr = [];
            state.currenciesName = [];
        }
    }

});


export const { setCurrenciesAbbr, setCurrenciesName, resetCurrencies } = currenciesSlice.actions;
export const currenciesSelector = (state: any) => state.currencies;
export default currenciesSlice.reducer;
