import { Injectable } from '@angular/core';
import {ValidatorService} from 'angular4-material-table';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BusinessOfficesEditValidatorService implements ValidatorService {

    getRowValidator(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            officeName: new FormControl(null, Validators.required),
            officeIp: new FormControl(null, Validators.required),
        });
    }
}
