class Badge {

    private id: string;
    private name: string;

    constructor(id: string, name: string) {
        this.name = name;
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

}

export default Badge;
