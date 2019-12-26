import IDataFetcher from "./IDataFetcher";

class LastXContiniousDayAttendance implements IDataFetcher {

    constructor() {

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

export default LastXContiniousDayAttendance;
