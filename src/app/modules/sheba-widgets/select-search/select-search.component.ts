import {Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'app-select-search',
    templateUrl: './select-search.component.html',
    styleUrls: ['./select-search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectSearchComponent),
            multi: true
        }
    ]
})
export class SelectSearchComponent implements OnInit, ControlValueAccessor {
    @Input() items: any[] = [];
    @Input() placeholder: any[] = [];
    @Output() select: EventEmitter<any> = new EventEmitter();
    public searchedItems: any[] = [];
    public selectedItem: any[] = [];
    searchFocused = false;

    change;

    constructor(@Inject(DOCUMENT) public document: Document) {
    }

    ngOnInit() {
        // this.items = [
        //     {
        //         id: 1,
        //         title: 'GA - 123456789',
        //         info: 'Toyota Camry 2018',
        //         picture: 'https://i.ibb.co/bXqhnhG/user.png'
        //     },
        //     {
        //         id: 2,
        //         title: 'PA - 123456789',
        //         info: 'Toyota Camry 2018',
        //         picture: 'https://i.ibb.co/bXqhnhG/user.png'
        //     }
        // ];
    }

    registerOnChange(fn: any): void {
        this.change = fn;
    }

    selectItem(item) {
        if (item) {
            this.selectedItem = item.id;
            this.change(this.selectedItem);
            const elem = this.document.getElementById('itemSelect') as any;
            elem.value = this.selectedItem;
        }
        this.searchFocused = false;
    }

    selectFromSelect({target}) {
        this.selectedItem = target.value;
        this.change(this.selectedItem);
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

    searchItems({target}) {
        const key = target.value.toLowerCase();

        if (key) {
            this.searchedItems = this.items.filter(item => item.title.toLowerCase().includes(key));
        } else {
            this.searchedItems = this.items;
        }
    }

}
