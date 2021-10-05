import {Center} from './general';


export interface Profile {
    address: string;
    created_at: string;
    created_by: string;
    created_by_name: string;
    dob: string;
    email: string;
    email_verified: number;
    fb_id: string;
    gender: string;
    google_id: string;
    id: number;
    mobile: string;
    mobile_verified: number;
    name: string;
    pro_pic: string;
    remember_token: string;
    updated_at: string;
    updated_by: number;
    updated_by_name: string;
}

export interface Company {
    address: string;
    company_type: string;
    employee_size: number;
    geo_informations: Center;
    name: string;
    sub_domain: string;
    tagline: string;
    wallet: number;
}

export interface UserType {
    name: string;
    id: number;
}

export interface WalletDetails {
    id: number;
    number: string;
    balance: number;
    secret: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface Wallet {
    wallet_id: string;
    details: WalletDetails;
}

export interface User {
    id: number;
    name: string;
    email: string;
    date_of_birth: null;
    gender: string;
    mobile: string;
    nid_no: string;
    pro_pic: string;
    profile_id: number;
    token: string;
    member_id: number;
    business_id: number;
    address: number;
    designation: string;
    image: string;
    is_super: any;
    remember_token?: any;
    access?: any;
}

export interface TransactionDetails {
    id: number;
    log: string;
    details: any;
}

export interface ShebaTransaction {
    id: number;
    amount: number;
    details: TransactionDetails;
    log: string;
    user_agent: string;
    ip: string;
    created_at: string;
}

export interface BreakdownQuestion {
    answer: string;
    question: string;
}

export interface PriceBreakdown {
    amount: number;
    cap: number;
    discount: number;
    discounted_price: number;
    id: number;
    is_min_price_applied: number;
    is_percentage: number;
    min_price: number;
    name: string;
    option: any[];
    original_price: number;
    partner_contribution: number;
    quantity: number;
    questions: BreakdownQuestion[];
    sheba_contribution: number;
    unit: string;
    unit_price: number;
}

export interface Partner {
    address: string;
    badge: string;
    breakdown: PriceBreakdown[];
    current_impression: number;
    delivery_charge: number;
    description: string;
    discount: number;
    discounted_price: number;
    has_home_delivery: number;
    has_premise_available: number;
    id: number;
    is_min_price_applied: number;
    logo: string;
    name: string;
    ongoing_jobs: number;
    original_price: number;
    rating: number;
    sub_domain: string;
    subscription_type: string;
    total_completed_orders: number;
    total_compliments: number;
    total_experts: number;
    total_five_star_ratings: number;
    total_jobs: number;
    total_jobs_of_category: number;
    total_ratings: number;
    total_working_days: number;
}

export interface CompanyUpdateData {
    company?: Company;
}

export interface IDepartment {
    id: number;
    name: string;
    type?: string;
    created_at?: string;
}

export interface IEmployee {
    id?: number;
    business_member_id?: number;
    profile?: {
        id: number;
        name: string;
        pro_pic: string;
        mobile: string;
        email: string;
    };
    status?: string;
    department_id: number;
    department: string;
    designation: string;
    dob?: string;
    mobile: string;
    email: string;
    name: string;
    pro_pic: string;
    status_bg_color?: string;
}
