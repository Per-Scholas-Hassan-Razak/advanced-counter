
import { Container, CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./App.css";
import AdvancedCounter from "./components/AdvancedCounter";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme/theme";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () =>
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth="sm"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <AdvancedCounter />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
