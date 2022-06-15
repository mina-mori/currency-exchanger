import { ApiHelper } from "../utils/apiHelper";
import { of } from 'rxjs';
export class CurrencyService {
    public _apiHelper: ApiHelper;
    public constructor() {
        this._apiHelper = ApiHelper.getInstance();
    }
    public getAllCurrencies() {
        return this._apiHelper.getData('https://api.apilayer.com/fixer/symbols');
    }
    public getLatest(base: string) {
        return this._apiHelper.getData(`https://api.apilayer.com/fixer/latest?base=${base}`);
    }
    public convert(currencyFrom: string, currencyTo: string, amount: number) {
        return this._apiHelper.getData(`https://api.apilayer.com/fixer/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`);
    }
    public getHistoricalData(currencyFrom: string, currencyTo: string, startDate: string, endDate: string) {
        return this._apiHelper.getData(`https://api.apilayer.com/fixer/timeseries?base=${currencyFrom}&symbols=${currencyTo}&start_date=${startDate}&end_date=${endDate}`);
    }
}