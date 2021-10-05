import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../types/orders";
import {MatTableDataSource} from "@angular/material";
import {OrderService} from "../../../../services/order-service/order.service";
import {ActivatedRoute} from "@angular/router";
import {appConfig} from "../../../../config/app.config";

@Component({
    selector: 'app-order-lists',
    templateUrl: './order-lists.component.html',
    styleUrls: ['./order-lists.component.scss']
})
export class OrderListsComponent implements OnInit {
    filter: string;
    filterItems: { name: string, number: number }[] = [];
    orders: Order[];
    dataSource: MatTableDataSource<any>;
    search: string;
    appConfig = appConfig;
    displayColumns = ['service', 'provider', 'price', 'actions'];

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute
    ) {
        this.route.data.subscribe(res => {
            this.setOrder(res.orders);
            this.setFilters();
        })
    }

    setFilters() {
        const types = {};
        this.orders.forEach(item => {
            if (!types[item.status]) {
                types[item.status] = 1;
            } else {
                types[item.status]++;
            }
        });
        Object.keys(types).forEach(key => {
            this.filterItems.push({name: key, number: types[key]});
        });
    }

    filterBy(name: string) {
        this.filter = name;
        if (name) {
            const orders = this.orders.filter(res => {
                return res.status === name;
            });
            this.dataSource = new MatTableDataSource(orders);
        } else {
            this.dataSource = new MatTableDataSource(this.orders);
        }
    }

    setOrder(order: Order[]) {
        this.orders = order;
        this.dataSource = new MatTableDataSource(this.orders);
    }

    ngOnInit() {
    }

    filterOrders() {
        this.dataSource.filter = this.search;
    }

}
