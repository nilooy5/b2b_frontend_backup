import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ShebaHttpConfig} from './http.conf';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

interface options {
    body?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: any;
    withCredentials?: boolean;
}

@Injectable()
export class ShebaHttpService implements OnInit {
    private endpoint: string;
    private accountsEndpoint: string;
    private accountsKitEndPoint: string;

    constructor(private _http: HttpClient, private config: ShebaHttpConfig) {
        this.endpoint = environment.api_url;
        this.accountsEndpoint = environment.accounts_url;
        this.accountsKitEndPoint = environment.account_kit_url;
    }

    fromSheba(): ShebaHttpService {
        this.endpoint = environment.sheba_api_url;
        return this;
    }

    fromLogisticApi(): ShebaHttpService {
        this.endpoint = environment.api_url;
        return this;
    }

    get(url: string, options?: options): Observable<any> {
        return this._http.get(this.endpoint + url, options);
    }

    getFromAccountsApi(url: string): Observable<any> {
        return this._http.get(this.accountsEndpoint + url);
    }

    postToAccountKit(url: string, data: any, options?: options): Observable<any> {
        return this._http.post(this.accountsKitEndPoint + url, data, options);
    }

    post(url: string, data: any, options?: options): Observable<any> {
        return this._http.post(this.endpoint + url, data, options);
    }

    put(url: string, data: any, options?: options): Observable<any> {
        return this._http.put(this.endpoint + url, data, options);
    }

    patch(url: string, data: any, options: options): Observable<any> {
        return this._http.patch(this.endpoint + url, data, options);
    }

    delete(url: string, options?: options): Observable<any> {
        return this._http.delete(this.endpoint + url, options);
    }

    request(method: 'GET' | 'POST', url: string, data: options): Observable<any> {
        return this._http.request(method, url, data);
    }

    getBolb(url: string): Observable<HttpResponse<Blob>> {
        return this._http.get(this.endpoint + url, {observe: 'response', responseType: 'blob'});
    }

    postBolb(url: string, data: any): Promise<any> {
        return this._http.post(this.endpoint + url, data, {
            observe: 'response',
            responseType: 'blob',
            reportProgress: true
        }).toPromise();
    }

    postWithFiles(url: string, data: any): Observable<any> {
        let form = new FormData();
        const headers = new HttpHeaders()
            .append('Content-Type', 'multipart/form-data');
        Object.keys(data).forEach(key => {
            if (data[key] instanceof File) {
                const file: File = data[key];
                form.append(key, file, file.name);
            } else {
                form.append(key, data[key]);
            }
        });
        return this._http
            .post(this.endpoint + url, form, {
                reportProgress: true,
                observe: 'events'
            }).pipe(map((event) => {
                    switch (event.type) {
                        case HttpEventType.UploadProgress:
                            const progress = Math.round(100 * event.loaded / event.total);
                            return {status: 'progress', message: progress};
                        case HttpEventType.Response:
                            return event.body;
                        default:
                            return {status: 'event', message: `Unhandled event: ${event.type}`, event: event};
                    }
                })
            );
    }

    postWithMultipleFiles(url: string, data: any): Observable<any> {
        let form = new FormData();
        const headers = new HttpHeaders()
            .append('Content-Type', 'multipart/form-data');
        Object.keys(data).forEach(key => {
            if (key === 'file' && data[key] && data[key] !== undefined) {
                data[key].forEach(file => {
                    form.append(key, file);
                });
            } else {
                form.append(key, data[key]);
            }
        });
        return this._http
            .post(this.endpoint + url, form, {
                reportProgress: true,
                observe: 'events'
            }).pipe(map((event) => {
                    switch (event.type) {
                        case HttpEventType.UploadProgress:
                            const progress = Math.round(100 * event.loaded / event.total);
                            return {status: 'progress', message: progress};
                        case HttpEventType.Response:
                            return event.body;
                        default:
                            return {status: 'event', message: `Unhandled event: ${event.type}`, event: event};
                    }
                })
            );
    }

    postToAccountKitWithHeader(url: string, data: any, option: any): Observable<any> {
        return this._http.post(this.endpoint + url, data, option);
    }

    ngOnInit(): void {

    }

    set Endpoint(endpoint: 'sheba' | 'self') {
        this.endpoint = endpoint === 'sheba' ? environment.sheba_api_url : environment.api_url;
    }

    get Endpoint(): 'sheba' | 'self' {
        if (this.endpoint === environment.sheba_api_url) {
            return 'sheba';
        } else if (this.endpoint == environment.api_url) {
            return 'self';
        }
        return 'self';
    }
}
