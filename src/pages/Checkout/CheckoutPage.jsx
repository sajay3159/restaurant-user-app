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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { placeOrder } from "../../api/order";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
});

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cart = useSelector((state) => state.cart.items || []);
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const orderData = {
      name: data.name,
      user: data.email,
      address: data.address,
      items: cartItems,
      totalAmount: totalAmount,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    try {
      await placeOrder(orderData);
      setOrderSuccess(true);
      setTimeout(() => {
        dispatch(cartActions.clearCart());
        reset();
        navigate("/orderHistory");
      }, 2000);
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Shipping Address"
              multiline
              rows={3}
              margin="normal"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            {cartItems.length === 0 ? (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                Your cart is empty.
              </Typography>
            ) : (
              <>
                <List>
                  {cartItems.map((item) => (
                    <ListItem key={item.recipeId}>
                      <ListItemText
                        primary={`${item.name} x${item.qty}`}
                        secondary={`$${item.price} each — $${
                          item.price * item.qty
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" align="right">
                  Total: ${totalAmount.toFixed(2)}
                </Typography>
              </>
            )}

            <Box mt={3} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isSubmitting || cartItems.length === 0}
              >
                {isSubmitting ? (
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
                  Order placed successfully
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default CheckoutPage;
