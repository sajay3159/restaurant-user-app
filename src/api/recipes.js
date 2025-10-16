const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Fetch all recipes
export const getRecipes = async () => {
  const response = await fetch(`${DB_URL}/recipe.json`);
  const data = await response.json();
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
};
