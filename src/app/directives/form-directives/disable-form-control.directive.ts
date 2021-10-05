import { NgControl } from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[disableFormControl]'
})
export class DisableFormControlDirective {

    @Input() set disableFormControl( condition : boolean ) {
        const action = condition ? 'disable' : 'enable';
        if (this.ngControl.control) { this.ngControl.control[action](); }
    }

    constructor( private ngControl: NgControl ) {
    }

}
