import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../../component/Layout'
import { message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import DateTime from '../../utils/Days';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import OutlinedInput from "@mui/material/OutlinedInput";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from "@mui/material/Paper";
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { UilTrash, UilEdit, UilFilePlus } from "@iconscout/react-unicons";
import "./Products.css"; 
import SelectInput from '@mui/material/Select/SelectInput';

const Alert = React.forwardRef<HTMLDivElement>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Products = () => {

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [tempProduct, setTempProduct] = useState(
    {
        product_name: '',
        brand: '',
        image: '',
        category: '',
        item_price: '',
        stock: '',
    }
  );
  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);
  const [popModal, setPopModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);


  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/product/view');
      setProductData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllProducts();
  }, []);

  const ColorIconButton = styled(IconButton)({
    color: '#FFFFFF',
    '&:hover': {
      color: '#EA7C69',
    },
    '&:active': {
      color: '#EA7C69',
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  const handleDelete = async () => {
    if(del){
      try {
        getAllProducts(); 
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.post('/api/product/delete/:id', {productId:tempProduct._id});
        message.success("Product Deleted Successfully!")
        getAllProducts();   
        setTempProduct(false)
        setDel(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        

      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        getAllProducts();
      }
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(add){
      const formData = new FormData();
      formData.append('image', tempProduct.image);
      formData.append('brand', tempProduct.brand);
      formData.append('product_name', tempProduct.product_name);
      formData.append('category', tempProduct.category);
      formData.append('item_price', tempProduct.item_price);
      formData.append('stock', tempProduct.stock);

      axios.post('http://localhost:5000/api/product/add/', formData)
          .then(res => {
              console.log(res);
              message.success("Product Added Successfully Yagesyaa!")
              getAllProducts();   
              setTempProduct(false)
              setAdd(false);
              setOpenAdd(false);
              dispatch({
                type: "HIDE_LOADING",
              });
          })
          .catch(err => {
              console.log(err);
              dispatch({
                type: "HIDE_LOADING",
              });
              message.error("Error Yagesya!")
              console.log(err);
          });
    } else{
        const formData = new FormData();
        formData.append('image', tempProduct.image);
        formData.append('brand', tempProduct.brand);
        formData.append('product_name', tempProduct.product_name);
        formData.append('category', tempProduct.category);
        formData.append('item_price', tempProduct.item_price);
        formData.append('stock', tempProduct.stock);
        axios.put(`http://localhost:5000/api/product/edit/${tempProduct._id}`, formData)
            .then(res => {
                console.log(res);
                message.success("Update Successfully Yagesyaa!")
                getAllProducts();   
                setOpenEdit(false);
                dispatch({
                  type: "HIDE_LOADING",
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                  type: "HIDE_LOADING",
                });
                message.error("Error Yagesya!")
                console.log(err);
            });
    }
  }

  const handleChange = (e) => {
    setTempProduct({...tempProduct, [e.target.name]: e.target.value});
  }

  const handleImage = (e) => {
    setTempProduct({...tempProduct, image: e.target.files[0]});
  }

  const priceSplitter = (number) => (number && "Rp " + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  return (
    <div className="productPage">
    <LayoutApp>
      <div className="MainDash">
          <div className="title">
            <h1>Product Management</h1>
            <DateTime></DateTime>
          </div>
          <div className="Table">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table aria-label="sticky table">
              <Button disableRipple size="small" startIcon={<UilFilePlus/>} onClick={()=> {setOpenAdd(true); setAdd(true); setTempProduct(false);}}>
                  Add New Product
              </Button>
              </Table>
            </TableContainer>
            <div className="Content">
              <div className="Cards ">
              {productData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                return (
                  <div className="parentContainer" key={row}>
                    <div className="CompactCard">
                      <div className="productsImage"> <img src={row.image} /> </div>
                      <div className="productsDetail">
                          <span>{row.product_name}</span>
                          <span>
                              Brand - {row.brand} • Category - {capitalizeFirst(row.category)}
                          </span>
                          <span>{priceSplitter(row.item_price)} • {row.stock} In Stock</span>
                      </div>
                      <div className="productButton">
                        <Stack direction="row" spacing={2}>
                          <ColorIconButton disableRipple size="small" onClick={()=> {setTempProduct(row); setOpenEdit(true)}}>
                            <UilEdit />
                          </ColorIconButton>
                          <ColorIconButton disableRipple size="small" onClick={()=> {setTempProduct(row); setDel(true); handleDelete(row)}}>
                            <UilTrash />
                          </ColorIconButton>
                        </Stack>                        
                        <Dialog sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.1)' }}} open={openEdit} onClose={() => {setOpenEdit(false)}}>
                            <DialogTitle>
                              Edit Product
                            </DialogTitle>
                              <DialogContent>
                                <form>
                                <TextField
                                  sx={{my:2}}
                                  name="product_name"
                                  defaultValue={tempProduct.product_name}
                                  value={tempProduct.product_name}
                                  id="outlined-helperText"
                                  label="Product Name"
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                <TextField
                                  sx={{my:2}}
                                  name="brand"
                                  defaultValue={tempProduct.brand}
                                  value={tempProduct.brand}
                                  id="outlined-helperText"
                                  label="Brand"
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                <TextField
                                  sx={{my:2}}
                                  name="image"
                                  type="file" 
                                  accept=".png, .jpg, .jpeg"
                                  onChange={handleImage}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                 <FormControl fullWidth variant="outlined" sx={{my:2}}>
                                    <InputLabel variant="outlined" htmlFor="uncontrolled-native">
                                      Category
                                    </InputLabel>
                                    <NativeSelect
                                      name="category"
                                      defaultValue={tempProduct.category}
                                      value={tempProduct.category}
                                      input={<OutlinedInput label="Category" />}
                                      inputProps={{
                                        name: 'category',
                                        id: 'uncontrolled-native',
                                      }}
                                      size="small"
                                      onChange={handleChange}
                                    >
                                      <option value={"chips"}>Chips</option>
                                      <option value={"ice cream"}>Ice Cream</option>
                                      <option value={"cookies"}>Cookies</option>
                                      <option value={"noodle"}>Noodle</option>
                                      <option value={"chocolate"}>Chocolate</option>
                                    </NativeSelect>
                                  </FormControl>
                                  <TextField
                                    sx={{my:2}}
                                    name="item_price"
                                    defaultValue={tempProduct.item_price}
                                    value={tempProduct.item_price}
                                    id="outlined-helperText"
                                    label="Item Price"
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                    autoComplete='off'
                                  />
                                  <TextField
                                    sx={{my:2}}
                                    name="stock"
                                    defaultValue={tempProduct.stock}
                                    value={tempProduct.stock}
                                    id="outlined-helperText"
                                    label="Stock"
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                    autoComplete='off'
                                  />
                              </form>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => {setOpenEdit(false); setAdd(false)}}>Cancel</Button>
                                <Button htmlType='submit' onClick={handleSubmit}>Submit</Button>
                              </DialogActions>
                            </Dialog>
                            <Dialog sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.1)' }}} open={openAdd} onClose={() => {setOpenAdd(false)}}>
                            <DialogTitle>
                              Add Product
                            </DialogTitle>
                              <DialogContent>
                                <form>
                                <TextField
                                  sx={{my:2}}
                                  name="product_name"
                                  defaultValue={tempProduct.product_name}
                                  value={tempProduct.product_name}
                                  id="outlined-helperText"
                                  label="Product Name"
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                <TextField
                                  sx={{my:2}}
                                  name="brand"
                                  defaultValue={tempProduct.brand}
                                  value={tempProduct.brand}
                                  id="outlined-helperText"
                                  label="Brand"
                                  onChange={handleChange}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                <TextField
                                  sx={{my:2}}
                                  name="image"
                                  type="file" 
                                  accept=".png, .jpg, .jpeg"
                                  name="image"
                                  onChange={handleImage}
                                  fullWidth
                                  size="small"
                                  autoComplete='off'
                                />
                                <FormControl fullWidth className="select">
                                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                  <Select
                                    sx={{my:2}}
                                    name="category"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tempProduct.category}
                                    label="Category"
                                    onChange={handleChange}
                                    size="small"
                                  >
                                    <MenuItem value={"chips"}>Chips</MenuItem>
                                    <MenuItem value={"ice cream"}>Ice Cream</MenuItem>
                                    <MenuItem value={"cookies"}>Cookies</MenuItem>
                                    <MenuItem value={"noodle"}>Noodle</MenuItem>
                                    <MenuItem value={"chocolate"}>Chocolate</MenuItem>
                                  </Select>
                                </FormControl>
                                  <TextField
                                    sx={{my:2}}
                                    name="item_price"
                                    defaultValue={tempProduct.item_price}
                                    value={tempProduct.item_price}
                                    id="outlined-helperText"
                                    label="Item Price"
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                    autoComplete='off'
                                  />
                                  <TextField
                                    sx={{my:2}}
                                    name="stock"
                                    defaultValue={tempProduct.stock}
                                    value={tempProduct.stock}
                                    id="outlined-helperText"
                                    label="Stock"
                                    onChange={handleChange}
                                    fullWidth
                                    size="small"
                                    autoComplete='off'
                                  />
                              </form>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={() => {setOpenAdd(false); setAdd(false)}}>Cancel</Button>
                                <Button htmlType='submit' onClick={handleSubmit}>Submit</Button>
                              </DialogActions>
                            </Dialog>
                      </div>
                    </div>
                  </div>
                );

                
              })}
            </div>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={productData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
    </div>
    </div>
    </LayoutApp>
    </div>
  )
}

export default Products
