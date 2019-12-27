/**
 * Purpose of this class is store data later this classes can be replaced with a database
 */
import Badge from "../model/Badge";
import BadgeRule from '../model/BadgeRule';
import { Logger } from '@overnightjs/logger';

export class DataManager {

    private badgeIdsByUserIdMap: Map<string, string[]>;
    private attendanceByUserIdMap: Map<string, number>;
    private badgesByIdMap: Map<string, Badge>;
    private rules: BadgeRule[];

    public static instance: DataManager;

    public static getInstance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
        }

        return DataManager.instance;
    }

    private constructor() {
        this.badgeIdsByUserIdMap = new Map();
        this.attendanceByUserIdMap = new Map();
        this.badgesByIdMap = new Map();
        this.rules = [];
    }

    /**
     * 
     * BADGE RULES APIs
     */
    public addBadgeRule(rule: BadgeRule) {
        this.rules.push(rule);
    }

    public getBadgeRules() : BadgeRule[] {

        console.log(this.rules);

        return this.rules;
    }

    /**
     * 
     * USER ATTENDANCE APIs
     */
    public addAttendance(userId: string): number {
        const currentAttendance: number | undefined = this.attendanceByUserIdMap.get(userId);

        let newAttendance : number = (currentAttendance || 0) + 1;
        this.attendanceByUserIdMap.set(userId, newAttendance);

        return newAttendance;
    }

    public getAttendance(userId: string): number {
        const currentAttendance: number | undefined = this.attendanceByUserIdMap.get(userId);
        return currentAttendance || 0;
    }

    /**
     * 
     * BADGE APIs
     */

    public assignBadge(userId: string, badgeId: string): void {
        let assignedBadgeIds = this.badgeIdsByUserIdMap.get(userId);

        if (assignedBadgeIds == null) {
            assignedBadgeIds = [];
        }

        let isBadgeAlreadyAssigned: boolean = false;
        assignedBadgeIds.forEach((value) => {
            if (value == badgeId) {
                isBadgeAlreadyAssigned = true;
            }
        })

        if (!isBadgeAlreadyAssigned) {
            assignedBadgeIds.push(badgeId);
        } else {
            let badgeName = this.badgesByIdMap.get(badgeId)?.getName();
            Logger.Info("Badge '" +  badgeName + "' is already assigned");
        }

        this.badgeIdsByUserIdMap.set(userId, assignedBadgeIds);
    }

    public addBadge(name: string) {
        const generatedBadgeId = this.makeid(5);
        const badge = new Badge(generatedBadgeId, name);
        this.badgesByIdMap.set(badge.getId(), badge);
        
        Logger.Info("Badge created with name : " + badge);

        return badge;
    }

    public getBadgeById(badgeId: string): Badge | undefined{
        return this.badgesByIdMap.get(badgeId);
    }

    public getBadges() : Badge[] {

        const badges: Badge[] = [];

        let map = this.badgesByIdMap;
        
        console.log(map);

        map.forEach((value: Badge, key: string) => {
            console.log(key, value);
            badges.push(value);
        });


        return badges;

    }

    public getBadgesByUser(userId: string): Badge[] {
        const badgeIds = this.badgeIdsByUserIdMap.get(userId);

        const badges: Badge[] = [];

        if (!!badgeIds) {
            badgeIds.forEach((id) => {
                let badge: Badge | undefined = this.badgesByIdMap.get(id);
                if (!!badge)
                    badges.push(badge);
            });
        }
        

        return badges;
    }


    /**
     * 
     * UTIL APIs
     */
    private makeid(length: number) {
        let result           = "";
        const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

}

