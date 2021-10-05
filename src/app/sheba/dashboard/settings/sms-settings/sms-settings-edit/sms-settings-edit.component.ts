import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-sms-settings-edit',
    templateUrl: './sms-settings-edit.component.html',
    styleUrls: ['./sms-settings-edit.component.scss']
})
export class SmsSettingsEditComponent implements OnInit {

    templateData: any;
    templateForm: FormGroup;
    variables: any[] = [];
    templateError: any = null;
    caretPos: any;
    template: any;

    constructor(
        public dialogRef: MatDialogRef<SmsSettingsEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
    ) {
        this.variables = this.data.variables ? this.data.variables.split(';') : [];
    }

    ngOnInit() {
        this.templateData = this.data;
        this.template = this.templateData.template;

        this.templateForm = this.fb.group({
            template: [this.templateData.template, Validators.required],
            is_published: [this.templateData.is_published, Validators.required],
        });
    }

    close() {
        this.dialogRef.close();
    }

    changeStatus({checked}) {
        const data = this.templateForm.getRawValue();
        this.templateForm.setValue(
            {
                template: data.template,
                is_published: checked ? 1 : 0
            }
        );
    }

    update(): void {
        const data = this.templateForm.getRawValue();

        data.template = this.template;

        if (this.checkVariables(data.template)) {
            this.templateError = null;
            this.dialogRef.close(data);
        } else  {
            this.templateError = 'You have to include all the variables';
        }
    }

    insertVariable(variable, sms) {
        if (sms.selectionStart || sms.selectionStart === '0') {
            this.caretPos = sms.selectionStart;
        }

        const scrollPos = sms.scrollTop;

        const front = (sms.value).substring(0, this.caretPos);
        const back = (sms.value).substring(sms.selectionEnd, sms.value.length);
        const text = '{{' + variable + '}}';

        sms.value = front + text + back;

        this.template = sms.value;

        this.caretPos = this.caretPos + text.length;

        // sms.focus();

        sms.scrollTop = scrollPos;
    }

    checkVariables(template) {
        let match = 0;
        this.variables.forEach(variable => {
            if (template.includes('{{' + variable + '}}')) {
                match++;
            }
        });

        return match === this.variables.length;
    }

    updateTemplate(e) {

    }

}
