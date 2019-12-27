
import BadgeRule from "../model/BadgeRule";
import IRuleEvaluator from "./IRuleEvaluator";
import { DataManager } from '../datastore/datamanager';
import AttendanceRuleEvaluator from './AttendanceRuleEvaluator';
import { Logger } from '@overnightjs/logger';

export class RuleEngine {

    private dataManager : DataManager = DataManager.getInstance();

    private static instance: RuleEngine;

    private ruleEvaluatorByNameMap: Map<string, IRuleEvaluator>;


    private constructor() {
        this.ruleEvaluatorByNameMap = new Map();

        this.registerEvaluator("AM", AttendanceRuleEvaluator.getInstance());
    }

    public static getInstance(): RuleEngine {
        if (RuleEngine.instance == null) {
            RuleEngine.instance = new RuleEngine();
        }

        return RuleEngine.instance;
    }

    public getEvaluatorByName(name: string): IRuleEvaluator | undefined{
        return this.ruleEvaluatorByNameMap.get(name) ;
    }

    public registerEvaluator(name: string, evaluator: IRuleEvaluator): void {
        this.ruleEvaluatorByNameMap.set(name, evaluator);
    }

    public process(userId: string) {
        
            
            let rules : BadgeRule[]  = this.dataManager.getBadgeRules();



            rules.forEach(rule => {
                
                Logger.Info("Processing rule : " + rule.ruleType);
                
                let ruleEvaluator: IRuleEvaluator | undefined = this.getEvaluatorByName(rule.source);
                if (ruleEvaluator != undefined)  {
                    ruleEvaluator.evalvate(userId, rule);
                }
            });
    }
}
