import {MatTableDataSource} from '@angular/material';
import {InjectionToken} from '@angular/core';

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

export interface MenuItem {
    label: string;
    url: string;
    icon: string;
    children?: MenuItem[];
    text?: string;
    activeClass?: string;
}

export interface Pagination {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: 1;
}

export interface TablePage {
    pagination: Pagination;
    displayColumns: string[];
    dataSource: MatTableDataSource<any>;
    page: number;
    limit: number;
    filter: any;
    loadingData: boolean;

    setData(data: any);

    doSort();

    loadData();

    delete(item: any);

    filterData(data: any);

    search(query: string);
}

export interface KeyValues {
    key: string;
    value: any;
}

export interface NavLink {
    label: string;
    path: string;
    icon?: string;
    badge?: string;
    isButton?: boolean;
    isActive?: boolean;
    children?: NavLink[];
    data?: any;
    userAccess?: any;
    comingSoon?: any;
    externalLink?: any;
    queryParams?: any;
}

export interface HomeShowcase {
    title: string;
    data: Array<any>;

}

export interface HomeFeatureSection {
    title: string;
    text: string;
    img: string;
    textAlignment: string;
    backgroundColor: string;
}

export interface Center {
    lat: number;
    lng: number;
}

export interface ShebaLocation {
    id: number;
    name: string;
    center: Center;
    city_name: string;
    city_id: number;
}

export interface City {
    id: number;
    name: string;
    locations?: ShebaLocation[];
}

export class ETable {
    label: string;
    value: string;
    type: string;
    increment?: string;
}

export interface Breadcrumb {
    title: string;
    path?: string;
    isActive?: boolean;
    queryParams?: any;
}

export interface SettingsItem {
    title: string;
    iconName: string;
    path: string;
}



