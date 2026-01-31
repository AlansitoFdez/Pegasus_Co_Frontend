import { useState, useEffect } from "react";
import { Box, Typography, Button, Grid, CircularProgress, Alert, Paper, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";
import { useNavigate } from "react-router-dom";

function ListadoFlights() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFlights() {
      try {
        const respuesta = await api.get("/flights");
        if (respuesta.ok) {
          setDatos(respuesta.datos);
        } else {
          setError(respuesta.mensaje || "Error al obtener vuelos");
        }
      } catch (err) {
        setError("Error de conexión con el servidor");
      } finally {
        setCargando(false);
      }
    }
    fetchFlights();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("¿Estás seguro de eliminar este vuelo?")) {
      try {
        const respuesta = await api.delete(`/flights/${id}`);
        if (respuesta.ok) {
          setDatos(datos.filter((flight) => flight.id !== id));
        }
      } catch (err) {
        alert("Error al eliminar");
      }
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "origin", headerName: "Origen", flex: 1 },
    { field: "destination", headerName: "Destino", flex: 1 },
    { 
      field: "departure_date", 
      headerName: "Salida", 
      width: 180,
      // Renderizado directo para evitar fallos de formato
      renderCell: (params) => new Date(params.value).toLocaleString('es-ES')
    },
    { 
      field: "price", 
      headerName: "Precio", 
      width: 100,
      renderCell: (params) => `${params.value} €`
    },
    {
      field: "cancelled",
      headerName: "Estado",
      width: 120,
      // Usamos renderCell que es más robusto que valueGetter para booleanos
      renderCell: (params) => {
        return params.value ? "Cancelado" : "Programado";
      }
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => navigate(`/flights/editar/${params.row.id}`)} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row.id)} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (cargando) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Grid container alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Vuelos</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={() => navigate("/flights/alta")}
          >
            Nuevo Vuelo
          </Button>
        </Grid>
      </Grid>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper variant="outlined" sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={datos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
}

export default ListadoFlights;