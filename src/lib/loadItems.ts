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

        if (!itemData.gold?.purchasable) {
            continue;
        }
        if (!itemData.maps["11"]) {
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

export default loadItems;