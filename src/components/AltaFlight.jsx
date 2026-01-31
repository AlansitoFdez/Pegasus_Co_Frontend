import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Typography, Button, TextField, Grid, Paper, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, 
  MenuItem, FormControlLabel, Checkbox, CircularProgress, Container 
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import api from "../api";

export default function AltaFlight() {
  const navigate = useNavigate();
  
  const [flight, setFlight] = useState({
    flight_number: "",
    origin: "",
    destination: "",
    departure_date: null,
    price: "",
    airline_id: "",
    cancelled: false,
  });

  const [airlines, setAirlines] = useState([]);
  const [isCamposValidos, setIsCamposValidos] = useState({
    flight_number: true, origin: true, destination: true, departure_date: true, price: true, airline_id: true
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const res = await api.get("/airlines");
        if (res.ok) setAirlines(res.datos);
      } catch (err) {
        console.error("Error cargando aerolíneas");
      }
    }
    fetchAirlines();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlight({ ...flight, [name]: type === "checkbox" ? checked : value });
    setIsCamposValidos({ ...isCamposValidos, [name]: true });
  };

  const handleDateChange = (newValue) => {
    setFlight({ ...flight, departure_date: newValue });
    setIsCamposValidos({ ...isCamposValidos, departure_date: true });
  };

  const handleClick = async () => {
    const errores = {
      flight_number: !flight.flight_number,
      origin: !flight.origin,
      destination: !flight.destination,
      departure_date: !flight.departure_date,
      price: !flight.price,
      airline_id: !flight.airline_id,
    };

    setIsCamposValidos(errores);
    if (Object.values(errores).some(v => v)) return;

    setIsUpdating(true);
    try {
      const res = await api.post("/flights", {
        ...flight,
        departure_date: flight.departure_date ? flight.departure_date.format("YYYY-MM-DD") : null,
      });

      if (res.ok) {
        setDialogMessage("Vuelo registrado correctamente.");
        setOpenDialog(true);
      } else {
        setDialogMessage("Error al guardar: " + res.mensaje);
        setOpenDialog(true);
      }
    } catch (err) {
      setDialogMessage("Error de conexión.");
      setOpenDialog(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (dialogMessage.includes("correctamente")) navigate("/flights");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
            Registrar Nuevo Vuelo
          </Typography>

          <Grid container spacing={3}>
            {/* Numero de Vuelo - 12 móvil, 4 escritorio */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth label="Nº de Vuelo" name="flight_number"
                value={flight.flight_number} onChange={handleChange}
                error={!isCamposValidos.flight_number}
              />
            </Grid>

            {/* Origen - 12 móvil, 4 escritorio */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth label="Ciudad Origen" name="origin"
                value={flight.origin} onChange={handleChange}
                error={!isCamposValidos.origin}
              />
            </Grid>

            {/* Destino - 12 móvil, 4 escritorio */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth label="Ciudad Destino" name="destination"
                value={flight.destination} onChange={handleChange}
                error={!isCamposValidos.destination}
              />
            </Grid>

            {/* Fecha - 12 móvil, 6 escritorio */}
            <Grid item xs={12} md={6}>
              <DatePicker
                label="Fecha de Salida"
                value={flight.departure_date}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true, error: !isCamposValidos.departure_date }}}
              />
            </Grid>

            {/* Precio - 12 móvil, 6 escritorio */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth label="Precio (€)" name="price" type="number"
                value={flight.price} onChange={handleChange}
                error={!isCamposValidos.price}
              />
            </Grid>

            {/* Aerolínea - Ocupa casi todo el ancho en escritorio */}
            <Grid item xs={12} md={8}>
              <TextField
                select fullWidth label="Aerolínea Responsable" name="airline_id"
                value={flight.airline_id} onChange={handleChange}
                error={!isCamposValidos.airline_id}
              >
                {airlines.map((a) => (
                  <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Cancelado - Alineado con el select */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Checkbox name="cancelled" checked={flight.cancelled} onChange={handleChange} />}
                label="Estado: Cancelado"
              />
            </Grid>

            {/* Botones */}
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate("/flights")}
                sx={{ width: { xs: '100%', md: '200px' } }}
              >
                Volver
              </Button>
              <Button 
                variant="contained" 
                onClick={handleClick} 
                disabled={isUpdating}
                sx={{ width: { xs: '100%', md: '300px' }, py: 1.5 }}
              >
                {isUpdating ? <CircularProgress size={24} /> : "REGISTRAR VUELO"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent><Typography>{dialogMessage}</Typography></DialogContent>
          <DialogActions><Button onClick={handleDialogClose} variant="contained">Cerrar</Button></DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
}