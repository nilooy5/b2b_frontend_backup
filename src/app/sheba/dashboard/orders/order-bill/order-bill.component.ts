import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {OrderService} from "../../../../services/order-service/order.service";
import {OrderBill} from "../../../../types/orders";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
    selector: 'app-order-bill',
    templateUrl: './order-bill.component.html',
    styleUrls: ['./order-bill.component.scss']
})
export class OrderBillComponent implements OnInit {
    @Input() orderId;
    loading: boolean = true;
    bill: OrderBill;
    @HostBinding('style') style: SafeStyle;
    @Input() showActionButton: boolean = false;
    @Output() OnActionClick: EventEmitter<any> = new EventEmitter();

    constructor(
        private orderService: OrderService,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        this.getOrderBill();
        this.style = this.sanitizer.bypassSecurityTrustStyle('width:100%;');
    }

    getOrderBill() {
        this.orderService.getOrderBill(this.orderId).toPromise().then(res => {
            if (res.code === 200) {
                this.loading = false;
                this.bill = res.order;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    actionClick(type: string) {
        this.OnActionClick.emit(type);
    }
}
