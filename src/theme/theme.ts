import { createTheme } from "@mui/material";

const commonTypography = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: 14, // base font size (in px)
  h1: {
    fontWeight: 700,
    fontSize: "3rem",
  },
  h2: {
    fontWeight: 600,
    fontSize: "2.25rem",
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.75rem",
  },
  button: {
    textTransform: "none" as const, 
    fontWeight: 600,
    fontSize: "0.875rem",
  },
};

const commonButtonOverrides = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      padding: "8px 20px",
      fontWeight: 600,
    },
    contained: {
      boxShadow: "none",
      backgroundColor: "#bcc6d0ff",
      "&:hover": {
        backgroundColor: "#115293",
      },
    },
    outlined: {
      borderColor: "#1976d2",
      "&:hover": {
        borderColor: "#115293",
        backgroundColor: "rgba(25, 118, 210, 0.04)",
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: commonTypography,
   components: {
    MuiButton: commonButtonOverrides,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: commonTypography,
   components: {
    MuiButton: commonButtonOverrides,
  },
});

