import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styled from '@emotion/styled';

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const StyledButton = styled(Button)({
  marginTop: '16px', // 2 * theme spacing
});

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login", { username, password });
  };

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <StyledButton type="submit" variant="contained">
          Iniciar Sesión
        </StyledButton>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta? 
          <Link component={RouterLink} to="/register" style={{ marginLeft: '8px' }}>
            Regístrate
          </Link>
        </Typography>
      </form>
    </StyledBox>
  );
};

export default Login;
