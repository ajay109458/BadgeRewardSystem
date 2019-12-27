import IDataFetcher from "./IDataFetcher";

class LastContinousWeekendAttendanceCount implements IDataFetcher {

    constructor() {

    }

    public getName() {
        return "lastContinousWeekend";
    }

    public getProperties(): string[] {
        return ["days"];
    }

    public getActualValue(userId: string): number {

        // Get last X constinious days attendance for userId
        const attendance = 10;

        return attendance;
    }

}

export default LastContinousWeekendAttendanceCount;
