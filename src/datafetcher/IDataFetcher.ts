interface IDataFetcher {
    getActualValue(userId: string): number;
    getProperties(): String[];
}

export default IDataFetcher;
