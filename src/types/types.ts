export interface Item {
    id: number;
    name: string;
    cost: number;
    description: string;
    stats: ItemStat;
}

export interface ItemStat {
    [key: string]: number;
}
