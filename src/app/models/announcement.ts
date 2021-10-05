import { Deserializable } from './deserializable';
import '../helpers/extends';

const announcementStatus = {
    Previous: 'Previous',
    Ongoing: 'Ongoing'
};

const announcementTypes = {
    event: 'Event',
    holiday: 'Holiday',
    financial: 'Financial',
    others: 'Others'
};

export { announcementStatus, announcementTypes };

export class Announcement extends Deserializable {
    id: number;
    title: string;
    type: string;
    short_description: string;
    description: string;
    is_published: boolean;
    status: string;
    end_date: Date;
    created_at: Date;

    deserialize(input: any) {
        if(input.end_date) {
            this.end_date = new Date().fromMySqlFormat(input.end_date);
            delete input.end_date;
        }
        if(input.created_at) {
            this.created_at = new Date().fromMySqlFormat(input.created_at);
            delete input.created_at;
        }

        Object.assign(this, input);

        this.status = (this.is_published || 1) && this.end_date && this.end_date.isFuture() ? 'ongoing' : 'previous';
        return this;
    }
}
