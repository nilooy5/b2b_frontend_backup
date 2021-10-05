import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {

    private inputSource = new Subject<any>();
    currentSearchInput = this.inputSource.asObservable();

    constructor() { }

    changeSearchInput(message: string) {
        this.inputSource.next(message);
    }
}
