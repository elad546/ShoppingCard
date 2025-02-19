import React, { useState, useEffect } from "react";
import { fetchItems } from "./api";
import "./ShoppingList.css";

const stores = ["fresh_market", "osher_ad", "shufersal"];
const PAGE_SIZE = 50;

const ShoppingList = () => {
    const [selectedStore, setSelectedStore] = useState(stores[0]);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems(selectedStore, page, PAGE_SIZE, searchQuery);
            setItems(data);
        };
        loadItems();
    }, [selectedStore, page, searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    return (
        <div className="shopping-list">
            <h2>Shopping List</h2>
            <div className="tabs">
                {stores.map(store => (
                    <button key={store} className={selectedStore === store ? "active" : ""} onClick={() => { setSelectedStore(store); setPage(1); }}>
                        {store.replace("_", " ").toUpperCase()}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search by barcode or name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />

            <ul>
                {items.map(item => (
                    <li key={item.barcode}>
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                        {item.is_used ? <span className="used-tag">Used</span> : null}
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page}</span>
                <button disabled={items.length < PAGE_SIZE} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default ShoppingList;