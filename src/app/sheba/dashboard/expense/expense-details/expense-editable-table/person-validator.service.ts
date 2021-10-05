import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()

export class PersonValidatorService implements ValidatorService {
    // @ts-ignore
    getRowValidator(): FormGroup {
        return new FormGroup({
            // name: new FormControl(null, Validators.required),
            // age: new FormControl(),
            type: new FormControl(),
            amount: new FormControl(),
            remarks: new FormControl(),
            attachment: new FormControl()
        });
    }
}


