import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { DataManager }  from '../datastore/datamanager';
import Badge from '../model/Badge';



@Controller('api/badge')
export class BadgeController {

    private datastore = DataManager.getInstance();

    @Get(':userId')
    private getBadgesForUser(req: Request, res: Response) {
        let userId: string = req.params.userId; 
        Logger.Info(userId);

        let badges: Badge[] = this.datastore.getBadgesByUser(userId);

        res.status(200).json({
            userId: userId,
            badges: badges
        });
    }

    @Get()
    private getBadges(req: Request, res: Response) {

        let badges: Badge[] = this.datastore.getBadges();

        res.status(200).json({
            badges: badges
        });
    }

    @Post(':badgeName')
    private postMessage(req: Request, res: Response) {
        
        Logger.Info(req.params.badgeName);

        this.datastore.addBadge(
            req.params.badgeName
        );

        return res.status(400).json({
            error: req.params.msg,
        });
    }
}
