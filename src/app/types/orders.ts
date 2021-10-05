import {Service} from "./services";

export interface Order {
    id: number;
    job_id: number;
    subscription_order_id: number;
    category_name: string;
    category_thumb: string;
    schedule_date: string;
    served_date: string;
    process_date: string;
    cancelled_date: string;
    schedule_date_readable: string;
    preferred_time: string;
    readable_status: string;
    status: string;
    is_on_premise: number;
    customer_favorite: string;
    isRentCar: number;
    status_color: string;
    delivery_address: string;
    delivery_name: string;
    delivery_mobile: string;
    partner_name: string;
    partner_logo: string;
    resource_name: string;
    resource_pic: string;
    contact_number: string;
    contact_person: string;
    rating: number;
    price: number;
    order_code: string;
    created_at: string;
    created_at_timestamp: number;
    version: string;
    original_price: number;
    discount: number;
    discounted_price: number;
    complain_count: number;
    can_pay: boolean;
    can_take_review: boolean;
    jobs: Order[];
}

export class OrderServiceConfig {
    mainConfig: string;
}

export class TenderServiceConfig {
    mainConfig: string;
}

export interface OrderPlaceObject {
    services: Service[];
    partner: number;
    time: string;
    category: number;
    date: string;
    mobile: string;
}

export interface OrderedService {
    name: string;
    quantity: number;
    price: number;
    min_price: number;
    is_min_price_applied: number;
}

export interface OrderBill {
    closed_and_paid_at: string
    closed_and_paid_at_timestamp: number;
    delivered_date: string
    delivered_date_timestamp: number;
    delivery_charge: number;
    discount: number;
    due: number;
    invoice: string;
    is_on_premise: number;
    material_price: number;
    original_price: number;
    paid: number;
    payment_method: string;
    services: OrderedService[];
    status: string;
    total: string;
}
