import { createTheme } from "@mui/material/styles";

const buildTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#2F8F8A"
      },
      background: {
        default: mode === "dark" ? "#0C1014" : "#FCF8F2",
        paper: mode === "dark" ? "#151B22" : "#F4EEE5"
      },
      text: {
        primary: mode === "dark" ? "#F2ECE2" : "#000000",
        secondary: mode === "dark" ? "rgba(242,236,226,0.7)" : "rgba(0,0,0,0.7)"
      }
    },
    typography: {
      fontFamily: '"Inter", "Sora", system-ui, sans-serif',
      h2: {
        fontWeight: 600,
        letterSpacing: "-0.02em"
      },
      h3: {
        fontWeight: 600,
        letterSpacing: "-0.02em"
      }
    },
    shape: {
      borderRadius: 18
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            border: mode === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            boxShadow:
              mode === "dark"
                ? "0 24px 50px rgba(0, 0, 0, 0.45), 0 0 14px rgba(242, 230, 205, 0.12)"
                : "0 24px 50px rgba(50, 38, 24, 0.16), 0 0 14px rgba(50, 38, 24, 0.12)",
            backdropFilter: "blur(14px)"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 600
          }
        }
      }
    }
  });

export default buildTheme;
