export interface WorkerInfo {
    name: string;
    isOnline: boolean;
    count: number;
    reportedHashrate: number;
    currentEffectiveHashrate: number;
    averageEffectiveHashrate: number;
    validShares: number;
    staleShares: number;
    invalidShares: number;
    lastSeen: number;
}
