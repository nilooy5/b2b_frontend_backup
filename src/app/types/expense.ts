export interface IExpense {
    id: number;
    member_id: number;
    amount: string;
    status: string;
    remarks: string;
    type: string;
    created_at: string;
    employee_name: string;
    employee_department: string;
    attachment: any;
}
