import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../services/storage.service";
import {Company} from "../../../../types/users";

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
    company: Company;
    showUpdate: boolean;

    constructor(
        private storage: StorageService
    ) {
        this.setCompany();
    }

    setCompany() {
        this.company = this.storage.getData('business_info');
    }

    ngOnInit() {
    }

    updateCompany(event: boolean) {
        if (event) {
            this.showUpdate = !this.showUpdate;
            this.setCompany();
        }
    }

}
