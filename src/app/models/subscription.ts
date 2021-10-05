import { Service } from './service';
import { Deserializable } from './deserializable';

export class Subscription extends Deserializable {
    id: number;
    name: string;
    thumb: string;
    service: Service;

    deserialize(input: any) {
        const service = input.service;
        Object.assign(this, input);
        this.service = new Service({
            id: 84,
            category: {
                id: 14,
                name: 'AC Service & Repair',
                parent: {
                    id: 1,
                    name: 'Appliances Repair',
                }
            },
            name: 'AC Water Drop Solution',
            thumb: 'https://s3.ap-south-1.amazonaws.com/cdn-shebaxyz/images/bulk/jpg/Services/84/600.jpg',
            variable_type: 'Options',
            min_quantity: 1,
            questions: [
                {
                    question: 'Select Ton',
                    answers: [ '1', '1.5', '2', '2.5', '3', '4', '4.5', '5' ],
                    input_type: 'selectbox',
                    screen: 'normal'
                }, {
                    question: 'Select Ton',
                    answers: [ '1', '1.5', '2', '2.5', '3', '4', '4.5', '5' ],
                    input_type: 'radiobox',
                    screen: 'normal'
                }, {
                    question: 'Select Ton',
                    answers: [ '1', '1.5', '2', '2.5', '3', '4', '4.5', '5' ],
                    input_type: 'dropdown',
                    screen: 'normal'
                }
            ]
        });
        return this;
    }
}
