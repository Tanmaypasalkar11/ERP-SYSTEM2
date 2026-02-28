import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { api, setToken } from "../lib/api";
import { setAuth } from "../features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.login(form);
      setToken(result.token);
      dispatch(setAuth({ user: result.user, token: result.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.6)",
      borderRadius: "16px"
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          width: "100%",
            display: "grid",
            gap: { xs: 4, md: 6 },
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" }
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ letterSpacing: "0.5em", color: "text.secondary" }}>
              Strelema ERP
            </Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              Welcome back to your manufacturing command center.
            </Typography>
            <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
              Log in to orchestrate orders, production, and inventory in one unified workspace.
            </Typography>
            <Paper sx={{ mt: 4, p: 3 }}>
              <Typography variant="overline" sx={{ letterSpacing: "0.4em", color: "text.secondary" }}>
                Demo Credentials
              </Typography>
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Admin</Typography>
                  <Typography>admin@erp.com / admin123</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Purchase</Typography>
                  <Typography>purchase@erp.com / purchase123</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Production</Typography>
                  <Typography>production@erp.com / production123</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={600}>Sales</Typography>
                  <Typography>sales@erp.com / sales123</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>

          <Paper component="form" onSubmit={onSubmit} sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" fontWeight={600}>
              Login
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Use your admin or manager credentials.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email"
                fullWidth
                required
                sx={inputSx}
              />
              <TextField
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="Password"
                fullWidth
                required
                sx={inputSx}
              />
            </Stack>
            {error && (
              <Typography sx={{ mt: 2, color: "text.primary" }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, py: 1.2 }}
              fullWidth
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              New here?{" "}
              <Link component={RouterLink} to="/signup" underline="none" color="text.primary">
                Create an account
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Container>
  );
}
