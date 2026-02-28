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

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const result = await api.register(form);
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
              Create your ops workspace.
            </Typography>
            <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
              The first account becomes Admin. Use it to manage your teams and workflows.
            </Typography>
          </Box>

          <Paper component="form" onSubmit={onSubmit} sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" fontWeight={600}>
              Sign up
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Set up a secure admin profile.
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <TextField
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Full name"
                fullWidth
                required
                sx={inputSx}
              />
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
                placeholder="Password (min 8 chars)"
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
              {loading ? "Creating..." : "Create account"}
            </Button>
            <Divider sx={{ my: 3 }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" underline="none" color="text.primary">
                Sign in
              </Link>
            </Typography>
          </Paper>
        </Box>
      </Container>
  );
}
