const API_BASE_URL = "http://localhost:8005/api/shopping_list";

export async function fetchItems(store, page = 1, pageSize = 50, search = "") {
    try {
        const skip = (page - 1) * pageSize;
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
        const response = await fetch(`${API_BASE_URL}/filtered/${store}?skip=${skip}&limit=${pageSize}${searchParam}`);
        if (!response.ok) throw new Error("Failed to fetch items");
        return await response.json();
    } catch (error) {
        console.error("Error fetching shopping list:", error);
        return [];
    }
}