import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { SEmergencyInformation } from '../../types/co-workers';

@Injectable({
  providedIn: 'root'
})

export class CoWorkerStorageService {

    emergencyInformation: SEmergencyInformation;
    coworkerId: number|string;

    constructor(private storage: StorageService) { }

    init() {
        this.emergencyInformation = null;
        this.coworkerId = null;
    }

    set EmergencyInformation(emergencyInformation: SEmergencyInformation) {
        this.emergencyInformation = emergencyInformation;
        this.updateCoWorkersStorage('emergencyInformation', this.emergencyInformation);
    }

    get EmergencyInformation() {
        const emergencyInformation = this.storage.CoWorker.emergencyInformation;
        return emergencyInformation || this.emergencyInformation;
    }

    set CoworkerId(coworkerId: number|string) {
        this.coworkerId = coworkerId;
        this.updateCoWorkersStorage('coworkerId', this.coworkerId);
    }

    get CoworkerId() {
        const coworkerId = this.storage.CoWorker.coworkerId;
        return coworkerId || this.coworkerId;
    }

    resetCoWorkersStorage() {
        this.init();
        this.storage.resetCoWorkerObject();
    }

    updateCoWorkersStorage(key, value) {
        this.storage.updateCoWorkerObject(key, value);
    }

    removeCoWorkersFromStorage() {
        this.init();
        this.storage.removeCoWorkerObject();
    }

}
