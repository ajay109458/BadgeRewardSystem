import IDataFetcher from "../datafetcher/IDataFetcher";
import BadgeRule from "../model/BadgeRule";
import IRuleEvaluator from "./IRuleEvaluator";
import LastXContiniousDayAttendance from '../datafetcher/LastXContiniousDayAttendance';
import { DataManager } from '../datastore/datamanager';
import ExpressionResolver from './ExpressionResolver'
import { Logger } from '@overnightjs/logger';

class AttendanceRuleEvaluator implements IRuleEvaluator {

    private ruleDataFetcherByNameMap: Map<String, IDataFetcher>;
    private expressionResolver: ExpressionResolver;
    private dataManager: DataManager;

    public static instance: AttendanceRuleEvaluator;

    public static getInstance() {
        if (AttendanceRuleEvaluator.instance == null) {
            AttendanceRuleEvaluator.instance = new AttendanceRuleEvaluator();
        }

        return AttendanceRuleEvaluator.instance;
    }


    constructor() {
        this.ruleDataFetcherByNameMap = new Map();
        this.expressionResolver = new ExpressionResolver();
        this.dataManager = DataManager.getInstance();

        this.registerRuleDataFetcher("lastXdays", new LastXContiniousDayAttendance());
    }

    public getRuleDataFetcher(name: String): IDataFetcher | undefined {
        return this.ruleDataFetcherByNameMap.get(name);
    }

    public registerRuleDataFetcher(name: String, dataFetcher: IDataFetcher) {
        this.ruleDataFetcherByNameMap.set(name, dataFetcher);
    }

    public evalvate(userId: string, rule: BadgeRule) {

        
        const dataFetcher: IDataFetcher | undefined = this.getRuleDataFetcher(rule.ruleType);
        Logger.Info("Fetched dataFetcher for the rule Type : "  + rule.ruleType);

        if (!!dataFetcher) {
            const actualValue: number = dataFetcher.getActualValue(userId);
            Logger.Info("Actual value for the rule : " + actualValue);

            const expectedValue: number = ExpressionResolver.getExpectedValue(rule.targetValue);
            Logger.Info("Expected value for the rule : " + expectedValue);

            const isExpressionTrue: boolean = this.expressionResolver.isConditionAssertToTrue(actualValue, expectedValue, rule.operator);

            if (isExpressionTrue) {
                this.dataManager.assignBadge(userId, rule.badgeId);
                Logger.Info("Badge assigned successfully : " + rule.badgeId + " to user : " + userId);
            } else {
                Logger.Info("Rule doesn't meet the criteria to assign badge : "  + rule.ruleType);
            }
        }
        

    }
}

export default AttendanceRuleEvaluator;
