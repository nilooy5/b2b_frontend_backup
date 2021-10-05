import {FormGroup} from "@angular/forms";
import {formInputInvalid} from "./functions";

export class FormEssentials {
    form: FormGroup;
    submitting: boolean;

    constructor() {
    }

    formInputInvalid(name: string, form?: FormGroup) {
        if (form) return formInputInvalid(form, name);
        return formInputInvalid(this.form, name);
    }
}



