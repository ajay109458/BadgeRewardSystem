import IDataFetcher from "./IDataFetcher";
import { DataManager } from '../datastore/datamanager';

class LastXContiniousDayAttendance implements IDataFetcher {

    private dataManager: DataManager = DataManager.getInstance();

    constructor() {

    }

    public getName() {
        return "lastXdays";
    }

    public getProperties(): string[] {
        return ["days"];
    }

    public getActualValue(userId: string): number {

        const currentAttendance = this.dataManager.getAttendance(userId);

        return currentAttendance;
    }

}

export default LastXContiniousDayAttendance;
