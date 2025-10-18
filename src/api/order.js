const DB_URL = "https://restaurent-app-e9615-default-rtdb.firebaseio.com/";

// Place order
export const placeOrder = async (orderData) => {
  const response = await fetch(`${DB_URL}/order.json`, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

// Fetch order list
export const getOrders = async () => {
  const response = await fetch(`${DB_URL}/order.json`);
  const data = await response.json();
  return Object.entries(data || {}).map(([id, value]) => ({
    id,
    ...value,
  }));
};
