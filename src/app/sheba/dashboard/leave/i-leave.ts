import { IBadge } from '../../../modules/badge/i-badge';

export interface ILeaveRequest {
    leaveRequestId: string;
    employeeName: string;
    leaveType: string;
    leaveDays: string;
    leaveStatus: IBadge;
}
