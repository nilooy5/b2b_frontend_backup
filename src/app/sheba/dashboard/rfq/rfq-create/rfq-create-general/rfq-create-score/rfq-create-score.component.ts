import { Component, OnInit, ViewChild } from '@angular/core';
import { CircleProgressComponent } from 'ng-circle-progress';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ValidFormControls } from '../../../../../../types/rfq';
import {RfqCreateSharedService} from '../../../rfq-services/rfq-create-services/rfq-create-shared.service';
import {RfqStorageService} from '../../../../../../services/rfq-storage-service/rfq-storage.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-create-score',
    templateUrl: './rfq-create-score.component.html',
    styleUrls: ['./rfq-create-score.component.scss'],
    animations: [
        trigger('removeScore', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({opacity: 0}),
                animate(300, style({opacity: 1}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(0, style({opacity: 0}))
            ])
        ]),
        trigger('addScore', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({opacity: 0}),
                animate(300, style({opacity: 1}))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(50, style({opacity: 0, }))
            ]),
            state('*', style({ color: '#089e4d' })),
        ])
    ]
})

export class RfqCreateScoreComponent implements OnInit {

    requirements = {
        title: {
            title: 'Title (10 characters)',
            score: 30,
            isChecked: false
        },
        description: {
            title: 'Description ( 20 characters)',
            score: 30,
            isChecked: false
        },
        attachment: {
            title: 'Attachment',
            score: 15,
            isChecked: false
        },
        budget: {
            title: 'Budget',
            score: 10,
            isChecked: false
        },
        tags: {
            title: 'Tags',
            score: 15,
            isChecked: false
        },
    };

    isChecked = false;
    totalPercent = 0;

    showScoreboard = false;

    @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

    ngCircleOptions = {
        outerStrokeColor: '#fa5252',
        subtitleFormat: (percent: number): string => {
            if (percent < 25) {
                this.ngCircleOptions.outerStrokeColor = '#fa5252';
            } else {
                this.ngCircleOptions.outerStrokeColor = '#12b886';
            }
            return '';
        }
    };

    constructor(private rfqCreateSharedService: RfqCreateSharedService,
                private storageService: StorageService,
                private rfqStorageService: RfqStorageService) {

        // this.initializeDeadlineScore();
        this.watchRfqGeneralInfoChanges();
        this.checkRfqStorage();

        //
        // this.storageService.watchStorage().subscribe(data => {
        //     console.log(data.basicInformation);
        //     if (data.basicInformation) {
        //         this.checkBudgetValidation('budget', data.basicInformation.budget);
        //     }
        // });
    }

    ngOnInit() { }
    //
    // initializeDeadlineScore() {
    //     this.requirements['deadline'].isChecked = true;
    //     this.totalPercent += this.requirements['deadline'].score;
    // }

    watchRfqGeneralInfoChanges() {
        console.log(this.totalPercent);
        this.rfqCreateSharedService.currentGeneralInfoValidationStatus.subscribe((res: ValidFormControls) => {
            // if (res) {
                if (res.isValid) {
                    // this.showScoreboard = true;
                    this.requirements[res.name].isChecked = res.isValid;
                    console.log(this.totalPercent);
                    console.log(this.requirements[res.name]);
                    this.totalPercent += this.requirements[res.name].score;
                    console.log(this.totalPercent);

                } else {
                    // this.showScoreboard = true;
                    this.requirements[res.name].isChecked = res.isValid;
                    this.totalPercent -= this.requirements[res.name].score;
                }
            // }
        });
    }

    disableAlphabeticSorting() {
        return 0;
    }

    checkRfqStorage() {
        const isTitleValid = this.rfqStorageService.RfqValidation.hasTitle;
        const isDescriptionValid = this.rfqStorageService.RfqValidation.hasDescription;
        const isBudgetValid = this.rfqStorageService.RfqValidation.hasBudget;
        const isTagsValid = this.rfqStorageService.RfqValidation.hasTags;
        const isAttachmentValid = this.rfqStorageService.RfqValidation.hasAttachment;


        if (isTitleValid) {
            this.requirements['title'].isChecked = true;
            this.totalPercent += this.requirements['title'].score;
        }
        if (isDescriptionValid) {
            this.requirements['description'].isChecked = true;
            this.totalPercent += this.requirements['description'].score;
        }
        if (isBudgetValid) {
            this.requirements['budget'].isChecked = true;
            this.totalPercent += this.requirements['budget'].score;
        }
        if (isTagsValid) {
            this.requirements['tags'].isChecked = true;
            this.totalPercent += this.requirements['tags'].score;
        }
        if (isAttachmentValid) {
            this.requirements['attachment'].isChecked = true;
            this.totalPercent += this.requirements['attachment'].score;
        }
    }

}
