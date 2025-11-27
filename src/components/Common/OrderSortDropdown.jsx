import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const OrderSortDropdown = ({ onSortChange }) => {
  const [sortValue, setSortValue] = useState("newest");

  const handleChange = (event) => {
    setSortValue(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortValue} label="Sort By" onChange={handleChange}>
        <MenuItem value="newest">Newest order</MenuItem>
        <MenuItem value="oldest">Oldest order</MenuItem>
      </Select>
    </FormControl>
  );
};

export default OrderSortDropdown;
