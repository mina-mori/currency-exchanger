import { SystemVariables } from "../constants/systemVariables";
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { fromFetch } from "rxjs/fetch";
export class ApiHelper {
    private static _instance: ApiHelper;
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
        return fromFetch(url, requestOptions).pipe(
            switchMap((response: any) => response.json()),
            catchError(error => of(error))
        );

    };

}
