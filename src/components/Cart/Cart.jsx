import {
  Box,
  Button,
  Drawer,
  Typography,
  IconButton,
  Divider,
  CardMedia,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import QuantitySelector from "../Common/QuantitySelector";

const Cart = ({ open, onClose }) => {
  const cart = useSelector((state) => state.cart);

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: 300, sm: 400 },
          px: 2,
          py: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        role="presentation"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
          {cart.items.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
              Your cart is empty.
            </Typography>
          ) : (
            cart.items.map((item) => (
              <Box key={item.id} sx={{ mb: 3, mr: 2 }}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item xs={6}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{ height: 80, width: 100, borderRadius: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2">
                      ${item.price} x {item.quantity}
                    </Typography>
                    <QuantitySelector item={item} />
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={cart.items.length === 0}
          >
            Purchase
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
