const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Get Categories
export const getCategories = async () => {
  const response = await fetch(`${DB_URL}/categories.json`);
  const data = await response.json();
  const transformData = Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
  return transformData;
};
