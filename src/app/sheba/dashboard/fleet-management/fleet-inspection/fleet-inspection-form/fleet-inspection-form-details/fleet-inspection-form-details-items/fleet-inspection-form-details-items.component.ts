import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InspectionForm} from "../../../../../../../types/fleet";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {InspectionFormItemEvents} from "../../fleet-inspection-form-item/fleet-inspection-form-item.component";
import {FleetInspectionService} from "../../../../../../../services/fleet-inspection.service";
import {PopAlertService} from "../../../../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../../../../helpers/functions";
import {ConfirmationService} from "../../../../../../../modules/confirmation/confirmation.service";

@Component({
    selector: 'app-fleet-inspection-form-details-items',
    templateUrl: './fleet-inspection-form-details-items.component.html',
    styleUrls: ['./fleet-inspection-form-details-items.component.scss']
})
export class FleetInspectionFormDetailsItemsComponent implements OnInit {
    templateForm: InspectionForm;
    newItems: FormArray;
    @ViewChild('OpenNew') openNewTemplate: TemplateRef<any>;
    bottomSheetRef: MatBottomSheetRef<TemplateRef<any>>;
    private confirmSubText: string = 'Any changes in this template might effect the current/scheduled inspections';

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private bottomSheet: MatBottomSheet,
        private service: FleetInspectionService,
        private pop: PopAlertService,
        private confirmations: ConfirmationService
    ) {
        this.route.parent.parent.data.subscribe(res => {
            this.templateForm = res.template;
        });
        this.initNewItemsForm();

    }

    ngOnInit() {
    }

    initNewItemsForm() {
        this.newItems = this.fb.array([], Validators.required);
    }

    OnItemEvent(event: InspectionFormItemEvents) {
        this[event.event](event);
    }

    delete(event) {
        if (!event.data) {
            this.newItems.removeAt(event.index)
        } else {
            this.confirmations.open({
                title: 'Are you sure you want to delete this item ? ',
                sub_title: this.confirmSubText,
            }).afterClosed().subscribe(res => {
                if (res) {
                    this.deleteItem(event.data.id);
                }
            })
        }
    }

    deleteItem(id: number) {
        this.service.deleteFormItem(id, this.templateForm.id).toPromise().then(res => {
            if (res.code === 200) {
                this.reloadItems();
            }
            this.pop.open(res.message);
        }).catch(err => {
            this.pop.open(getErrorMessage(err));
        });
    }

    update(event) {
        this.confirmations.open({
            title: 'Are you sure you want to update this item? ',
            sub_title: this.confirmSubText,
        }).afterClosed().subscribe(res => {
            if (res) {
                const data = Object.assign({}, event.data);
                delete data.id;
                this.service.updateFormItem(event.data.id, this.templateForm.id, data).toPromise().then(res => {
                    if (res.code === 200) {
                        this.reloadItems();
                    }
                    this.pop.open(res.message);
                }).catch(err => {
                    this.pop.open(getErrorMessage(err));
                })
            }
        })
    }

    addItem(type) {
        // this.bottomSheetRef.dismiss(true);
        this.newItems.push(this.fb.group({
            title: ['', [Validators.required]],
            short_description: '',
            type: [type, Validators.required],
            is_required: [1, Validators.required],
            instructions: ''
        }));
    }

    saveNewItems() {
        this.confirmations.open({
            title: 'Are you sure you want to add new item? ',
            sub_title: this.confirmSubText,
        }).afterClosed().subscribe(res => {
            if (res) {
                const data = {variables: JSON.stringify(this.newItems.getRawValue())};
                this.service.createNewFormItems(this.templateForm.id, data).toPromise().then(res => {
                    if (res.code === 200) {
                        this.reloadItems();
                    }
                    this.pop.open(res.message);
                }).catch(err => {
                    this.pop.open(getErrorMessage(err));
                })
            }
        });
    }

    getGroups() {
        return this.newItems.controls as FormGroup[];
    }

    reloadItems() {
        this.service.getForm(this.templateForm.id).toPromise().then(res => {
            this.initNewItemsForm();
            this.templateForm = res;
            this.service.Template.next({event: "update", data: res});
        })
    }

    // openNew() {
    //     this.bottomSheetRef = this.bottomSheet.open(this.openNewTemplate, {closeOnNavigation: true});
    // }
}
