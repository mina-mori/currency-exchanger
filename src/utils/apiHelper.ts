import { SystemVariables } from "../constants/systemVariables";

export class ApiHelper {
    private static _instance: ApiHelper;
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
        myHeaders.append("apikey", SystemVariables.apiKey);

        const requestOptions: any = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        return fetch(url, requestOptions);

    };

}
