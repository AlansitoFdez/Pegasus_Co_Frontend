import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © 2026 Alan Fernández Diosdado - Gestión de Vuelos
      </Typography>
    </Box>
  );
}
