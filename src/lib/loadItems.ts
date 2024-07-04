// import itemsRawData from 'src/data/items_data.json';
import itemsRawData from 'src/data/item_info/14.13.1.json';
import { Item } from 'src/types/types';

const loadItems = (): Item[] => {
    if (itemsRawData == null) {
        return [];
    }

    const targetData = itemsRawData;
    const items: Item[] = [];

    for (const id in targetData) {
        const itemData = (targetData as { [key: string]: any })[id];

        if (excludeItems(itemData)) {
            continue;
        }

        const item: Item = {
            id: Number(id),
            name: itemData.name ?? "",
            cost: itemData.gold?.total ?? 0,
            description: itemData.description ?? "",
            stats: itemData.stats ?? {}
        };
        items.push(item);
    }

    return items;
}

// 表示しないアイテムを選別する
const excludeItems = (itemData: { gold?: { purchasable: boolean }, maps?: { [key: string]: any } }): boolean => {
    if (itemData.gold == null || itemData.maps == null) {
        return true;
    }
    return !itemData.gold.purchasable || !itemData.maps["11"];
}

export default loadItems;