import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {StorageService} from '../../../../../../services/storage.service';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {RfqCompareService} from '../../../rfq-services/rfq-details-services/rfq-compare.service';

@Component({
    selector: 'app-rfq-comparison-table',
    templateUrl: './rfq-comparison-table.component.html',
    styleUrls: ['./rfq-comparison-table.component.scss']
})

export class RfqComparisonTableComponent implements OnInit {

    @Input() bidsList;

    bids: any [] = [];
    procurementId;
    // table variables
    tableLoading = false;
    inputColumns = ['id', 'vendor'];
    inputData: any[];
    displayColumns: string[];
    displayData: any[];
    // displayData: MatTableDataSource<any>;
    hasOverflowRight = false;
    hasOverflowLeft = false;
    scrolled = 0;
    contentWidth = 0;
    containerWidth = 0;
    contentScroll = 0;
    scrollable = 0;
    listeners = [];
    titleRows: any[] = [];
    visibleBids: any [] = [];
    compareIndexes: number [] = [];

    @ViewChild('content') content: ElementRef<any>;
    @ViewChild('container') container: ElementRef<any>;
    @HostBinding('style.display') display = 'block';

    constructor(private rfqCompareService: RfqCompareService,
                private route: ActivatedRoute,
                private pop: PopAlertService,
                private storage: StorageService) {
        this.procurementId = route.snapshot.parent.params.id;
        this.compareIndexes = this.storage.ProcurementBidCompareIndexes;
    }

    ngOnInit() {
        this.bids = this.bidsList;
        this.storage.procurementBidCompareIndexesWatcher.asObservable().subscribe((res) => {
            if (this.bids.length) {
                this.visibleBids = this.bids.filter((bid, index) => {
                    // tslint:disable-next-line:triple-equals
                    return res.findIndex(i => i == index) !== -1;
                });
                this.generateTable().then(d => {
                    this.initiateSlider();
                });
            }
        });
        this.rfqCompareService.procurementBidRefreshEmitter.asObservable().subscribe(res => {
            if (res) { window.location.reload(); }
        });
        this.rfqCompareService.procurementBidFilterEmitter.asObservable().subscribe(res => {
            if (res) {
                this.visibleBids = this.bids.filter((bid) => {
                    return bid.is_favourite;
                });
                this.generateTable().then(d => {
                    this.initiateSlider();
                });
            } else {
                // this.visibleBids = this.bids;
                this.visibleBids = this.bids.filter((bid, index) => {
                    // tslint:disable-next-line:triple-equals
                    return this.compareIndexes.findIndex(i => i == index) !== -1;
                });
                this.generateTable().then(d => {
                    this.initiateSlider();
                });
            }
        });
    }

    getBidIndex({id}) {
        return this.bids.findIndex(bid => bid.id === id);
    }

    async generateTable() {
        if (this.visibleBids.length) {
            const tableData = await this.generateTableData();
            return new Promise(resolve => {
                this.displayColumns = tableData[0].map(x => x.toString());
                this.displayData = tableData.map(row => {
                    return row.map((field, index) => {
                        return { value: field };
                    });
                });
                this.tableLoading = false;
                resolve();
            });
        } else {
            return new Promise(resolve => {
                this.displayColumns = [];
                this.displayData = [];
                this.tableLoading = false;
                resolve();
            });
        }
    }

    async generateTableData() {
        const tableData = [];
        tableData.push(['Quotation', ...this.visibleBids.map((bid) => {
            return {
                id: bid.id,
                name: bid.bidder_name,
                logo: bid.bidder_logo,
                rating: bid.bidder_avg_rating,
                is_favourite: bid.is_favourite,
                verificationStatus: bid.bidder_status
            };
        })]);
        if (!this.visibleBids[0].item.length) {
            tableData.push(['Proposed Price', ...this.visibleBids.map((bid) => {
                return bid.price;
            })]);
        }
        const itemTypes = this.visibleBids[0].item.length ? this.visibleBids[0].item.map(i => i.item_type) : [];
        await itemTypes.forEach(type => {
            this.titleRows.push(tableData.length);
            tableData.push([this.capitalizeFirstLetter(type.split('_').join(' ')), ...this.visibleBids.map((bid) => {
                return '';
            })]);
            let fields = [];
            this.visibleBids.forEach(bid => {
                fields.push(...bid.item.find(i => i.item_type === type).fields);
            });
            fields = this.removeArrayDuplicates(fields);

            const typeWiseData = [];
            fields.forEach(field => {
                const rowData = [];
                rowData.push(field.question);
                this.visibleBids.forEach(bid => {
                    const bidFields = bid.item.find(i => i.item_type === type).fields;
                    if (bidFields && bidFields.length) {
                        const currentField = bidFields.find(f => f.key === field.key);
                        rowData.push(currentField ? currentField.input_type === 'checkbox' ? this.formatAnswer(currentField.answer) : currentField.answer : '');
                    }
                });
                tableData.push(rowData);
            });

            if (type === 'price_quotation') {
                tableData.push(['Proposed Price', ...this.visibleBids.map((bid) => {
                    return bid.item.find(i => i.item_type === 'price_quotation').total_price;
                })]);
            }
        });

        const indexRow = [0];
        this.visibleBids.forEach((bid, index) => {
            indexRow.push(index + 1);
        });

        tableData.unshift(indexRow);

        return tableData;
    }

    isTitleRow(index) {
        // tslint:disable-next-line:triple-equals
        return this.titleRows.findIndex(i => i == index) !== -1;
    }

    formatAnswer(str) {
        if (str) {
            str = str.replace(/\[/g, '');
            str = str.replace(/\]/g, '');
            str = str.replace(/'/g, '');
            str = str.replace(/"/g, '');
            str = str.replace(/,/g, ', ');
            return str;
        }
    }

    removeArrayDuplicates(array) {
        return array.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.key === thing.key
            ))
        );
    }

    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    initiateSlider(): void {
        if (this.container) {
            this.listeners[0] = this.container.nativeElement.addEventListener('scroll', this.onScrollContent.bind(this));
            this.listeners[1] = this.container.nativeElement.addEventListener('resize', this.onResize.bind(this));
            of(null).pipe(delay(500)).toPromise().then(() => {
                this.initModel();
            });
        }
    }

    next() {
        this.scrolled += 220;
        if (this.scrolled > this.scrollable) { this.scrolled = this.scrollable; }
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: 'smooth'});
    }

    previous() {
        this.scrolled -= 260;
        if (this.scrolled < 0) { this.scrolled = 0; }
        this.container.nativeElement.scrollTo({left: this.scrolled, top: 0, behavior: 'smooth'});
    }

    initModel() {
        this.containerWidth = this.container.nativeElement.clientWidth;
        // @ts-ignore
        this.contentWidth = this.content._elementRef.nativeElement.clientWidth;
        this.scrollable = this.contentWidth - this.containerWidth;
        this.hasOverflowRight = this.contentWidth >= this.containerWidth;
    }

    onScrollContent(e) {
        this.contentScroll = e.target.scrollLeft;
        this.hasOverflowLeft = this.contentScroll > 0;
        this.scrolled = this.contentScroll;
        this.hasOverflowRight = this.scrolled < this.scrollable;
    }

    @HostListener('window:resize', ['$event'])

    onResize($event) {
        this.initModel();
    }

    isBidVisible(index) {
        // tslint:disable-next-line:triple-equals
        return this.compareIndexes.findIndex(i => i == 1) !== -1;
    }
}
