import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CoWorkerStorageService} from '../../../../../services/co-workers-storage-service/co-worker-storage.service';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {Breadcrumb} from '../../../../../types/general';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {CoWorkersSharedService} from '../co-workers-services/co-workers-shared.service';
import {CoWorkersAddService} from '../co-workers-services/co-workers-add.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-co-workers-add',
    templateUrl: './co-workers-add.component.html',
    styleUrls: ['./co-workers-add.component.scss']
})

export class CoWorkersAddComponent implements OnInit, OnDestroy {

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Co-Workers List',
            path: '/dashboard/co-workers'
        },
        {
            title: 'Add Co-Worker',
            isActive: true
        }
    ];
    totalProfileCompletion = 0;
    profileOrValidationUpdateSub$: Subscription;

    currentJourneyState;

    profileRequirements = [
        {
            title: 'Basic',
            no: 1,
            link: 'basic',
            isActive: false,
            showNumber: true,
            isValid: false
        },
        {
            title: 'Official',
            no: 2,
            link: 'official',
            isActive: false,
            showNumber: true,
            isValid: false
        },
        {
            title: 'Personal',
            no: 3,
            link: 'personal',
            isActive: false,
            showNumber: true,
            isValid: false
        },
        {
            title: 'Financial',
            no: 4,
            link: 'financial',
            isActive: false,
            showNumber: true,
            isValid: false
        },
        {
            title: 'Emergency',
            no: 5,
            link: 'emergency',
            isActive: false,
            showNumber: true,
            isValid: false
        }
    ];

    // isValid = true;
    // isActive = false;

    constructor(private router: Router,
                private pop: PopAlertService,
                private activatedRoute: ActivatedRoute,
                private coWorkersAddService: CoWorkersAddService,
                private coWorkersSharedService: CoWorkersSharedService,
                private dashboardSharedService: DashboardSharedService,
                private coWorkerStorageService: CoWorkerStorageService) {
        activatedRoute.data.subscribe(({coworkersAdd}) => {
            if (coworkersAdd && coworkersAdd.profile_completion) {
                this.updateValidationStatus(coworkersAdd);
                this.totalProfileCompletion = coworkersAdd.profile_completion;
            }
        });
        dashboardSharedService.changeHeaderTitle('Add Co-Workers');
        dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        coWorkerStorageService.resetCoWorkersStorage();
        this.splitCurrentRouteUrl();

        this.updateProfileCompletion();
    }

    ngOnInit() { }

    splitCurrentRouteUrl() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentJourneyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentJourneyState = this.currentJourneyState.split('?')[0];
                this.activeStep(this.currentJourneyState);
            }
        });
    }


    updateValidationStatus(coworkerInfo) {
        coworkerInfo.basic_info.basic_info_completion > 0 ? this.profileRequirements[0].isValid = true : this.profileRequirements[0].isValid = false;
        coworkerInfo.official_info.official_info_completion > 0 ? this.profileRequirements[1].isValid = true : this.profileRequirements[1].isValid = false;
        coworkerInfo.personal_info.personal_info_completion > 0 ? this.profileRequirements[2].isValid = true : this.profileRequirements[2].isValid = false;
        coworkerInfo.financial_info.financial_info_completion > 0 ? this.profileRequirements[3].isValid = true : this.profileRequirements[3].isValid = false;
        coworkerInfo.emergency_info.emergency_info_completion > 0 ? this.profileRequirements[4].isValid = true : this.profileRequirements[4].isValid = false;
    }

    activeStep(state) {
        this.profileRequirements.filter(item => {
            item.isActive = false;
            if (item.link === state) {
                item.isValid = false;
                item.isActive = true;
            }
        });
    }

    redirectTo(link, index) {
        this.router.navigate(['/', 'dashboard', 'co-workers', 'add', link]).then((res) => {
            if (res) {
                this.profileRequirements[index].isActive = true;
                this.getUpdatedCoworkerDetails();
            }
        });
    }

    // Updating Profile Score and Stepper Validation Here
    updateProfileCompletion() {
        this.profileOrValidationUpdateSub$ = this.coWorkersSharedService.currentUpdateCoworkerProfileCompletionScore.subscribe(res => {
            if (res === 'add') {
                this.getUpdatedCoworkerDetails();
            }

            if (res === 'remove') {
                this.totalProfileCompletion = 0;
            }
        });
    }


    getUpdatedCoworkerDetails() {
        const coworkerId = this.coWorkerStorageService.CoworkerId;
        this.coWorkersAddService.getCoWorkerDetails(coworkerId).subscribe((coworkersAdd) => {
            if (coworkersAdd && coworkersAdd.profile_completion) {
                this.totalProfileCompletion = coworkersAdd.profile_completion;
                this.updateValidationStatus(coworkersAdd);
                this.activeStep(this.currentJourneyState);
            }
        });
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
        this.coWorkerStorageService.removeCoWorkersFromStorage();
        this.dashboardSharedService.changeHeaderTitle(null);
        this.profileOrValidationUpdateSub$.unsubscribe();
    }


}
