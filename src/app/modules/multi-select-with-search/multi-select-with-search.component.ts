import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface MultiSelectWithSearchComponentItem {
    id;
    title: string;
    info: string[];
    img: string;
}

@Component({
    selector: 'app-multi-select-with-search',
    templateUrl: './multi-select-with-search.component.html',
    styleUrls: ['./multi-select-with-search.component.scss']
})

export class MultiSelectWithSearchComponent implements OnInit {

    @Input() items: MultiSelectWithSearchComponentItem[];
    filteredItems: MultiSelectWithSearchComponentItem[];
    selectedItems: MultiSelectWithSearchComponentItem[] = [];
    @Output() select = new EventEmitter<MultiSelectWithSearchComponentItem[]>();
    searchKey: string;
    showResults = false;
    noResultFound = false;

    constructor() { }

    ngOnInit() {
        window.addEventListener('click', (e) => {
            if (document.getElementById('multiSelectBox')) {
                // @ts-ignore
                if (document.getElementById('multiSelectBox').contains( e.target ) ) {
                    // Clicked in box
                } else {
                    this.showResults = false;
                }
            }
        });
    }

    addItem(item: MultiSelectWithSearchComponentItem) {
        this.selectedItems.push(item);
        this.exportChanges();
    }

    removeItem({id}) {
        const itemIndex = this.selectedItems.findIndex(item => item.id === id);
        this.selectedItems.splice(itemIndex, 1);
        this.exportChanges();
    }

    isAdded({id}) {
        return this.selectedItems.findIndex(item => item.id === id) !== -1;
    }

    exportChanges() {
        this.select.emit(this.selectedItems.length ? this.selectedItems.map(item => item.id) : []);
    }

    searchItems() {
        this.showResults = true;
        if (this.searchKey && this.searchKey !== '') {
            this.filteredItems = this.items.filter(item => {
                return item.title.toLocaleLowerCase().includes(this.searchKey.toLocaleLowerCase());
            });
            this.filteredItems.length === 0 ? this.noResultFound = true : this.noResultFound = false;
        } else {
            this.noResultFound = false;
            this.filteredItems = [];
        }
    }

    reset() {
        this.searchKey = '';
        this.selectedItems = [];
    }

}
