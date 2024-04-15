import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Switch, FormControlLabel
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialProduct = { id: null, name: '', price: '', description: '', is_active: true };

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(initialProduct);

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

  const handleSave = () => {
    if (currentProduct.id) {
      // Update product
      const updatedProducts = products.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Add product
      const newProduct = { ...currentProduct, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    handleClose();
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <>
      <Button variant="contained" onClick={() => handleClickOpen(initialProduct)} sx={{ bgcolor: '#4267B2', '&:hover': { bgcolor: '#365899' } }}>
        Add Product
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
    </>
  );
}

export default Dashboard;
