import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext } from "react";

// --- PAGINAS ---
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Inicio from "./pages/Inicio";

// --- COMPONENTES ---
import ListadoAirlines from "./components/ListadoAirlines";
import ListadoFlights from "./components/ListadoFlights";
import AltaAirline from "./components/AltaAirline";
import AltaFlight from "./components/AltaFlight";
import EditarAirline from "./components/EditarAirline";
import EditarFlight from "./components/EditarFlight";
import ListadoAirlinesCountry from "./components/ListadoAirlinesCountry";
import BuscadorFlights from "./components/BuscadorFlights";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Inicio },
      // --- AEROLÍNEAS ---
      { path: "/airlines", element: <ListadoAirlines /> },
      { path: "/airlines/alta", element: <AltaAirline /> }, 
      { path: "/airlines/search", element: <ListadoAirlinesCountry /> },
      { path: "/airlines/editar/:id", element: <EditarAirline /> },
      // --- VUELOS ---
      { path: "/flights", element: <ListadoFlights /> },
      { path: "/flights/alta", element: <AltaFlight /> },
      { path: "/flights/search", element: <BuscadorFlights /> }, 
      { path: "/flights/editar/:id", element: <EditarFlight /> },
    ]
  }
]);

export default function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light' 
        ? { primary: { main: '#1a237e' } } 
        : { primary: { main: '#90caf9' } } 
      ),
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}