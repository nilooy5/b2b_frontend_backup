import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {EditRowModalComponent} from './edit-row-modal/edit-row-modal.component';

@Component({
    selector: 'app-editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    displayColumns: any[] = [];
    data: any[] = [];

    @Input() tableData: any;

    @Output() change: EventEmitter<any> = new EventEmitter();

    tableSettings: any = null;

    constructor(
        public dialog: MatDialog,
    ) { }

    ngOnInit() {
        if (this.tableData) {
            this.tableSettings = this.tableData;
            this.tableSettings.columns.push('actions');
            this.updateTable();
        }
    }

    addRow() {
        const row = {};
        this.tableSettings.columns.forEach(col => {
            row[col] = 'value';
        });
        this.tableSettings.rows.push(row);
        this.updateTable();
    }

    addColumn() {
        const newColumnName = 'column_' + (this.tableSettings.columns.length);

        this.tableSettings.columns[this.tableSettings.columns.length - 1] = newColumnName;
        this.tableSettings.columns.push('actions');

        this.tableSettings.rows.forEach(row => {
            row[newColumnName] = 'value';
        });

        this.updateTable();
    }

    editRow(index) {
        const rowData = [];
        for (const key in this.tableSettings.rows[index]) {
            if (this.tableSettings.rows[index].hasOwnProperty(key)) {
                if (key !== 'actions') {
                    rowData.push(this.tableSettings.rows[index][key]);
                }
            }
        }
        this.dialog.open(EditRowModalComponent, {
            data: rowData,
            minWidth: '570px',
            minHeight: '200px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            if (close) {
                this.updateRow(index, close);
            }
        });
    }

    editColumn(column) {
        const rowData = this.tableSettings.columns;

        rowData.splice(rowData.indexOf('actions'), 1);

        this.dialog.open(EditRowModalComponent, {
            data: rowData,
            minWidth: '570px',
            minHeight: '200px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            if (close) {
                this.updateColumn(close, rowData);
            }
        });
    }

    deleteRow(index) {
        this.tableSettings.rows.splice(index, 1);
        this.updateTable();
    }

    deleteColumn(column) {
        this.tableSettings.columns.splice(this.tableSettings.columns.indexOf(column), 1);
        this.tableSettings.rows.forEach(row => {
            delete row[column];
        });
        this.updateTable();
    }

    updateRow(index, data) {
        this.tableSettings.columns.forEach((column, i) => {
            this.tableSettings.rows[index][column] = data[i];
        });
        this.updateTable();
    }

    updateColumn(data, rowData) {
        const newRows = [];
        let newColumns = [];

        this.tableSettings.rows.forEach(row => {
            const entry = {};
            rowData.forEach((item, index) => {
                entry[data[index]] =  row[item];
            });
            newRows.push(entry);
        });

        newColumns = [...data, 'actions'];

        this.tableSettings.columns = newColumns;
        this.tableSettings.rows = newRows;

        this.updateTable();
    }

    updateTable() {
        this.displayColumns = this.tableSettings ? this.tableSettings.columns : [];
        this.dataSource = new MatTableDataSource(this.tableSettings ? this.tableSettings.rows : []);

        this.exportData();
    }

    exportData() {
        const exportData = this.tableSettings;
        // exportData.columns.splice(exportData.columns.indexOf('actions'), 1);
        this.change.emit(exportData);
    }
}
