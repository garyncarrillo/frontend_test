import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Switch, FormControlLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import Alert from '../Alert';

import { CreateProduct, UpdateProduct, DeleteProduct, getAllProduct} from '../../controllers/products';
import { SignOut } from '../../controllers/users';
import { useNavigate } from 'react-router-dom';

const initialProduct = { id: null, name: '', price: '', description: '', is_active: true };

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);
  const [snackBarOpts, setSnackBarOpts] = useState({
    isOpen: false,
    message: "",
    variant: "success",
  });
  const navigate = useNavigate();


  const fetchAllProduct = async() => {
    const response = await getAllProduct();

    if (response.status) {
      setProducts(response.data)
    } else {
      setProducts([])
    }
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  const displaySnackBar = (message, variant) => {
    setSnackBarOpts({ message, variant, isOpen: true });
  };

  const closeSnackBar = () => {
    setSnackBarOpts(prev => ({ ...prev, message: "", isOpen: false }));
  };

  const handleClickOpen = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(initialProduct);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSwitchChange = (event) => {
    setCurrentProduct({ ...currentProduct, [event.target.name]: event.target.checked });
  };

  const handleSave = async() => {
    if (currentProduct.id) {
      // Update product
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      );

      const response = await UpdateProduct(currentProduct.id, currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.is_active)
 
      if (response.status) {
        setProducts(updatedProducts);
      }  else {
        displaySnackBar("No fue posible actualizar el producto", "error");
        return;
      }
      
    } else {
      // Add product
      const response = await CreateProduct(currentProduct.name, currentProduct.description, currentProduct.price, currentProduct.is_active)

      if (response.status) {
        const newProduct = { ...currentProduct, id: response.data.id};
        setProducts([...products, newProduct]);
      } else {
        displaySnackBar("No fue posible crear un nuevo producto", "error");
        return;
      }
    }
    handleClose();
  };

  const handleDelete = async(productId) => {
    const response  = await DeleteProduct(productId);

    if (response.status) {
      setProducts(products.filter(product => product.id !== productId));
    } else {
      displaySnackBar("No fue posible eliminar el producto", "error");
      return;
    }
  };


  const logout = () => {
    SignOut();
    navigate('/');
  }

  return (
    <div style={{ marginTop: "20px"}}>
      <Button style={{ marginRight: "20px"}}variant="contained" onClick={() => handleClickOpen(initialProduct)} sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}>
        Add Product
      </Button>

      <Button variant="contained" onClick={logout} sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}>
        Cerrar Session
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.is_active ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleClickOpen(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Alert
        handleClose={closeSnackBar}
        open={snackBarOpts.isOpen}
        message={snackBarOpts.message}
        variant={snackBarOpts.variant}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentProduct.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentProduct.name}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={currentProduct.price}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={currentProduct.description}
            onChange={handleFormChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentProduct.is_active}
                onChange={handleSwitchChange}
                name="is_active"
                color="primary"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSave} sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
