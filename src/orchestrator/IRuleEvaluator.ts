import BadgeRule from "../model/BadgeRule";

interface IRuleEvaluator {
    evalvate(userId: string, rule: BadgeRule): void;
}

export default IRuleEvaluator;
