export interface ILayoutInfo {
    currentRoute: string;
    headerTitle?: string;
    showHeader: boolean;
    showFooter: boolean;
    footerButtonText?: string;
    showHelpLink?: boolean;
    applyCSSClass?: boolean;
}

export interface ITags {
    id?: number;
    name: string;
}

export interface ValidFormControls {
    name: string;
    isValid: boolean;
}

export interface GeneralInformation {
    sharing_to: {
        key: string;
        value: string;
    }[];
    payment_strategy: string[];
    number_of_participants: {
        key: number;
        value: string;
    }[];
    categories: {
        id: number;
        name: string;
    }[];
}

export interface BasicInformation {
    title: string;
    description: string;
    budget: string;
    tags: Array<string>;
}

export interface AdditionalInformation {
    sharing_to: string;
    delivery_timeline: { start_date: string; end_date: string};
    last_date_of_submission: string;
    number_of_participants: string;
    category: string;
    payment_option: string;
}

export interface Attachment {
    attachments: Array<string>;
}

export interface PriceQuotation {
    item_name: string;
    specification: string;
    quantity: number;
}

export interface Evaluation {
    is_required: string;
    options: Array<string>;
    result: any;
    title: string;
    type: string;
}

export interface RfqValidation {
    hasTitle?: boolean;
    hasDescription?: boolean;
    hasBudget?: boolean;
    hasTags?: boolean;
    hasAttachment?: boolean;
}

export interface RfqVendors {
    id: number;
    name: string;
    logo: string;
    mobile: string;
}

export interface RfqBid {
    id: number;
    status: string;
    bidder_name: string;
    bidder_logo: string;
    bidder_status: string;
    is_favourite: number;
    created_at: string;
    bidder_avg_rating: number;
    item: {
        item_id: number;
        item_type: string;
        fields: {
            field_id: number;
            question: string;
            answer: string;
            input_type: string;
            key: number;
        }[];
        total_price: number;
    }[];
}
