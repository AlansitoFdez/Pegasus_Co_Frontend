import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import api from "../api";

function BuscadorFlights() {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const listaCiudades = [
    "Madrid",
    "Barcelona",
    "London",
    "Paris",
    "Rome",
    "Berlin",
    "Valencia",
    "Lisbon",
    "Moscow",
    "Tokyo",
    "Athens",
    "New York",
    "Florida",
    "Miami",
    "Malaga",
  ];

  const handleBuscar = async () => {
    if (!ciudadSeleccionada) return;
    setCargando(true);
    setBusquedaRealizada(true);
    try {
      const respuesta = await api.get(`/flights/origin/${ciudadSeleccionada}`);
      if (respuesta.ok) {
        setDatosFiltrados(respuesta.datos);
      } else {
        setDatosFiltrados([]);
      }
    } catch (err) {
      setDatosFiltrados([]);
    } finally {
      setCargando(false);
    }
  };

  const columns = [
    { field: "flight_number", headerName: "Nº Vuelo", width: 120 },
    { field: "destination", headerName: "Destino", flex: 1 },
    {
      field: "departure_date",
      headerName: "Fecha y Hora",
      width: 200,
      renderCell: (params) => {
        if (!params.value) return "-";
        const fecha = new Date(params.value);
        return isNaN(fecha.getTime())
          ? "Error fecha"
          : fecha.toLocaleString("es-ES");
      },
    },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      renderCell: (params) => `${params.value} €`,
    },
    {
      field: "cancelled",
      headerName: "Estado",
      width: 130,
      renderCell: (params) => (params.value ? "Cancelado" : "Programado"),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Buscador de Vuelos
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 2 }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={9}>
            <TextField
              select
              fullWidth
              label="Ciudad de Origen"
              value={ciudadSeleccionada}
              onChange={(e) => setCiudadSeleccionada(e.target.value)}
            >
              {listaCiudades.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={!cargando && <SearchIcon />}
              onClick={handleBuscar}
              disabled={!ciudadSeleccionada || cargando}
              sx={{ height: "56px" }} // Para que mida lo mismo que el TextField
            >
              {cargando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "BUSCAR"
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {busquedaRealizada &&
        (cargando ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : datosFiltrados.length > 0 ? (
          <Paper variant="outlined" sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={datosFiltrados}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Paper>
        ) : (
          <Alert severity="warning">
            No hay vuelos desde {ciudadSeleccionada}.
          </Alert>
        ))}

      {!busquedaRealizada && (
        <Alert severity="info">
          Selecciona una ciudad de salida para buscar.
        </Alert>
      )}
    </Box>
  );
}

export default BuscadorFlights;
