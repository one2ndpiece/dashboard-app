import { Item } from "src/types/types";
import ItemCard from "../ItemCard/ItemCard";

const ItemList: React.FC<{ items: Item[] }> = ({ items }) => (
    <div className="flex flex-wrap justify-center">
        {items.map(item => (
            <ItemCard key={item.id} item={item} />
        ))}
    </div>
);

export default ItemList;