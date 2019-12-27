interface IDataFetcher {
    getActualValue(userId: string): number;
    getProperties(): string[];
    getName(): string;
}

export default IDataFetcher;
