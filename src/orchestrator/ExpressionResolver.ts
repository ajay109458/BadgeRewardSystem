class ExpressionResolver {

    public static getExpectedValue(value: string): number {

        // validate arguments

        // TODO: Check percentage based values
        if (value.trim().endsWith("%")) {
            value = value.replace("%", "").trim();

            // compute based on the total value
        }

        return Number(value);
    }

    public isConditionAssertToTrue(actualValue: number, expectedValue: number, operator: string): boolean {

        switch (operator) {
            case ">=" :
                return actualValue >= expectedValue;
            case "<" :
                return actualValue < expectedValue;
            default:
                return false;
        }

        return false;
    }

    public isNumber(value: string | number): boolean {
        return ((value != null) &&
                (value !== "") &&
                !isNaN(Number(value.toString())));
    }
}
