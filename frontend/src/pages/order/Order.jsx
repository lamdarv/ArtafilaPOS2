import React, {useState, useEffect} from 'react'
import LayoutApp from '../../component/Layout'
import axios from 'axios'
import {Row, Col} from 'antd';
import Product from '../../component/Product';
import { useDispatch } from "react-redux";
import Tag from './product/Tag';
import IconButton from '@mui/material/IconButton';
import DateTime from '../../utils/Days';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TablePagination from "@mui/material/TablePagination";
import { styled } from '@mui/material/styles';
import { UilShoppingBag } from "@iconscout/react-unicons";
import Badge, { BadgeProps } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import { Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./Order.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

  function TabPanel(props: TabPanelProps) {

  const { children, value, index, ...other } = props;
  
  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const ColorIconButton = styled(IconButton)({
    color: '#FFFFFF',
    '&:hover': {
      color: '#EA7C69',
    },
    '&:active': {
      color: '#EA7C69',
    }
  });

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    height: 24,
    right: -3,
    top: 1,
    border: '5px solid #252836',
    padding: '0px 4px'
  },
}));

const Order = ()=> {
  const {cartItems, setCartItems} = useSelector(state => state.rootReducer);

  const navigate = useNavigate();
  
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartItems)
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  useEffect(() => {
    const getAllProducts = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });
          const {data} = await axios.get('artafila-pos.herokuapp/api/product/view');
          setProductData(data);
          dispatch({
            type: "HIDE_LOADING",
          });
          console.log(data);

        } catch(error) {
          console.log(error);
        }
      };

      getAllProducts();
  }, []);

  return (
    <div className="orderPage">
    <LayoutApp>
      <div className="MainDash">
        <div className="product_name">
          <h1>Order Product</h1>
          <DateTime></DateTime>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {setCartItems}
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab disableRipple label="Chips" {...a11yProps(0)} />
                <Tab disableRipple label="Cookies" {...a11yProps(1)} />
                <Tab disableRipple label="Chocolate" {...a11yProps(2)} />
                <Tab disableRipple label="Ice Cream" {...a11yProps(3)} />
                <Tab disableRipple label="Noodle" {...a11yProps(4)} />
                <ColorIconButton onClick={()=> navigate('/cart')}>
                  <IconButton aria-label="cart" size="large" >
                    <StyledBadge badgeContent={cartItems.length} color="info">
                      <UilShoppingBag className="svg_icons" />
                    </StyledBadge>
                  </IconButton>
                </ColorIconButton>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="Content">
                  <div className="Cards ">
                    {productData.filter((i) => i.category === "chips").slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                      return (
                        <div className="parentContainer" key={row}>
                          <Tag
                            _id={row._id}
                            product_name={row.product_name}
                            brand={row.brand}
                            image={row.image}
                            item_price={row.item_price}
                            stock={row.stock+" in Stock"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={productData.filter((i) => i.category === "chips").length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="Content">
                  <div className="Cards ">
                    {productData.filter((i) => i.category === "cookies").slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                      return (
                        <div className="parentContainer" key={row}>
                          <Tag
                            _id={row._id}
                            product_name={row.product_name}
                            brand={row.brand}
                            image={row.image}
                            item_price={row.item_price}
                            stock={row.stock+" in Stock"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={productData.filter((i) => i.category === "cookies").length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="Content">
                  <div className="Cards ">
                    {productData.filter((i) => i.category === "chocolate").slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                      return (
                        <div className="parentContainer" key={row}>
                          <Tag
                            _id={row._id}
                            product_name={row.product_name}
                            brand={row.brand}
                            image={row.image}
                            item_price={row.item_price}
                            stock={row.stock+" in Stock"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={productData.filter((i) => i.category === "chocolate").length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="Content">
                  <div className="Cards ">
                    {productData.filter((i) => i.category === "ice cream").slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                      return (
                        <div className="parentContainer" key={row}>
                          <Tag
                            _id={row._id}
                            product_name={row.product_name}
                            brand={row.brand}
                            image={row.image}
                            item_price={row.item_price}
                            stock={row.stock+" in Stock"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={productData.filter((i) => i.category === "ice cream").length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={4}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="Content">
                  <div className="Cards ">
                    {productData.filter((i) => i.category === "noodle").slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                      return (
                        <div className="parentContainer" key={row}>
                          <Tag
                            _id={row._id}
                            product_name={row.product_name}
                            brand={row.brand}
                            image={row.image}
                            item_price={row.item_price}
                            stock={row.stock+" in Stock"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={productData.filter((i) => i.category === "noodle").length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </TabPanel>
          </Box>
        </div>            
      </div>
  </LayoutApp>
  </div>  
  )

}

export default Order

