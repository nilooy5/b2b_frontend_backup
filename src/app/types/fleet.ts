import {User} from "./users";

export class Vehicle {
    assigned_to: string;
    current_driver: string;
    id: number;
    model_year: string;
    status: string;
    vehicle_model: string;
    vehicle_type: string;
    image: string;
    name: string;
    type: string;
    vehicle_image: string;
}

export interface Member {
    id: string;
    name: string;
    image: string;
    designation: string;
    picture: string;
}

export interface FleetDriver {
    id: number;
    name: string;
    image: string;
    mobile: string;
}

export interface TripRequest {
    id: number;
    details: string
    dropoff_address: string;
    end_date: string;
    member: Member;
    pickup_address: string;
    reason: string;
    start_date: string;
    trip_type: string;
    vehicle_type: string;
    no_of_seats: string;
    driver: FleetDriver;
    vehicle: Vehicle;
    status: string;
    comments: Comment[];
    trip_request_approvers?: any;
    can_approve?: any;
}

export interface Comment {
    comment: string;
    created_at: string;
    user: User
}

export interface Trip {
    id: number;
    vehicle: Vehicle;
    member: Member;
    driver: FleetDriver;
    start_date: string;
    end_date: string;
}

export interface TripsDetails {
    id: number;
    name: string;
    image: string;
    type: string;
    status: string;
    trips: Trip[];
    department: string;
}

export interface FleetInspection {
    id: number;
    schedule_date: string;
    type: string;
    failed_items: number;
    inspection_form: string;
    inspection_items: InspectionFormItem[]
    inspector: string;
    inspector_pic: string;
    long_description: string;
    short_description: string;
    status: string;
    submitted_date: string;
    title: string;
    vehicle: Vehicle;
    created_at: string;
    next_start_date: string;
}

export interface InspectionFormItem {
    id: number;
    title: string;
    short_description?: string;
    long_description?: string;
    is_required?: boolean;
    instruction?: string;
    type: 'text' | 'radio' | 'number'
    created_at?: string;
}

export interface InspectionForm {
    id: number;
    title: string;
    short_description?: string;
    items: InspectionFormItem[];
    inspections: FleetInspection[];
    created_at: string;
}

export interface FleetInspectionFailedItem {
    acknowledgment_note: string
    comment: string;
    date: string;
    id: number;
    input_type: string;
    issue_id: string;
    inspection_form_short_description: string;
    inspection_form_title: string;
    inspection_id: number;
    inspection_status: string;
    inspector: string;
    long_description: string;
    result: string;
    schedule: string;
    short_description: string;
    status: string;
    time: string;
    title: string;
    variables: { is_required: number },
    vehicle: Vehicle;
}
