export declare function findList(text: string, { item }?: {
    item?: RegExp | undefined;
}): {
    index: number;
    items: {
        index: number;
        item: string;
    }[];
    match: string;
    label: string;
    list: number[];
}[];
