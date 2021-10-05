import { Injectable } from '@angular/core';
import {ValidatorService} from 'angular4-material-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HolidayValidatorService implements ValidatorService {

    getRowValidator(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            start_date: new FormControl(null, Validators.required),
            end_date: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required),
            total_days: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required)
        });
    }
}
