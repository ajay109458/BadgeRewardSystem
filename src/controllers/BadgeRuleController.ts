import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { DataManager }  from '../datastore/datamanager';

import BadgeRule from '../model/BadgeRule';


@Controller('api/badgerule')
export class BadgeRuleController {

    private datastore = DataManager.getInstance();

    @Get()
    private getRules(req: Request, res: Response) {


        let rules: BadgeRule[] = this.datastore.getBadgeRules();

        res.status(200).json({
            rules: rules
        });
    }

    @Post()
    private addRule(req: Request, res: Response) {

        let source: string = req.body.source;
        let ruleType: string =  req.body.ruleType;
        let operator: string = req.body.operator;
        let targetValue: string = req.body.targetValue;
        let badgeId: string = req.body.badgeId;

        let rule = new BadgeRule(source, ruleType, operator, targetValue, badgeId);

        this.datastore.addBadgeRule(rule);

        return res.status(200).json({
            rule: rule,
        });
    }
}
