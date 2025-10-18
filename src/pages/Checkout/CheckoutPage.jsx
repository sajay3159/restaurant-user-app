import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { placeOrder } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartItems = cart.map((item) => ({
    recipeId: item.id,
    name: item.name,
    price: item.price,
    qty: item.quantity,
  }));

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleOrder = async () => {
    if (!name || !email || !address) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const orderData = {
      user: email,
      address: `${name}, ${address}`,
      items: cartItems,
      totalAmount: totalAmount,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    try {
      await placeOrder(orderData);
      setOrderSuccess(true);
      dispatch(cartActions.clearCart());
      setName("");
      setEmail("");
      setAddress("");

      setTimeout(() => {
        navigate("/home", { state: { fromCheckout: true } });
      }, 2000);
    } catch (error) {
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <TextField
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            required
          />
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <List>
            {cartItems.map((item) => (
              <ListItem key={item.recipeId}>
                <ListItemText
                  primary={`${item.name} x${item.qty}`}
                  secondary={`$${item.price} each — $${item.price * item.qty}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" align="right">
            Total: ${totalAmount.toFixed(2)}
          </Typography>

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrder}
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
            {orderSuccess && (
              <Typography mt={2} color="success.main">
                ✅ Order placed successfully! Redirecting...
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutPage;
