import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { RfqCreateService } from '../../../../rfq-services/rfq-create-services/rfq-create.service';
import { PopAlertService } from '../../../../../../../modules/pop-alert/pop-alert.service';
import { ITags } from '../../../../../../../types/rfq';
import { MatChipInputEvent } from '@angular/material/chips';
import {RfqStorageService} from '../../../../../../../services/rfq-storage-service/rfq-storage.service';

@Component({
    selector: 'app-rfq-create-tags',
    templateUrl: './rfq-create-tags.component.html',
    styleUrls: ['./rfq-create-tags.component.scss']
})

export class RfqCreateTagsComponent  {

    @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
    @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;
    @Output() tagsList: EventEmitter<string[]> = new EventEmitter<string[]>();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    addOnBlur = false;
    selectable = true;
    removable = true;

    isSearching = false;
    isListAvailable = false;
    isFocused = false;

    tagsInputCtrl = new FormControl();

    filteredTags: ITags[] = [];
    tags: string[] = [];

    constructor(private rfqCreateService: RfqCreateService,
                private rfqStorageService: RfqStorageService,
                private pop: PopAlertService) {
        this.getTagsListFromApi();
        this.handlePreviousTags();
    }

    handlePreviousTags() {
        this.tags = this.rfqStorageService.BasicInformation && this.rfqStorageService.BasicInformation.tags
            ? this.rfqStorageService.BasicInformation.tags :  [];
    }

    getTagsListFromApi(): void {
        this.tagsInputCtrl.valueChanges.pipe(
                debounceTime(300),
                tap(() => {
                    this.filteredTags = [];
                    this.isSearching = true;
                    this.isFocused = false;
                }),
                switchMap(value => {
                        if (value !== '') {
                            return this.rfqCreateService.getRfqTags(value).pipe(
                                finalize(() => {
                                    this.isSearching = false;
                                    this.isListAvailable = true;
                                }),
                            );
                        }
                        this.isListAvailable = false;
                        this.isSearching = false;
                        this.isFocused = true;
                        return [];
                    }
                )
            )
            .subscribe(({ tags }) => this.filteredTags = tags);
    }

    removeTag(tag: string): void {
        const index = this.tags.indexOf(tag);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
        this.tagsList.emit(this.tags);
    }

    addTags(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '')) {
            this.checkDuplicateTag(value);
        }

        if (input) {
            input.value = '';
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.checkDuplicateTag(event.option.viewValue);
    }

    checkDuplicateTag(receivedTag: string): void {
        const isDuplicateTag = this.tags.some((storedTag) => storedTag === receivedTag);
        if (isDuplicateTag) {
            this.pop.open('Duplicate Tag Entry');
            return;
        }
        this.pushTags(receivedTag);
    }

    pushTags(tag: string): void {
        this.tags.push(tag);
        this.chipsInput.nativeElement.value = '';
        this.tagsInputCtrl.setValue(null);
        this.tagsList.emit(this.tags);
    }

    onFocus(): void {
        if (this.tagsInputCtrl.value === '' || this.tagsInputCtrl.value === null) {
            this.isFocused = true;
        }
    }

    onBlur(): void {
        this.isFocused = false;
    }

}
