/**
 * Purpose of this class is store data later this classes can be replaced with a database
 */
import Badge from "../model/Badge";
import BadgeRule from 'src/model/BadgeRule';

export class DataManager {

    public static instance: DataManager;

    public static getInstance() {
        if (DataManager.instance == null) {
            DataManager.instance = new DataManager();
        }

        return DataManager.instance;
    }

    private badgeIdsByUserIdMap: Map<string, string[]>;
    private attendanceByUserIdMap: Map<string, number>;
    private badgesByIdMap: Map<string, Badge>;
    private rules: BadgeRule[];

    private constructor() {
        this.badgeIdsByUserIdMap = new Map();
        this.attendanceByUserIdMap = new Map();
        this.badgesByIdMap = new Map();
        this.rules = [];
    }

    public addBadgeRule(rule: BadgeRule) {
        this.rules.push(rule);
    }

    public getBadgeRules() : BadgeRule[] {

        console.log(this.rules);

        return this.rules;
    }

    public addAttendance(userId: string): void {
        const currentAttendance: number | undefined = this.attendanceByUserIdMap.get(userId);

        let count : number = currentAttendance || 1;
        this.attendanceByUserIdMap.set(userId, count + 1)
    }

    public getAttendance(userId: string): number {
        const currentAttendance: number | undefined = this.attendanceByUserIdMap.get(userId);
        return currentAttendance || 0;
    }

    public assignBadge(userId: string, badgeId: string): void {
        let assignedBadges = this.badgeIdsByUserIdMap.get(userId);

        if (assignedBadges == null) {
            assignedBadges = [];
        }

        assignedBadges.push(badgeId);

        this.badgeIdsByUserIdMap.set(userId, assignedBadges);
    }

    public addBadge(name: string) {
        const badge = new Badge(this.makeid(5), name);


        this.badgesByIdMap.set(badge.getId(), badge);

        console.log(this.badgesByIdMap);
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

