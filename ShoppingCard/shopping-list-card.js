class ShoppingListCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    set hass(hass) {
      if (!this.content) {
        this.render(hass);
      }
    }
  
    async render(hass) {
      this.content = document.createElement("div");
      this.content.style.display = "grid";
      this.content.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";
      this.content.style.gap = "10px";
      
      // Fetch shopping items from API
      const response = await fetch("/api/shopping_list");
      const data = await response.json();
      const items = data.items;
  
      // Create item cards
      items.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.style.border = "1px solid #ccc";
        itemCard.style.padding = "10px";
        itemCard.style.textAlign = "center";
        itemCard.style.cursor = "pointer";
        itemCard.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="80">
          <p>${item.name}</p>
        `;
        itemCard.onclick = () => this.addToShoppingList(item.name);
  
        this.content.appendChild(itemCard);
      });
  
      this.shadowRoot.appendChild(this.content);
    }
  
    async addToShoppingList(itemName) {
      await fetch("/api/shopping_list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: itemName }),
      });
      alert(`Added ${itemName} to shopping list!`);
    }
  
    setConfig(config) {}
  
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define("shopping-list-card", ShoppingListCard);