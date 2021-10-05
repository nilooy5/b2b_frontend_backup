import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {announcementTypes} from "../../../../models/announcement";
import '../../../../helpers/extends'
import {AnnouncementsCreateService} from "./announcements-create.service";
import {Confirmation, ConfirmationTypes} from "../../../../models/confirmation";
import {Router} from "@angular/router";
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-announcements-create',
    templateUrl: './announcements-create.component.html',
    styleUrls: ['./announcements-create.component.scss']
})
export class AnnouncementsCreateComponent implements OnInit {

    form: FormGroup;
    types: any;
    showError = false;
    confirmation: Confirmation;
    createdId: number;
    isDescriptionEditable = true;

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        sanitize: false,
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultFontName: 'Arial',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };

    constructor(private fb: FormBuilder,
                private service: AnnouncementsCreateService,
                public sanitizer: DomSanitizer,
                private router: Router) {
        this.types = announcementTypes;
        this.confirmation = new Confirmation();
    }

    ngOnInit() {
        this.form = this.fb.group({
            type: ['event', Validators.required],
            title: ['', Validators.required],
            short_description: ['', Validators.required],
            description: ['', Validators.required],
            end_date: ['', Validators.required]
        });
    }

    get fc() {
        return this.form.controls;
    }

    getMinimumEndDate(): Date {
        return new Date();
    }

    isFormInValid() {
        return !this.form.valid;
    }

    submit() {
        if (this.isFormInValid()) {
            this.showError = true;
            return;
        }

        this.showError = false;
        const values = this.form.getRawValue();
        this.service.save({
            type: values.type,
            short_description: values.short_description,
            description: values.description,
            title: values.title,
            end_date: values.end_date.toMySqlFormat(),
        }).toPromise().then(res => {
            if (res.code === 200) {
                this.createdId = res.id;
                this.confirmation.title = 'Request Successful!';
                this.confirmation.type = ConfirmationTypes.success;
                this.confirmation.message = res.message || 'Announced successfully';
                this.confirmation.show();
            } else {
                this.showFailedConfirmation();
            }
        }).catch(err => {
            this.showFailedConfirmation();
        });
    }

    showFailedConfirmation() {
        this.confirmation.title = 'Request Failed';
        this.confirmation.type = ConfirmationTypes.failure;
        this.confirmation.message = 'Request Failed';
        this.confirmation.show();
    }

    viewDetails() {
        this.router.navigate(['/', 'dashboard', 'announcements', this.createdId]).catch(err => {
            console.log(err);
        });
    }

    onClickEditPreview(value: number) {
        if (value === 1) {
            this.isDescriptionEditable = false;
            return;
        }
        this.isDescriptionEditable = true;
    }

    isDescriptionValid() {
        return this.form.controls.description.valid;
    }
}
