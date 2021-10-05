import {Inject, Injectable} from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ShebaHttpConfig} from './http.conf';
import {StorageService} from '../../services/storage.service';
import {PopAlertService} from '../pop-alert/pop-alert.service';
import {Router} from '@angular/router';

@Injectable()
export class ShebaHttpInjectorService implements HttpInterceptor {
    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(
        private storage: StorageService,
        private config: ShebaHttpConfig,
        private pop: PopAlertService,
        private router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user: any = this.storage.user;
        const addToken = !req.urlWithParams.includes('token');
        const token = user ? user.remember_token ? user.remember_token : user.token : null;
        if (token && !req.url.includes('token=') && addToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`,
                },
                setParams: {
                    token: user.token
                }
            });
        }
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body.code === 401 && token) {
                    this.router.navigate(['/']).catch(err => {
                        console.log(err);
                    });
                    this.storage.removeData();
                    this.pop.open('Your Session has expired ');
                }
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.collectFailedRequest(req);
                } else if (err.status === 0 && err.message.match('Http failure response')) {
                    this.pop.open('Couldn\'t get response from server');
                }
            } else {
                // tslint:disable-next-line:no-shadowed-variable
                this.router.navigate(['/']).catch(err => {
                    console.log(err);
                });
            }
        }));
    }

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
}
