import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material";
import {CompanyUpdateData} from "../../../types/users";
import {ShebaHttpService} from "../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../services/storage.service";
import {DashboardResolveService} from "../dashboard-resolve.service";

@Injectable()
export class CompanyService {

    constructor(
        private dialog: MatDialog,
        private http: ShebaHttpService,
        private storage: StorageService,
        private dashboardService: DashboardResolveService
    ) {
    }

    showUpdater(component, data?: CompanyUpdateData) {
        data = Object.assign({company: null}, data);
        return this.dialog.open(component, {data: data, disableClose: true, panelClass: 'round-model'});
    }

    getLocations() {
        return this.http.get('v2/locations');
    }

    updateBusinessInfo(data) {
        return this.http.post('v2/members/' + this.storage.user.member_id + '/update-business-info', data);
    }

    updateBusinessStatus() {
        return this.dashboardService.getBusinessInfo().toPromise();
    }

    resetPassword(data:any) {
        // this.http.post('v2/password/email',)
    }
}
