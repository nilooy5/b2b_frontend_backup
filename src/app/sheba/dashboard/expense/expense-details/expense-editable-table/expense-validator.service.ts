import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()

export class ExpenseValidatorService {

    // @ts-ignore
    getRowValidator(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            type: new FormControl(),
            amount: new FormControl('', Validators.required),
            remarks: new FormControl(),
            attachment: new FormControl()
        });
    }
}
