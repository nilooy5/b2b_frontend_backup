import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SelectedMasterCategoryService {

    private categorySource = new BehaviorSubject(0);
    currentSelectedMaterCategory = this.categorySource.asObservable();

    constructor() { }

    changeSelectedMasterCatgory(message: number) {
        this.categorySource.next(message);
    }
}
