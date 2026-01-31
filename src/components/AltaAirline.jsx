import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Typography, Button, TextField, Grid, Paper, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, 
  FormControlLabel, Checkbox, CircularProgress, Container 
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import api from "../api";

export default function AltaAirline() {
  const navigate = useNavigate();
  
  const [airline, setAirline] = useState({
    name: "",
    country: "",
    net_worth: "",
    closed: false,
    foundation_date: null,
  });

  const [isCamposValidos, setIsCamposValidos] = useState({
    name: true, country: true, net_worth: true, foundation_date: true,
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAirline({
      ...airline,
      [name]: type === "checkbox" ? checked : value,
    });
    // Limpiar error al escribir
    setIsCamposValidos({ ...isCamposValidos, [name]: true });
  };

  const handleDateChange = (newValue) => {
    setAirline({ ...airline, foundation_date: newValue });
    setIsCamposValidos({ ...isCamposValidos, foundation_date: true });
  };

  const handleClick = async () => {
    // Validación básica antes de enviar
    const errores = {
      name: !airline.name,
      country: !airline.country,
      net_worth: !airline.net_worth,
      foundation_date: !airline.foundation_date,
    };

    setIsCamposValidos(errores);

    if (Object.values(errores).some(v => v)) return;

    setIsUpdating(true);
    try {
      const res = await api.post("/airlines", {
        ...airline,
        foundation_date: airline.foundation_date ? airline.foundation_date.format("YYYY-MM-DD") : null,
      });

      if (res.ok) {
        setDialogMessage("Aerolínea guardada correctamente.");
        setOpenDialog(true);
      } else {
        setDialogMessage("Error: " + res.mensaje);
        setOpenDialog(true);
      }
    } catch (err) {
      setDialogMessage("Error de conexión con el servidor.");
      setOpenDialog(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (dialogMessage.includes("correctamente")) {
      navigate("/airlines");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
            Alta de Aerolínea
          </Typography>

          <Grid container spacing={3}>
            {/* Nombre - Full width en móvil, mitad en escritorio */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth label="Nombre de la Aerolínea" name="name"
                value={airline.name} onChange={handleChange}
                error={!isCamposValidos.name}
                helperText={!isCamposValidos.name && "El nombre es obligatorio"}
              />
            </Grid>

            {/* País - Full width en móvil, mitad en escritorio */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth label="País" name="country"
                value={airline.country} onChange={handleChange}
                error={!isCamposValidos.country}
                helperText={!isCamposValidos.country && "El país es obligatorio"}
              />
            </Grid>

            {/* Fecha - 12 móvil, 6 tablet, 4 escritorio */}
            <Grid item xs={12} sm={6} lg={4}>
              <DatePicker
                label="Fecha Fundación"
                value={airline.foundation_date}
                onChange={handleDateChange}
                slotProps={{ 
                  textField: { 
                    fullWidth: true, 
                    error: !isCamposValidos.foundation_date,
                    helperText: !isCamposValidos.foundation_date && "Fecha obligatoria"
                  } 
                }}
              />
            </Grid>

            {/* Valor Neto - 12 móvil, 6 tablet, 4 escritorio */}
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth label="Valor Neto (€)" name="net_worth" type="number"
                value={airline.net_worth} onChange={handleChange}
                error={!isCamposValidos.net_worth}
              />
            </Grid>

            {/* Checkbox - 12 móvil, 12 tablet, 4 escritorio (alineado) */}
            <Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', lg: 'center' } }}>
              <FormControlLabel
                control={<Checkbox name="closed" checked={airline.closed} onChange={handleChange} />}
                label="Empresa cerrada"
              />
            </Grid>

            {/* Botones - Centrados y Responsive */}
            <Grid item xs={12} sx={{ mt: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => navigate("/airlines")}
                sx={{ width: { xs: '100%', md: '200px' } }}
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                onClick={handleClick} 
                disabled={isUpdating}
                sx={{ width: { xs: '100%', md: '300px' }, py: 1.5 }}
              >
                {isUpdating ? <CircularProgress size={24} /> : "GUARDAR AEROLÍNEA"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Aviso del Sistema</DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="contained">Aceptar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
}