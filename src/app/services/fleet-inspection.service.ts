import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {ShebaHttpService} from "../modules/sheba-http/sheba-http.service";
import {BehaviorSubject, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {FleetService} from "./fleet.service";
import {listFilters} from "../helpers/functions";

@Injectable({
    providedIn: 'root'
})
export class FleetInspectionService {
    member_id: number;
    business_id: number;
    Template: BehaviorSubject<{ event?: 'update', data?: any }> = new BehaviorSubject({});
    formTemplateUrl: string;
    businessUrl: string;
    inspectionUrl: string;

    constructor(
        private storage: StorageService,
        private http: ShebaHttpService,
        private service: FleetService
    ) {
        this.business_id = this.storage.user.business_id;
        this.member_id = this.storage.user.member_id;
        this.businessUrl = 'v2/businesses/' + this.business_id + '/';
        this.formTemplateUrl = this.businessUrl + 'form-templates/';
        this.inspectionUrl = this.businessUrl + 'inspections/'
    }

    getForms() {
        return this.http.get(this.formTemplateUrl.replace(/\/$/, "")).pipe(catchError(err => {
            return of([]);
        }), map(res => res.code === 200 ? res.templates : []));
    }

    getForm(id: number | string) {
        return this.http.get(this.formTemplateUrl + id).pipe(catchError(err => {
            console.log(err);
            return of(null)
        }), map(res => res.code === 200 ? res.form_template : null));
    }

    createForm(data: any) {
        return this.http.post(this.formTemplateUrl.replace(/\/$/, ""), data);
    }

    createNewFormItems(form_id: number, data: any) {
        return this.http.post(this.formTemplateUrl + form_id + '/items', data);
    }

    createInspection(data: any) {
        return this.http.post(this.inspectionUrl.replace(/\/$/, ""), data);
    }

    updateForm(id: number, data: any) {
        return this.http.post(this.formTemplateUrl + id, data);
    }

    updateFormItem(id: number, template_id: number, data: any) {
        return this.http.post(this.formTemplateUrl + template_id + '/items/' + id, data);
    }

    deleteFormItem(id: number, template_id: number) {
        return this.http.delete(this.formTemplateUrl + template_id + '/items/' + id);
    }

    private getInspectionList(filters: string) {
        return this.http.get(this.inspectionUrl.replace(/\/$/, "") + filters).pipe(catchError(err => {
            return of({});
        }), map(res => res.code === 200 ? res.inspection_lists : []));
    }

    getOngoingList(page?: number, limit?: number, filter?: any) {
        if (filter) filter.filter = 'process';
        else filter = {filter: 'process'};
        const filters = listFilters(page, limit, filter);
        return this.getInspectionList(filters);
    }

    getIndividualInspectionList(page?: number, limit?: number, filter?: any) {
        if (filter) filter.filter = 'open';
        else filter = {filter: 'open'};
        const filters = listFilters(page, limit, filter);
        return this.getInspectionList(filters);
    }

    getVehicleWithType(type: string) {
        return this.service.getVehicles(0, 20, {type: type});
    }

    getFailedItemsList(page?: number, limit?: number, filter?: any) {
        const filters = listFilters(page, limit, filter);
        return this.http.get(this.businessUrl + 'inspection-items' + filters).pipe(catchError(() => {
            return of({});
        }), map(res => res.code === 200 ? {list: res.item_lists, open: res.open_issues, pending: res.pending_item} : {
            list: [],
            open: 0,
            pending: 0
        }));
    }

    createAcknowledge(inspection_id: number, item_id: number, data: { note: string }) {
        return this.http.post(this.businessUrl + 'inspections/' + inspection_id + '/items/' + item_id + '/acknowledge', data);
    }

    createIssue(data: { inspection_item_id: number }) {
        return this.http.post(this.businessUrl + 'issues', data);
    }

    getInspectionDetails(inspection_id: number | string) {
        return this.http.get(this.businessUrl + 'inspections/' + inspection_id).pipe(catchError(err => of({})), map(res => res.code === 200 ? res.inspection : null));
    }

    updateInspectionItems(item_id: number, inspection_id: number, data: any) {
        return this.http.post(this.businessUrl + 'inspections/' + inspection_id + '/items/' + item_id, data);
    }

    createNewInspectionItem(inspection_id: number, data: any) {
        return this.http.post(this.businessUrl + 'inspections/' + inspection_id + '/items', data);
    }

    deleteInspectionFormItem(item_id: number, inspection_id) {
        return this.http.delete(this.businessUrl + 'inspection/' + inspection_id + '/items');
    }
}
