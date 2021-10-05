import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import {TenderService} from '../services/tender-service/tender.service';
import {StorageService} from '../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class RFQGuardService implements CanLoad {

    constructor(private router: Router,
                private storage: StorageService,
                private tenderService: TenderService) {

    }

    canLoad(route: Route): boolean {
        if (this.tenderService.Tender.is_advanced === false) {
            this.router.navigate(['/', 'dashboard', 'procurement', 'create', 'summary']).catch(err => {
                console.log(err);
            });
            return false;
        }  else {

            return true;
            // if (this.tenderService.Tender.needs_price_quotation === true) {
            //     console.log(route.path);
            //     return true;
            // }
            //
            // if (this.tenderService.Tender.needs_company_evaluation === true) {
            //     if (route.path === 'company-evaluation') {
            //         return true;
            //     }
            // }
            //
            // if (this.tenderService.Tender.needs_technical_evaluation === true) {
            //     if (route.path === 'technical-evaluation') {
            //         return true;
            //     }
            // }
        }
    }
}
