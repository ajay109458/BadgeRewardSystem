import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { DataManager } from '../datastore/datamanager';
import { RuleEngine } from '../orchestrator/RuleEngine';
 

@Controller('api/attendance')
export class AttendanceController {

    private datastore: DataManager = DataManager.getInstance();
    private ruleEngine: RuleEngine = RuleEngine.getInstance();

    @Get(':userId')
    private getAttendance(req: Request, res: Response) {
        let userId: string = req.params.userId;
        Logger.Info("Fetching attendance for user : " + userId);
        let currentAttendance = this.datastore.getAttendance(userId);

        res.status(200).json({
            userId: userId,
            attendance: currentAttendance
        });
    }

    @Post(':userId')
    private markAttendance(req: Request, res: Response) {

        let userId: string = req.params.userId;

        Logger.Info(userId);
        let newAttendance: number = this.datastore.addAttendance(userId);

        /**
         * Process to check badge assginment
         */
        Logger.Info(AttendanceController.name + " Validating if a badge can be assigned.");
        this.ruleEngine.process(userId);

        return res.status(200).json({
            userId: req.params.userId,
            status: newAttendance
        });
    }

}
