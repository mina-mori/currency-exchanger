
export class ApiHelper {
    private static _instance: ApiHelper;
    private apiKey = "Nsz64pejabiOrrMDD35qvKme2ReQYaJI";
    public constructor() {

    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new ApiHelper();
        }
        return this._instance;
    }

    public getData = (url: string) => {
        const myHeaders = new Headers();
        myHeaders.append("apikey", this.apiKey);

        const requestOptions: any = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        return fetch(url, requestOptions);

    };

}
