import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import NotificationSnackbar from "../../components/Common/NotificationSnackbar";
import OrderSortDropdown from "../../components/Common/OrderSortDropdown";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalOrders, setOriginalOrders] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      // console.log("data", data);
      setOrders(data);
      setOriginalOrders(data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to load orders",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortType) => {
    let sorted = [...originalOrders];

    if (sortType === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setOrders(sorted);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Recent Orders
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          width: "100%",
        }}
      >
        <Box sx={{ marginLeft: "auto" }}>
          <OrderSortDropdown onSortChange={handleSortChange} />
        </Box>
      </Box>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            height: "80vh",
            alignItems: "center",
          }}
        >
          Loading...
        </Box>
      )}

      <Stack spacing={2}>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
          >
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6">
                  <strong>User</strong>: {order.user}
                </Typography>
                {order.items.map((item, i) => (
                  <Typography key={item.recipeId + i} variant="body2">
                    <strong>Items:</strong> {item.name} x {item.qty} ($
                    {item.price * item.qty})
                  </Typography>
                ))}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Total Amount</strong>: ${order.totalAmount}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Address</strong>: {order.address}
                </Typography>
              </CardContent>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography>{order.status}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default OrderHistory;
