import {Inject, Injectable} from '@angular/core';
import {WINDOW} from "@ng-toolkit/universal";
import {Location} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor(@Inject(WINDOW) private window: Window, private location: Location) {

    }

    getScroller(): HTMLElement {
        return this.window.document.getElementById('contents');
    }

    goBack() {
        this.location.back();
    }

}
