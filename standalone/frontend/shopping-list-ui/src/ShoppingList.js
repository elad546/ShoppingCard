import React, { useState } from "react";
import "./ShoppingList.css";

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Snacks"];

const demoItems = [
  { name: "Apple", category: "Fruits", image: "https://via.placeholder.com/80" },
  { name: "Banana", category: "Fruits", image: "https://via.placeholder.com/80" },
  { name: "Carrot", category: "Vegetables", image: "https://via.placeholder.com/80" },
  { name: "Milk", category: "Dairy", image: "https://via.placeholder.com/80" },
  { name: "Chips", category: "Snacks", image: "https://via.placeholder.com/80" },
];

const ShoppingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = demoItems.filter((item) =>
    (selectedCategory === "All" || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shopping-list-container">
      {/* Tabs for categories */}
      <div className="tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Shopping Grid */}
      <div className="grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="item-card">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;