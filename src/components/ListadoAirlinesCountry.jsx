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

function ListadoAirlinesCountry() {
  const [paisSeleccionado, setPaisSeleccionado] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const listaPaises = [
    "Spain",
    "Ireland",
    "Germany",
    "United Kingdom",
    "Italy",
    "Russia",
    "France",
    "USA",
    "Japan",
  ];

  async function handleBuscar() {
    if (!paisSeleccionado) return;
    setCargando(true);
    setBusquedaRealizada(true);
    try {
      const respuesta = await api.get(`/airlines/${paisSeleccionado}`);
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
  }

  const columns = [
    { field: "name", headerName: "Aerolínea", flex: 1 },
    {
      field: "net_worth",
      headerName: "Valor Neto",
      width: 150,
      renderCell: (params) => `${params.value.toLocaleString()} €`,
    },
    {
      field: "foundation_date",
      headerName: "Fundación",
      width: 130,
      renderCell: (params) => {
        // Si no hay valor, ponemos un guion
        if (!params.value) return "-";

        const fecha = new Date(params.value);
        // Si la fecha no es válida, devolvemos el texto original o un error controlado
        if (isNaN(fecha.getTime())) return "Fecha error";

        return fecha.toLocaleDateString("es-ES");
      },
    },
    {
      field: "closed",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (params.value ? "Cerrada" : "Operativa"),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Buscador por País
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={9}>
            <TextField
              select
              fullWidth
              label="Selecciona un País"
              value={paisSeleccionado}
              onChange={(e) => setPaisSeleccionado(e.target.value)}
              size="small"
            >
              {listaPaises.map((pais) => (
                <MenuItem key={pais} value={pais}>
                  {pais}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleBuscar}
              disabled={!paisSeleccionado || cargando}
            >
              BUSCAR
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
            No se han encontrado aerolíneas en {paisSeleccionado}.
          </Alert>
        ))}

      {!busquedaRealizada && (
        <Alert severity="info">
          Selecciona un país para filtrar los resultados.
        </Alert>
      )}
    </Box>
  );
}

export default ListadoAirlinesCountry;
