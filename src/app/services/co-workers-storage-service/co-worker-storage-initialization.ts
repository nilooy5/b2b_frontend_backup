import {SEmergencyInformation} from '../../types/co-workers';

export class CoWorkerStorageInitialization {

    emergencyInformation: SEmergencyInformation;
    coworkerId: number|string;

    constructor() {
        this.init();
    }

    init() {
        const coWorkerFromStorage = sessionStorage.getItem('co-worker') && sessionStorage.getItem('co-worker') !== undefined ?
            JSON.parse(sessionStorage.getItem('co-worker')) : null;

        this.emergencyInformation = coWorkerFromStorage ? coWorkerFromStorage.emergencyInformation : null;
        this.coworkerId = coWorkerFromStorage ? coWorkerFromStorage.coworkerId : null;
    }

    set(item: string, value) {
        this[item] = value;
    }

    getCoWorkerObject(): CoWorkerStorageInitialization {
        return {
            emergencyInformation: this.emergencyInformation,
            coworkerId: this.coworkerId
        } as CoWorkerStorageInitialization;
    }

    get() {
        const coWorkerFromStorage = sessionStorage.getItem('co-worker') && sessionStorage.getItem('co-worker') !== undefined ?
            JSON.parse(sessionStorage.getItem('co-worker')) : null;

        const coWorkerFromClass = this.getCoWorkerObject();

        return coWorkerFromStorage || coWorkerFromClass;
    }

    resetCoWorkerObject() {
        this.init();
    }

    removeAll() {
        this.reset();
    }

    reset() {
        this.emergencyInformation = null;
        this.coworkerId = null;
    }

}
