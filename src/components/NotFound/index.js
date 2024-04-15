import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

// Creando componentes estilizados
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: 'background.paper' // Asegúrate de tener este color definido en tu tema, o reemplázalo con un valor específico.
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#4267B2'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4267B2',
  '&:hover': {
    backgroundColor: '#365899'
  }
}));

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <StyledBox>
            <StyledTypography variant="h3" gutterBottom>
                404 - Página No Encontrada
            </StyledTypography>
            <StyledTypography variant="subtitle1" mb={2}>
                Lo sentimos, no pudimos encontrar la página que estabas buscando.
            </StyledTypography>
            <StyledButton
                variant="contained"
                onClick={() => navigate('/')}
            >
                Volver al Inicio
            </StyledButton>
        </StyledBox>
    );
};

export default NotFound;