import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Alert from '../Alert';
import { SignIn } from "../../controllers/users";

import { AUTH_TOKEN } from "../../config/libs/constants";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackBarOpts, setSnackBarOpts] = useState({
    isOpen: false,
    message: "",
    variant: "success",
  });
  const navigate = useNavigate();

  
  const displaySnackBar = (message, variant) => {
    setSnackBarOpts({ message, variant, isOpen: true });
  };

  const closeSnackBar = () => {
    setSnackBarOpts(prev => ({ ...prev, message: "", isOpen: false }));
  };

  function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name + '=') === 0) {
            return c.substring(name.length + 1, c.length);
        }
    }
    return null;
}

  const handleLogin = async () => {
    console.log("Login", { email, password });
    const response = await SignIn(email, password);

    if (response.status) {
      navigate('/')
    } else {
      displaySnackBar("usuario o contraseñas son invalidos", "error");
      return;
    }
  };

  return (
    <StyledBox>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <div>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <StyledButton type="submit" variant="contained" onClick={handleLogin}>
          Iniciar Sesión
        </StyledButton>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes cuenta? 
          <Link component={RouterLink} to="/register" style={{ marginLeft: '8px' }}>
            Regístrate
          </Link>
        </Typography>
      </div>

      <Alert
        handleClose={closeSnackBar}
        open={snackBarOpts.isOpen}
        message={snackBarOpts.message}
        variant={snackBarOpts.variant}
      />
    </StyledBox>
  );
};

export default Login;
