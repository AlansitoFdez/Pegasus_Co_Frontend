import { Box, Typography, Container, Grid, Paper, Button } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.75rem" }, // Ajuste responsive de fuente
          }}
        >
          Pegasus & Co.
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            maxWidth: 700,
            mx: "auto",
            fontSize: { xs: "1.1rem", md: "1.5rem" },
          }}
        >
          Sistema centralizado para la gestión de flotas aéreas.
        </Typography>
      </Box>

      {/* Accesos Directos */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              "&:hover": { borderColor: "primary.main", bgcolor: "#f8f9ff" },
            }}
          >
            <BusinessIcon sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Aerolíneas
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Administra el registro de compañías, sus activos netos y estados
              operativos.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/airlines")}>
              Gestionar Aerolíneas
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              "&:hover": { borderColor: "primary.main", bgcolor: "#f8f9ff" },
            }}
          >
            <FlightTakeoffIcon
              sx={{ fontSize: 50, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              Vuelos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Controla la programación de rutas, precios y estado de vuelos en
              tiempo real.
            </Typography>
            <Button variant="contained" onClick={() => navigate("/flights")}>
              Ver Vuelos
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
