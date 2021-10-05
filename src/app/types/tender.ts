export interface TenderList {
    id: number;
    title: string;
    description: string;
    labels: Array<string>;
    last_date_of_submission: {
        date: string;
        icon: string;
    };
    delivery_within: {
        date_range: string;
        icon: string;
    };
    estimated_price: string|number;
    payment: string;
    type: string;
    shared_to: string;
    category: string|number;
    remaining_days: {
        days: string;
        color: string;
        icon: string;
    };
    number_of_applicants_or_applications: string|number;
    created_at: string;
}

export interface TenderListFilterOptions {
    categories: TenderFilterCategory[];
    post_type: TenderFilterPostType[];
    popular_tags: TenderFilterTags[];
}

export interface TenderListPagination {
    current_page: number;
    total_tenders: number;
}

export interface TenderFilterCategory {
    id: number;
    name: string;
}

export interface TenderFilterPostType {
    key: string;
    value: string;
}

export interface TenderFilterTags {
    id: number;
    name: string;
    count: number;
}

export interface TenderFilteredOptions {
    page?: number|string;
    sort?: string;
    category?: Array<number>|string;
    shared_to?: string|Array<string>;
    tag?: string|Array<string>|number;
    min_price?: string|number;
    max_price?: string|number;
    q?: string;
    start_date?: string;
    end_date?: string;
}

export interface TenderDetails {
    id: number;
    title: string;
    colorCode: string;
    created_at: string;
    created_at_time: string;
    description: string;
    estimated_price: number;
}
