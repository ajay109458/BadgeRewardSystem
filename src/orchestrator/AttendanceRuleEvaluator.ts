import IDataFetcher from "../datafetcher/IDataFetcher";
import BadgeRule from "../model/BadgeRule";
import IRuleEvaluator from "./IRuleEvaluator";

class AttendanceRuleEvaluator implements IRuleEvaluator {

    private ruleDataFetcherByNameMap: Map<String, IDataFetcher>;
    private expressionResolver: ExpressionResolver;

    constructor() {
        this.ruleDataFetcherByNameMap = new Map();
        this.expressionResolver = new ExpressionResolver();
    }

    public getRuleDataFetcher(name: String): IDataFetcher | undefined {
        return this.ruleDataFetcherByNameMap.get(name);
    }

    public registerRuleDataFetcher(name: String, dataFetcher: IDataFetcher) {
        this.ruleDataFetcherByNameMap.set(name, dataFetcher);
    }

    public evalvate(userId: string, rule: BadgeRule) {

        const dataFetcher: IDataFetcher | undefined = this.getRuleDataFetcher(rule.ruleType);

        if (!!dataFetcher) {
            const actualValue: number = dataFetcher.getActualValue(userId);

            const expectedValue: number = ExpressionResolver.getExpectedValue(rule.targetValue);
            const isExpressionTrue: boolean = this.expressionResolver.isConditionAssertToTrue(actualValue, expectedValue, rule.operator);

            if (isExpressionTrue) {
                // assign rule.badge to userId
            }
        }
        

    }
}

export default AttendanceRuleEvaluator;
