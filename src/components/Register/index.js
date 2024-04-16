import React, { useState } from 'react';
import { TextField, Button, Typography, Tooltip, Box } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';

import Alert from '../Alert';
import { SignUp } from "../../controllers/users";
import { useNavigate } from 'react-router-dom';

// Crear componentes estilizados
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f2f5'
});

const StyledButton = styled(Button)({
  marginTop: '24px', // 3 * theme spacing
  backgroundColor: '#4267B2',
  '&:hover': {
    backgroundColor: '#365899'
  }
});

const StyledTypography = styled(Typography)({
  color: '#4267B2',
  marginBottom: '16px'
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      displaySnackBar("Las contraseñas no coinciden", "error");
      return;
    }
    console.log("Registrado", formData);
    const response  = await SignUp(formData.email, formData.password);
    if (response.status) {
      navigate('/')
    } else {
      displaySnackBar("No fue posible registrarte", "error");
      return;
    }
  };

  const passwordValidationTooltip = (
    "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un símbolo especial (ej. @#$%)."
  );

  return (
    <StyledBox>
      <StyledTypography variant="h4">
        Registrarse
      </StyledTypography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange('email')}
        />
        <Tooltip title={passwordValidationTooltip} placement="right">
          <TextField
            required
            fullWidth
            label="Clave"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={formData.password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: showPassword ? <VisibilityOff onClick={handleToggleShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility onClick={handleToggleShowPassword} onMouseDown={handleMouseDownPassword} />
            }}
          />
        </Tooltip>
        <Tooltip title={passwordValidationTooltip} placement="right">
          <TextField
            required
            fullWidth
            label="Confirmar Clave"
            type={showConfirmPassword ? 'text' : 'password'}
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            InputProps={{
              endAdornment: showConfirmPassword ? <VisibilityOff onClick={handleToggleShowConfirmPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility onClick={handleToggleShowConfirmPassword} onMouseDown={handleMouseDownPassword} />
            }}
          />
        </Tooltip>
        <StyledButton type="submit" fullWidth variant="contained">
          Registrarse
        </StyledButton>

        <Alert
          handleClose={closeSnackBar}
          open={snackBarOpts.isOpen}
          message={snackBarOpts.message}
          variant={snackBarOpts.variant}
        />
      </Box>
    </StyledBox>
  );
};

export default Register;
