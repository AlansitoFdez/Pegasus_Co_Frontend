import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container } from "@mui/material";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
      }}
    >
      <Navbar />

      <Container 
        component="main" 
        sx={{ 
          flex: 1,          
          py: 4             
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}