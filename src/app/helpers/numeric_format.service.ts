import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NumericFormat {
    numberWithCommas(x) {
        return x !== null ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 'N/A';
    }
}
