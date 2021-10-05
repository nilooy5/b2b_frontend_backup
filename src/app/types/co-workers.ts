export interface Banks {
    key: string;
    value: string;
}

// Following Interfaces are for Co-Worker Details From Api

export interface BasicInfo {
    id: number;
    status: string;
    profile: {
        id: number;
        name: string;
        profile_picture: string;
        profile_picture_name: string;
        email: string;
    };
    department_id: number;
    department: string;
    designation: string;
    manager_detail: {
        id: number;
        business_member: number;
        name: string;
    };
    basic_info_completion: number;
}

export interface OfficialInfo {
    join_date: string;
    grade: string;
    employee_type: string;
    previous_institution: string;
    official_info_completion: number;
}

export interface PersonalInfo {
    mobile: string;
    date_of_birth: string;
    address: string;
    nationality: string;
    nid_no: string;
    nid_image_front: string;
    nid_image_front_name: string;
    nid_image_back: string;
    nid_image_back_name: string;
    personal_info_completion: number;
}

export interface FinancialInfo {
    tin_no: string;
    tin_certificate: string;
    tin_certificate_name: string;
    bank_name: string;
    account_no: string;
    financial_info_completion: number;
}

export interface EmergencyInfo {
    emergency_contract_person_name: string;
    emergency_contract_person_number: string;
    emergency_contract_person_relationship: string;
    emergency_info_completion: number;
}

export interface CoWorkerDetails {
    basic_info: BasicInfo;
    EmergencyInfo: OfficialInfo;
    personal_info: PersonalInfo;
    financial_info: FinancialInfo;
    emergency_info: EmergencyInfo;
}



// Following interface are for Session Storage in Co-Worker Add
export interface SEmergencyInformation {
    name: string;
    mobile: string;
    relationship: string;
}
