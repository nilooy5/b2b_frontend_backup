import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Confirmation, ConfirmationTypes} from "../../../../models/confirmation";
import {Announcement, announcementTypes} from "../../../../models/announcement";
import {AnnouncementsDetailsService} from "./announcements-details.service";
import {DomSanitizer} from '@angular/platform-browser';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
    selector: 'app-announcements-details',
    templateUrl: './announcements-details.component.html',
    styleUrls: ['./announcements-details.component.scss']
})
export class AnnouncementsDetailsComponent implements OnInit {

    form: FormGroup;
    types: any;
    showError = false;
    isSubmitting: boolean = false;
    confirmation: Confirmation;
    announcement: Announcement;
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

    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private service: AnnouncementsDetailsService,
                public sanitizer: DomSanitizer,
                private router: Router) {
        this.route.data.subscribe(res => {
            this.announcement = res.announcement;
            if (this.isNotFound()) return;
            this.form = this.fb.group({
                type: [this.announcement.type, Validators.required],
                title: [this.announcement.title, Validators.required],
                short_description: [this.announcement.short_description, Validators.required],
                description: [this.announcement.description, Validators.required],
                end_date: [this.announcement.end_date, Validators.required]
            });
        });

        this.types = announcementTypes;
        this.confirmation = new Confirmation();
        this.confirmation.showAnotherButton = false;
    }

    isFound() {
        return this.announcement !== null;
    }

    isNotFound() {
        return !this.isFound();
    }

    ngOnInit() {

    }

    get fc() {
        return this.form.controls;
    }

    getMinimumEndDate(): Date {
        return new Date();
    }

    isFormInValid() {
        return !this.form.valid
    }

    submit() {
        if (this.isFormInValid()) {
            this.showError = true;
            return;
        }

        this.showError = false;
        this.isSubmitting = true;

        const values = this.form.getRawValue();
        this.service.update(this.announcement.id, {
            type: values.type,
            description: values.description,
            title: values.title,
            short_description: values.short_description,
            end_date: values.end_date.toMySqlFormat(),
        }).toPromise().then(res => {
            if (res.code === 200) {
                this.confirmation.title = 'Request Successful!';
                this.confirmation.type = ConfirmationTypes.success;
                this.confirmation.message = res.message || 'Announcement updated successfully';
                this.confirmation.show();
            } else {
                this.showFailedConfirmation();
            }
            this.isSubmitting = false;
        }).catch(err => {
            this.showFailedConfirmation();
            this.isSubmitting = false;
        });
    }

    showFailedConfirmation() {
        this.confirmation.title = 'Request Failed';
        this.confirmation.type = ConfirmationTypes.failure;
        this.confirmation.message = 'Request Failed';
        this.confirmation.show();
    }

    viewDetails() {
        this.confirmation.hide();
        this.router.navigate(['/', 'dashboard', 'announcements', this.announcement.id])
            .catch(err => {
                console.log(err);
            });
    }

    onClickEditPreview(test: number) {
        if (test === 1) {
            this.isDescriptionEditable = false;
            return;
        }
        this.isDescriptionEditable = true;
    }

    isDescriptionValid() {
        return this.form.controls.description.valid;
    }
}
