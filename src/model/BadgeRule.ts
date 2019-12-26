class BadgeRule {

    public source: string;
    public ruleType: string;
    public operator: string;
    public targetValue: string;
    public badgeId: string;

    constructor(source: string, ruleType: string, operator: string, targetValue: string, badgeId: string) {
        this.source = source;
        this.ruleType = ruleType;
        this.operator = operator;
        this.targetValue = targetValue;
        this.badgeId = badgeId;
    }
}

export default BadgeRule;
