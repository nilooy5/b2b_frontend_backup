import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formInputInvalid} from "../../../../../../helpers/functions";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {InspectionFormItem} from "../../../../../../types/fleet";

@Component({
    selector: 'app-fleet-inspection-form-item',
    templateUrl: './fleet-inspection-form-item.component.html',
    styleUrls: ['./fleet-inspection-form-item.component.scss']
})
export class FleetInspectionFormItemComponent implements OnInit {
    @Input() formGroup: FormGroup;
    @Input() index: number;
    @Input() appearance: 'create' | 'update' = 'create';
    @Input() data: InspectionFormItem = null;
    @Input() showSaveButton: boolean = false;
    @Output() FormEvents: EventEmitter<InspectionFormItemEvents> = new EventEmitter();
    @Input() opened: boolean = true;
    @HostBinding('style') style: SafeStyle;

    constructor(
        private sanitizer: DomSanitizer,
        private fb: FormBuilder
    ) {
        this.style = sanitizer.bypassSecurityTrustStyle('display:flex;align-items:flex-start;justify-content:flex-start');
    }

    ngOnInit() {
        if (!this.opened) {
            this.opened = this.appearance === 'create';
        }
        if (!this.formGroup) {
            this.formGroup = this.fb.group({
                title: ['', [Validators.required]],
                short_description: '',
                type: [(this.data) ? this.data.type : "text", Validators.required],
                is_required: [1, Validators.required],
                instructions: ''
            });
            if (this.data) this.formGroup.patchValue(this.data);
        }
    }

    removeItem() {
        this.FormEvents.emit({event: 'delete', index: this.index, data: this.data});
    }

    toggleOpen() {
        this.opened = !this.opened;
    }

    formInputInvalid(name: string) {
        return formInputInvalid(this.formGroup, name);
    }

    getType(item: FormGroup) {
        return item.get('type').value
    }

    submit() {
        if (this.appearance === 'update') {
            const data = this.formGroup.getRawValue();
            data.id = this.data.id;
            data.is_required = data.is_required ? 1 : 0;
            this.FormEvents.emit({event: 'update', index: this.index, data: data})
        }
    }
}

export interface InspectionFormItemEvents {
    event: 'delete' | 'update' | 'copy';
    index: number;
    data?: any;
}
