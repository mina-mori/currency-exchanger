export class DateHelper {
    private static _instance: DateHelper;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new DateHelper();
        }
        return this._instance;
    }
    public getLastDayOfMonth = (year: any, month: any) => {
        const lastDay = new Date(year, month, 0).getDate();
        return `${year}-${month}-${lastDay}`;
    }
}