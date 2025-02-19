import React, { useState, useEffect } from "react";
import { fetchItems } from "./api";
import "./ShoppingList.css";

const stores = ["fresh_market", "osher_ad", "shufersal"];
const categories = ["all", "fruits", "vegetables", "dairy", "meat", "fish", "bread", "canned_food", "snacks", "drinks", "cleaning"];
const PAGE_SIZE = 12;

const ShoppingList = () => {
    const [selectedStore, setSelectedStore] = useState(stores[0]);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
        const loadItems = async () => {
          const data = await fetchItems(selectedStore, page, PAGE_SIZE, searchQuery, selectedCategory);
          const filteredData = searchQuery
              ? data.sort((a, b) => b.is_used - a.is_used)
              : data.filter(item => item.is_used);
          setItems(filteredData);
        };
        loadItems();
    }, [selectedStore, page, searchQuery, selectedCategory]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

  //   const filteredItems = () => {
  //     let filtered = items.filter(item => item.category === selectedCategory);
  //     if (searchQuery.trim() === "") {
  //         return filtered.filter(item => item.is_used);
  //     } else {
  //         return filtered.sort((a, b) => (b.is_used ? 1 : 0) - (a.is_used ? 1 : 0));
  //     }
  // };

    return (
        <div className="shopping-list" align="center">
            <h2>Shopping List</h2>
            <div className="store_tabs">
                {stores.map(store => (
                    <button key={store} className={selectedStore === store ? "active" : ""} onClick={() => { setSelectedStore(store); setPage(1); }}>
                        {store.replace("_", " ").toUpperCase()}
                    </button>
                ))}
            </div>

            <input class="input"
                type="text"
                placeholder="חיפוש"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />

            <div className="category-tabs">
                {categories.map(category => (
                    <button key={category} className={selectedCategory === category ? "active" : ""} onClick={() => setSelectedCategory(category)}>
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="item-grid">
                {items.map(item => (
                    <div key={item.barcode} className={`item-card ${item.is_used ? "used" : ""}`}>
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                        {item.is_used && <span className="used-tag">נוסף בעבר</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingList;