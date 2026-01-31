import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import api from "../api";

export default function EditarAirline() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [airline, setAirline] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    async function getAirline() {
      try {
        const res = await api.get("/airlines");
        if (res.ok) {
          const encontrada = res.datos.find((a) => a.id == id);
          if (encontrada) {
            setAirline({
              ...encontrada,
              foundation_date: dayjs(encontrada.foundation_date),
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    getAirline();
  }, [id]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await api.put(`/airlines/${id}`, {
        ...airline,
        foundation_date: airline.foundation_date.format("YYYY-MM-DD"),
      });

      console.log("Respuesta del servidor:", res); // <-- AÑADE ESTO PARA DEPURAR

      // Si tu backend devuelve los datos directamente sin el sobre "ok",
      // podrías necesitar cambiar la condición:
      if (res && (res.ok || res.id || res.affectedRows)) {
        setDialogMessage("Cambios guardados correctamente.");
      } else {
        setDialogMessage(
          "Error al actualizar: El servidor no confirmó el cambio.",
        );
      }

      setOpenDialog(true);
    } catch (err) {
      console.error("Error en la petición:", err);
      setDialogMessage("Error de conexión.");
      setOpenDialog(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAirline({ ...airline, [name]: type === "checkbox" ? checked : value });
  };

  if (!airline)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{ p: { xs: 2, md: 4 }, mt: 4, borderRadius: 3 }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
          >
            Editar Aerolínea
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={airline.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="País"
                name="country"
                value={airline.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <DatePicker
                label="Fundación"
                value={airline.foundation_date}
                onChange={(val) =>
                  setAirline({ ...airline, foundation_date: val })
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <TextField
                fullWidth
                label="Valor Neto"
                name="net_worth"
                type="number"
                value={airline.net_worth}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="closed"
                    checked={airline.closed}
                    onChange={handleChange}
                  />
                }
                label="Empresa cerrada"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}
            >
              <Button variant="outlined" onClick={() => navigate("/airlines")}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Resultado</DialogTitle>
          <DialogContent>{dialogMessage}</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
                navigate("/airlines");
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
}
