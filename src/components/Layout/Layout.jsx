import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />
      <Header />
      <Box component="main" flexGrow={1} p={2}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
