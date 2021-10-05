import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {TableDataSource, ValidatorService} from 'angular4-material-table';
import {ETable} from '../../types/general';
import {EditableTableInlineService} from './editable-table-inline.service';
import {PopAlertService} from '../pop-alert/pop-alert.service';


@Component({
    selector: 'app-editable-table-inline',
    templateUrl: './editable-table-inline.component.html',
    styleUrls: ['./editable-table-inline.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        {provide: ValidatorService, useClass: EditableTableInlineService}
    ],
})

export class EditableTableInlineComponent implements OnInit, AfterViewInit {

    @Input() tableData: any;
    @Input() quotationList = [];
    @Output() quotationListChange = new EventEmitter<any>();

    @ViewChild('addNewRow') addNewRow: ElementRef<HTMLElement>;

    dataSource: TableDataSource<any>;
    showAddNewRowButton = true;
    displayedColumns: { label: string, value: string, type: string, increment: string}[];
    displayColumns: string[] = [];

    inEditMode: boolean[] = [];

    constructor(private quotationValidator: ValidatorService,
                private pop: PopAlertService,
                private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        this.displayedColumns = this.tableData;
        this.dataSource = new TableDataSource<any>(this.quotationList, ETable, this.quotationValidator);
        this.dataSource.datasourceSubject.subscribe(quotationList => this.quotationListChange.emit(quotationList));
        this.displayColumns = this.displayedColumns.map(res => res.value);
    }

    ngAfterViewInit(): void {
        if (this.quotationList && this.quotationList.length === 0) {
            this.autoAddNewRow();
        }
    }

    autoAddNewRow() {
        const el: HTMLElement = this.addNewRow.nativeElement;
        el.click();
        this.inEditMode[0] = true;
        this.showAddNewRowButton = false;
        this.cdRef.detectChanges();
    }

    createNewRow(dataSource) {
        this.showAddNewRowButton = false;
        dataSource.createNew();
        if (dataSource.currentData) { this.inEditMode[dataSource.currentData.length] = true; }
    }

    deleteRow(row: any) {
        if (row.editing === true) {
            this.showAddNewRowButton = true;
            row.cancelOrDelete();
        } else {
            row.cancelOrDelete();
        }
    }

    confirmRow(row, index) {
        if (row.validator.status === 'VALID') {
            this.showAddNewRowButton = true;
            this.inEditMode[index] = false;
            row.confirmEditCreate();
        } else {
            this.pop.open('Please fill in all the forms');
        }
    }

    editRow(row, index) {
        this.inEditMode[index] = true;
        row.startEdit();
        this.showAddNewRowButton = false;
    }

}
