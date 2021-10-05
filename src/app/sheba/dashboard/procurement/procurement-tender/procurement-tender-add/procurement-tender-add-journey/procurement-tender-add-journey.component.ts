import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProcurementFormValidationService} from '../procurement-form-validation.service';
import {TenderService} from '../../../../../../services/tender-service/tender.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-procurement-tender-add-journey',
    templateUrl: './procurement-tender-add-journey.component.html',
    styleUrls: ['./procurement-tender-add-journey.component.scss']
})
export class ProcurementTenderAddJourneyComponent implements OnInit, OnDestroy {

    public route: string;
    showJourneyNavigation = true;
    dataLoading = true;
    progress = 0;
    subscription: Subscription;
    open: boolean;
    formTitle = '';
    journeyState: string;
    nextStep: string;
    fromRoute;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private procurementFormValidationService: ProcurementFormValidationService,
        private tenderService: TenderService,
        private pop: PopAlertService
    ) {
        this.fromRoute = this.activatedRoute.snapshot.queryParamMap.get('route');
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.journeyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.journeyState = this.journeyState.split('?')[0];
                this.handleJourneyStateChange(this.journeyState === 'create' ? 'general' : this.journeyState);
            }
        });
    }

    ngOnInit() {
        this.handleStepValidations();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    next() {
        switch (this.journeyState) {
            case 'create':
                this.procurementFormValidationService.notifySubmit({form: 'general'});
                break;
            default:
                if (this.validJourneyState(this.journeyState)) {
                    this.nextNavigate(this.journeyState, this.nextStep);
                    break;
                } else {
                    this.pop.open('Please fill the form properly.');
                }
        }
    }

    nextNavigate(currentState, nextState) {
        this.router.navigate(['/', 'dashboard', 'procurement', 'create', nextState]).catch(err => {
            this.pop.open(err);
        });
    }

    handleJourneyStateChange(state) {
        this.showJourneyNavigation = true;

        this.generateFormTitle(state);

        switch (state) {
            case 'general':
                this.progress = 0;

                if (this.fromRoute === 'summary') {
                    this.nextStep = 'summary';
                } else {

                    // if (this.tenderService.Tender.is_advanced === false) {
                    //     this.nextStep = 'additional-information';
                    // } else if (this.tenderService.Tender.needs_price_quotation) {
                    //     this.nextStep = 'price-quotation';
                    // }  else if (this.tenderService.Tender.needs_technical_evaluation) {
                    //     this.nextStep = 'technical-evaluation';
                    // } else if (this.tenderService.Tender.needs_company_evaluation) {
                    //     this.nextStep = 'company-evaluation';
                    // }

                }
                break;

            case 'additional-information':
                this.progress = 1;
                this.nextStep = 'summary';
                // if (this.tenderService.Tender.is_advanced === false) {
                //
                // } else if (this.tenderService.Tender.needs_price_quotation) {
                //     this.nextStep = 'price-quotation';
                // }  else if (this.tenderService.Tender.needs_technical_evaluation) {
                //     this.nextStep = 'technical-evaluation';
                // } else if (this.tenderService.Tender.needs_company_evaluation) {
                //     this.nextStep = 'company-evaluation';
                // } else {
                //     this.nextStep = 'summary';
                // }
                break;

            case 'price-quotation':
                this.progress = 2;

                if (this.fromRoute === 'summary') {
                    this.nextStep = 'summary';
                } else {
                    if (this.tenderService.Tender.needs_technical_evaluation) {
                        this.nextStep = 'technical-evaluation';
                    } else if (this.tenderService.Tender.needs_company_evaluation) {
                        this.nextStep = 'company-evaluation';
                    } else {
                        this.nextStep = 'summary';
                    }
                }
                break;

            case 'technical-evaluation':
                this.progress = 4;

                if (this.fromRoute === 'summary') {
                    this.nextStep = 'summary';
                } else {
                    if (this.tenderService.Tender.needs_company_evaluation) {
                        this.nextStep = 'company-evaluation';
                    } else {
                        this.nextStep = 'summary';
                    }
                }
                break;

            case 'company-evaluation':
                this.progress = 3;

                if (this.fromRoute === 'summary') {
                    this.nextStep = 'summary';
                } else {
                    this.nextStep = 'summary';
                }
                break;

        }
    }

    generateFormTitle(state) {
        switch (state) {
            case 'general':
                this.formTitle = 'General Information';
                break;
            case 'additional-information':
                this.formTitle = 'Additional Information';
                break;
            case 'price-quotation':
                this.formTitle = 'Price Quotation';
                break;
            case 'company-evaluation':
                this.formTitle = 'Company Evaluation';
                break;
            case 'technical-evaluation':
                this.formTitle = 'Technical Evaluation';
                break;
        }
    }

    handleStepValidations() {
        // @ts-ignore
        this.subscription = this.procurementFormValidationService.notifyObservable.subscribe((res) => {
            if (res.hasOwnProperty('isValid') && res.isValid === 'general') {
                if (this.fromRoute) {
                    const nextState = this.fromRoute;
                    this.nextNavigate('create', nextState);
                } else {
                    if (this.tenderService.Tender.is_advanced === false) {
                        const nextState = 'additional-information';
                        this.nextNavigate('create', nextState);
                    } else if (this.tenderService.Tender.needs_price_quotation) {
                        const nextState = 'price-quotation';
                        this.nextNavigate('create', nextState);
                    }  else if (this.tenderService.Tender.needs_technical_evaluation) {
                        const nextState = 'technical-evaluation';
                        this.nextNavigate('create', nextState);
                    } else if (this.tenderService.Tender.needs_company_evaluation) {
                        const nextState = 'company-evaluation';
                        this.nextNavigate('create', nextState);
                    }
                }
                // const nextState = this.fromRoute ? this.fromRoute : this.nextStep;
            }
        });
    }

    validJourneyState(state) {
        switch (state) {
            case 'additional-information':
                return this.tenderService.AdditionalInformation !== null && this.tenderService.AdditionalInformation !== undefined
                    && this.tenderService.additionalInformation !== '';
            case 'price-quotation':
                return this.tenderService.PriceQuotation !== null && this.tenderService.PriceQuotation !== undefined
                                                            && this.tenderService.PriceQuotation.length !== 0;
            case 'company-evaluation':
                return this.tenderService.CompanyEvaluationData !== null && this.tenderService.CompanyEvaluationData !== undefined
                    && this.tenderService.CompanyEvaluationData.length !== 0;
            case 'technical-evaluation':
                return this.tenderService.TechnicalEvaluationData !== null && this.tenderService.TechnicalEvaluationData !== undefined
                    && this.tenderService.TechnicalEvaluationData.length !== 0;
            default:
                return true;
        }
    }

    openModal() {
        console.log('click');
    }
}
