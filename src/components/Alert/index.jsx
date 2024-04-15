import Snackbar from '@mui/material/Snackbar';
import { default as MaterialAlert } from '@mui/material/Alert';

const Alert = ({ open, message, variant, handleClose }) => {
    return(
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <MaterialAlert
            onClose={handleClose}
            severity={variant}
            variant="filled"
            sx={{ width: '100%' }}
            >
            {message}
            </MaterialAlert>
        </Snackbar>
    )
}

export default Alert;