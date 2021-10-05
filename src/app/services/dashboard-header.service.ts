import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class DashboardHeaderService {

    private headerTitleSource = new Subject<string>();
    currentHeaderTitle = this.headerTitleSource.asObservable();

    constructor() { }

    changeHeaderTitle(title: string) {
        this.headerTitleSource.next(title);
    }

}
