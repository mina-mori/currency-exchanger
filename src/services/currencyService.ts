import { ApiHelper } from "../utils/apiHelper";
import { of } from 'rxjs';
export class CurrencyService {
    public _apiHelper: ApiHelper;
    public constructor() {
        this._apiHelper = ApiHelper.getInstance();
    }
    public getAllCurrencies() {
        // return of<any>({
        //     "success": true,
        //     "symbols": {
        //         "EUR": "Euro",
        //         "AED": "United Arab Emirates Dirham",
        //         "AFN": "Afghan Afghani",
        //         "ALL": "Albanian Lek",
        //         "AMD": "Armenian Dram",
        //         "USD": "U S D",
        //         "GBP": "G B P"
        //     }
        // })
        return this._apiHelper.getData('https://api.apilayer.com/fixer/symbols');
    }
    public getLatest(base: string) {
        // return of<any>({
        //     "success": true,
        //     "timestamp": 1519296206,
        //     "base": "EUR",
        //     "date": "2022-06-09",
        //     "rates": {
        //         "ALL": 1.566015,
        //         "CAD": 1.560132,
        //         "AMD": 1.154727,
        //         "CNY": 7.827874,
        //         "GBP": 0.882047,
        //         "JPY": 132.360679,
        //         "USD": 1.23396,
        //         "AFN": 2.25861,
        //         "AED": 7.25861,
        //     }
        // })
        return this._apiHelper.getData(`https://api.apilayer.com/fixer/latest?base=${base}`);
    }
    public convert(currencyFrom: string, currencyTo: string, amount: number) {
        // return of<any>({
        //     "date": "2018-02-22",
        //     "historical": "",
        //     "info": {
        //         "rate": 148.972231,
        //         "timestamp": 1519328414
        //     },
        //     "query": {
        //         "amount": 25,
        //         "from": "GBP",
        //         "to": "JPY"
        //     },
        //     "result": 3724.305775 * amount,
        //     "success": true
        // })

        return this._apiHelper.getData(`https://api.apilayer.com/fixer/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`);

    }
    public getHistoricalData(currencyFrom: string, currencyTo: string, startDate: string, endDate: string) {
        // return of<any>({
        //     "success": true,
        //     "timeseries": true,
        //     "start_date": "2022-06-15",
        //     "end_date": "2021-06-15",
        //     "base": "EUR",
        //     "rates": {
        //         "2021-06-01": {
        //             "USD": 1.322891,
        //         },
        //         "2021-06-15": {
        //             "USD": 1.315066,
        //         },
        //         "2021-06-30": {
        //             "USD": 1.314491
        //         },
        //         "2021-07-01": {
        //             "USD": 1.322891,
        //         },
        //         "2021-07-15": {
        //             "USD": 1.315066,
        //         },
        //         "2021-07-31": {
        //             "USD": 2.314491
        //         },
        //         "2021-08-01": {
        //             "USD": 1.322891,
        //         },
        //         "2021-08-15": {
        //             "USD": 1.315066,
        //         },
        //         "2021-08-31": {
        //             "USD": 3.314491
        //         },
        //         "2021-09-01": {
        //             "USD": 1.322891,
        //         },
        //         "2021-09-15": {
        //             "USD": 1.315066,
        //         },
        //         "2021-09-30": {
        //             "USD": 1.514491
        //         },
        //         "2021-10-01": {
        //             "USD": 1.322891,
        //         },
        //         "2021-10-15": {
        //             "USD": 1.315066,
        //         },
        //         "2021-10-31": {
        //             "USD": 2.904491
        //         }
        //     }
        // });

        return this._apiHelper.getData(`https://api.apilayer.com/fixer/timeseries?base=${currencyFrom}&symbols=${currencyTo}&start_date=${startDate}&end_date=${endDate}`);
    }
}