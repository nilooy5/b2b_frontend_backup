import { Deserializable } from './deserializable';
import { IDateRange } from "../modules/date-range-picker/date-range";

export class Tender extends Deserializable {
    id: number;
    title: string;
    labels: Array<string>;
    no_of_vendors: number;
    last_date_of_submission: Date;
    delivery_date: IDateRange;
    is_advanced: boolean;
    payment_option: string;
    attachments: Array<string>;
    needs_price_quotation: boolean;
    needs_technical_evaluation: boolean;
    needs_company_evaluation: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
