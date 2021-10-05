import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {OrderService} from '../../../../../services/order-service/order.service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-service-list-item',
    templateUrl: './service-list-item.component.html',
    styleUrls: ['./service-list-item.component.scss']
})
export class ServiceListItemComponent implements OnInit, DoCheck {

    @Input() data: any;
    @Output() selectServiceEmitter = new EventEmitter<string>();
    @Output() removeServiceEmitter = new EventEmitter<string>();
    @Output() updateQuantity = new EventEmitter<string>();
    @Output() viewDetails = new EventEmitter<string>();

    isSelected: boolean = false;
    private quantity: any;

    constructor(
        public orderService: OrderService,
        private http: ShebaHttpService,
        private storage: StorageService,
    ) {
    }

    ngOnInit() {
    }

    selectService() {
        this.selectServiceEmitter.emit(this.data);
        this.checkIfSelected();
    }

    removeService(service) {
        this.removeServiceEmitter.emit(service);
        this.checkIfSelected();
    }

    checkIfSelected() {
        const service_id = this.data.id;
        return this.orderService.Services ? this.orderService.Services.findIndex(service => service.id == service_id) !== -1 : false;
    }

    getOptions() {
        this.http.get('sheba?query=query+fetchServiceDetails($id:+Int)+%7B+service(id:$id)+%7B+type,faqs,+banner,+description+%7D+%7D&variables=%7B%22id%22:1563%7D');
    }

    increaseServiceQuantity() {
        this.updateQuantity.emit('increase');
    }

    decreaseServiceQuantity() {
        this.updateQuantity.emit('decrease');
    }

    viewDetailsEvent() {
        this.viewDetails.emit(this.data);
    }

    ngDoCheck(): void {
    }

    numberOfAddedInCart() {
        return this.storage.order.services.filter(s => s.id === this.data.id).length;
    }
}
