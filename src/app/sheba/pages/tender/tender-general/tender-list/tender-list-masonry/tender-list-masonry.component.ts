import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
// @ts-ignore
import MagicGrid from 'magic-grid';
import {NumericFormat} from '../../../../../../helpers/numeric_format.service';
import {NgxMasonryComponent} from 'ngx-masonry';

@Component({
    selector: 'app-tender-list-masonry',
    templateUrl: './tender-list-masonry.component.html',
    styleUrls: ['./tender-list-masonry.component.scss']
})
export class TenderListMasonryComponent implements OnInit, AfterContentInit, OnChanges {

    @Input() tenderList;
    @Input() totalTenders;
    @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

// after the order of items has changed

    gridView;

    constructor(public numericFormat: NumericFormat) {
    }

    ngOnChanges(changes: SimpleChanges) {
        /*setTimeout(() => {
            this.generateGrid();
        }, 200);*/
    }

    ngOnInit() {
        /*this.generateGrid();
        this.gridView.positionItems();*/
        this.masonry.reloadItems();
        this.masonry.layout();
    }

    ngAfterContentInit() {
    }

    /*generateGrid() {
        const magicGrid = new MagicGrid({
            container: '#container-masonry', // Required. Can be a class, id, or an HTMLElement.
            // static: true, // Required for static content.
            animate: true, // Optional.
            maxColumns: 2,
            gutter: 10,
            items: this.totalTenders
        });
        this.gridView = magicGrid;
        magicGrid.listen();
    }*/

}
