import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const QuantitySelector = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      cartActions.updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      dispatch(cartActions.removeToCart(item.id));
    } else {
      dispatch(
        cartActions.updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton size="small" onClick={handleDecrease}>
        <RemoveIcon fontSize="small" />
      </IconButton>

      <Typography
        variant="body1"
        sx={{
          mx: 1.5,
          width: 24,
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {item.quantity}
      </Typography>

      <IconButton size="small" onClick={handleIncrease}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
