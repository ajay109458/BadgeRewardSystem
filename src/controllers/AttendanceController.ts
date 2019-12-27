import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { DataManager } from '../datastore/datamanager';
import { RuleEngine } from '../orchestrator/RuleEngine';
 

@Controller('api/attendance')
export class AttendanceController {

    private datastore = DataManager.getInstance();
    private ruleEngine = RuleEngine.getInstance();

    @Get(':userId')
    private getAttendance(req: Request, res: Response) {
        Logger.Info(req.params.userId);
        res.status(200).json({
            userId: req.params.userId,
            attendance: this.datastore.getAttendance(req.params.userId)
        });
    }

    @Post(':userId')
    private markAttendance(req: Request, res: Response) {

        let userId: string = req.params.userId;

        Logger.Info(userId);
        this.datastore.addAttendance(userId);

        /**
         * Badge Assignment
         */
        this.ruleEngine.process(userId);

        return res.status(200).json({
            userId: req.params.userId,
            status: 'attendance updated'
        });
    }

}
