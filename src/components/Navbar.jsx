import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Container, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from "../App";

function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  const [anchorElAirlines, setAnchorElAirlines] = useState(null);
  const [anchorElFlights, setAnchorElFlights] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const closeAll = () => {
    setAnchorElNav(null);
    setAnchorElAirlines(null);
    setAnchorElFlights(null);
  };

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <FlightTakeoffIcon sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: { xs: 1, md: 0 }, mr: 4, color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Pegasus & Co.
          </Typography>

          {/* MENÚ MÓVIL */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={(e) => setAnchorElNav(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={closeAll}>
              <MenuItem component={Link} to="/" onClick={closeAll}>Inicio</MenuItem>
              <Divider />
              <MenuItem component={Link} to="/airlines" onClick={closeAll}>Aerolíneas</MenuItem>
              <MenuItem component={Link} to="/flights" onClick={closeAll}>Vuelos</MenuItem>
            </Menu>
          </Box>

          {/* MENÚ ESCRITORIO */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/">Inicio</Button>
            <Button color="inherit" onClick={(e) => setAnchorElAirlines(e.currentTarget)}>Aerolíneas</Button>
            <Menu anchorEl={anchorElAirlines} open={Boolean(anchorElAirlines)} onClose={closeAll}>
              <MenuItem component={Link} to="/airlines" onClick={closeAll}>Listado General</MenuItem>
              <MenuItem component={Link} to="/airlines/alta" onClick={closeAll}>Nueva Alta</MenuItem>
              <MenuItem component={Link} to="/airlines/search" onClick={closeAll}>Buscar por País</MenuItem>
            </Menu>
            <Button color="inherit" onClick={(e) => setAnchorElFlights(e.currentTarget)}>Vuelos</Button>
            <Menu anchorEl={anchorElFlights} open={Boolean(anchorElFlights)} onClose={closeAll}>
              <MenuItem component={Link} to="/flights" onClick={closeAll}>Ver Vuelos</MenuItem>
              <MenuItem component={Link} to="/flights/alta" onClick={closeAll}>Crear Vuelo</MenuItem>
              <MenuItem component={Link} to="/flights/search" onClick={closeAll}>Buscar Origen</MenuItem>
            </Menu>
          </Box>

          {/* BOTÓN MODO OSCURO */}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
import { Divider } from "@mui/material"; // Asegúrate de tener el import de Divider
export default Navbar;