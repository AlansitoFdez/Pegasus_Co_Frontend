import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Typography, Button, TextField, Grid, Paper, Box, MenuItem,
  Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControlLabel, Checkbox, CircularProgress, Container 
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import api from "../api";

export default function EditarFlight() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [airlines, setAirlines] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [resVuelos, resAirlines] = await Promise.all([api.get("/flights"), api.get("/airlines")]);
        if (resAirlines.ok) setAirlines(resAirlines.datos);
        if (resVuelos.ok) {
          const encontrado = resVuelos.datos.find(f => f.id == id);
          if (encontrado) setFlight({ ...encontrado, departure_date: dayjs(encontrado.departure_date) });
        }
      } catch (err) { console.error(err); }
    }
    cargarDatos();
  }, [id]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await api.put(`/flights/${id}`, {
        ...flight,
        departure_date: flight.departure_date.format("YYYY-MM-DD")
      });
      setDialogMessage(res.ok ? "Vuelo actualizado." : "Error.");
      setOpenDialog(true);
    } catch (err) { setDialogMessage("Error conexión."); setOpenDialog(true); }
    finally { setIsUpdating(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFlight({ ...flight, [name]: type === "checkbox" ? checked : value });
  };

  if (!flight) return <CircularProgress />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Editar Vuelo</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Nº Vuelo" name="flight_number" value={flight.flight_number} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Origen" name="origin" value={flight.origin} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField fullWidth label="Destino" name="destination" value={flight.destination} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker label="Fecha" value={flight.departure_date} onChange={(val) => setFlight({...flight, departure_date: val})} slotProps={{ textField: { fullWidth: true }}} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Precio" name="price" type="number" value={flight.price} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField select fullWidth label="Aerolínea" name="airline_id" value={flight.airline_id} onChange={handleChange}>
                {airlines.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel control={<Checkbox name="cancelled" checked={flight.cancelled} onChange={handleChange} />} label="Cancelado" />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/flights")}>Cancelar</Button>
              <Button variant="contained" onClick={handleUpdate} disabled={isUpdating}>Guardar</Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}><DialogActions><Button onClick={() => {setOpenDialog(false); navigate("/flights")}}>Aceptar</Button></DialogActions></Dialog>
      </Container>
    </LocalizationProvider>
  );
}