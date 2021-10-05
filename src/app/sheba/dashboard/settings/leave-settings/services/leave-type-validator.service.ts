import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeValidatorService implements ValidatorService {

    getRowValidator(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            typeName: new FormControl(null, Validators.required),
            totalDays: new FormControl(null, Validators.required),
        });
    }
}
