import {MatPaginatorIntl} from "@angular/material";

const matPaginatorIntl = new MatPaginatorIntl();
matPaginatorIntl.firstPageLabel = '';
matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    return (length == 0) ? `${length} record found` : `${length} records found`;
};
matPaginatorIntl.itemsPerPageLabel = '';

export function MAT_PAGINATOR_INTL() {
    return matPaginatorIntl;
}

export const TripTypes = [
    'one_way', 'round_trip'
];
export const VehicleTypes = [
    'sedan', 'suv', 'passenger_van', 'hatchback', 'others'
];
export const RequestStatus = [
    'pending', 'accept', 'reject'
];
export const ApprovalRequestStatus = [
    'pending', 'accepted', 'rejected'
];

export const InspectionScheduleTypes = [
    'once', 'weekly', 'monthly'
];
export const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const FailedItemStatus = [{label: 'Pending', value: 'open'}, {
    label: 'Acknowledged',
    value: 'acknowledged'
}, {label: 'Has Issue', value: 'issue_created'}];
