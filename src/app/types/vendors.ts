export interface Vendor {
    id: number;
    name: string;
    address?: string;
    mobile: string;
    logo: string;
    type: string[];
    company_type: string[],
    service_type: string[],
    no_of_resource: number;
    trade_licence: string;
}
