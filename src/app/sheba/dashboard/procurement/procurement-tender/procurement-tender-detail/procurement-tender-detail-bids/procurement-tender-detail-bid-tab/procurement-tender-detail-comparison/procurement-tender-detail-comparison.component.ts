import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ProcurementBidsService} from '../../../procurement-bids.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../../../../modules/pop-alert/pop-alert.service';
import {StorageService} from '../../../../../../../../services/storage.service';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-procurement-tender-detail-comparison',
    templateUrl: './procurement-tender-detail-comparison.component.html',
    styleUrls: ['./procurement-tender-detail-comparison.component.scss']
})

export class ProcurementTenderDetailComparisonComponent implements OnInit {
    bids: any [] = [];
    procurementId;

    // table variables
    tableLoading: boolean = false;
    inputColumns = ['id', 'vendor'];
    inputData: any[];
    displayColumns: string[];
    displayData: any[];
    // displayData: MatTableDataSource<any>;
    hasOverflowRight: boolean = false;
    hasOverflowLeft: boolean = false;
    scrolled: number = 0;
    contentWidth: number = 0;
    containerWidth: number = 0;
    contentScroll: number = 0;
    scrollable: number = 0;
    listeners = [];
    titleRows: any[] = [];
    visibleBids: any [] = [];
    compareIndexes: number [] = [];

    @ViewChild('content') content: ElementRef<any>;
    @ViewChild('container') container: ElementRef<any>;
    @HostBinding('style.display') display = 'block';

    constructor(
        private procurementBidsService: ProcurementBidsService,
        private route: ActivatedRoute,
        private pop: PopAlertService,
        private storage: StorageService
    ) {
        this.procurementId = this.route.snapshot.params.procurement_id;

        this.compareIndexes = this.storage.ProcurementBidCompareIndexes;

        this.route.data.subscribe(res => {
            // @ts-ignore
            this.bids = res.bids;
            // this.visibleBids = this.bids;
            // this.generateTable().then(() => {
            //     this.initiateSlider();
            // });
        });

        // this.getAllBids().then(res => {
        //     // @ts-ignore
        //     this.bids = res;
        //     this.visibleBids = this.bids;
        //     this.generateTable().then(() => {
        //         this.initiateSlider();
        //     });
        // });
    }

    ngOnInit() {
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
        this.procurementBidsService.procurementBidRefreshEmitter.asObservable().subscribe(res => {
            if (res) { window.location.reload(); }
        });
        this.procurementBidsService.procurementBidFilterEmitter.asObservable().subscribe(res => {
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
                is_favourite: bid.is_favourite
            };
        })]);

        // finding items
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
                tableData.push(['Total Price', ...this.visibleBids.map((bid) => {
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

    getAllBids() {
        this.tableLoading = true;
        return new Promise(resolve => {
            this.procurementBidsService.fetchAllBids(this.procurementId).then(res => {
                resolve(res);
            }).catch(err => {
                this.pop.open(err);
                this.tableLoading = false;
            });
        });
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
