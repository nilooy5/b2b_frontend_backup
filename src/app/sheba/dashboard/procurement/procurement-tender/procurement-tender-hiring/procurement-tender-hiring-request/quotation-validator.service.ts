import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable()

export class QuotationValidatorService implements ValidatorService {
    // @ts-ignore
    getRowValidator(): FormGroup {
        return new FormGroup({
            serialNo: new FormControl(),
            id: new FormControl(),
            itemName: new FormControl(null, Validators.required),
            specification: new FormControl(null, Validators.required),
            unit: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required)
        });
    }
}
