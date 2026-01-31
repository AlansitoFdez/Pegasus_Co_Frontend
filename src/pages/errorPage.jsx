import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "text.disabled" }} />
        
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          404
        </Typography>

        <Typography variant="h5" color="text.secondary">
          Vaya, parece que este vuelo no existe.
        </Typography>

        <Typography variant="body1" color="text.disabled" sx={{ mb: 2 }}>
          La página que buscas no está disponible o ha sido movida.
        </Typography>

        <Button 
          variant="contained" 
          onClick={() => navigate("/")}
          sx={{ px: 4, py: 1 }}
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
}