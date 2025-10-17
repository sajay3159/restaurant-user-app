import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { AppBar, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const totalCartItems = useSelector((state) => state.cart.items.length);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const settings = isLoggedIn && [
    { label: "Profile", path: "/profile" },
    { label: "Logout", path: "/logout" },
  ];

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Restaurant
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="cart"
              onClick={() => setCartOpen(true)}
            >
              <Badge badgeContent={totalCartItems} color="error">
                <ShoppingCartIcon />
              </Badge>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Cart
              </Typography>
            </IconButton>
            <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {isLoggedIn && (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting.label === "Logout") {
                        handleLogout();
                      } else {
                        navigate(setting.path);
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
