import { ApiHelper } from "../utils/apiHelper";


export class CurrencyService {
    public _apiHelper: ApiHelper;
    public constructor() {
        this._apiHelper = ApiHelper.getInstance();
    }
    public async getAllCurrencies() {
        try {
            return {
                "success": true,
                "symbols": {
                    "EUR": "Euro",
                    "AED": "United Arab Emirates Dirham",
                    "AFN": "Afghan Afghani",
                    "ALL": "Albanian Lek",
                    "AMD": "Armenian Dram",
                    "USD": "U S D",
                    "GBP": "G B P"
                }
            }
            //this._apiHelper.getData('https://api.apilayer.com/fixer/symbols');
        }
        catch (error: any) {
            return Promise.reject(error);
        }
    }
    public async getLatest(base: string) {
        try {
            return {
                "success": true,
                "timestamp": 1519296206,
                "base": "EUR",
                "date": "2022-06-09",
                "rates": {
                    "ALL": 1.566015,
                    "CAD": 1.560132,
                    "AMD": 1.154727,
                    "CNY": 7.827874,
                    "GBP": 0.882047,
                    "JPY": 132.360679,
                    "USD": 1.23396,
                    "AFN": 2.25861,
                    "AED": 7.25861,
                }
            }
            //return this._apiHelper.getData('https://data.fixer.io/api/latest?base=${base}');
        }
        catch (error: any) {

        }
    }
    public async convert(from: string, to: string, amount: number) {
        try {
            return {
                "date": "2018-02-22",
                "historical": "",
                "info": {
                    "rate": 148.972231,
                    "timestamp": 1519328414
                },
                "query": {
                    "amount": 25,
                    "from": "GBP",
                    "to": "JPY"
                },
                "result": 3724.305775,
                "success": true
            }

            //return this._apiHelper.getData('https://data.fixer.io/api/convert?to=${to}&from=${from}&amount=${amount}');
        }
        catch (error: any) {

        }
    }
}

