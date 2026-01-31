import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";
import { useNavigate } from "react-router-dom";

function ListadoAirlines() {
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const respuesta = await api.get("/airlines");
        if (respuesta.ok) {
          setDatos(respuesta.datos);
        } else {
          setError(respuesta.mensaje || "Error al obtener datos");
        }
      } catch (err) {
        setError("Error de conexión");
      } finally {
        setCargando(false);
      }
    }
    fetchAirlines();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("¿Eliminar esta aerolínea?")) {
      try {
        await api.delete(`/airlines/${id}`);
        setDatos(datos.filter((item) => item.id !== id));
      } catch (err) {
        alert("No se pudo borrar. Verifique si tiene vuelos asociados.");
      }
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "country", headerName: "País", flex: 1 },
    {
      field: "net_worth",
      headerName: "Valor Neto",
      width: 150,
      renderCell: (params) => `${params.value.toLocaleString()} €`,
    },
    {
      field: "closed",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (params.value ? "Cerrada" : "Operativa"),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/airlines/editar/${params.row.id}`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (cargando)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: { xs: "center", sm: "left" } }}
          >
            Aerolíneas
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ textAlign: { xs: "center", sm: "right" } }}
        >
          <Button
            fullWidth={window.innerWidth < 600} 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/airlines/alta")}
          >
            Nueva Aerolínea
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ height: 500, width: "100%" }}>
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

export default ListadoAirlines;
