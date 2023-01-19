import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../component/Layout'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import Table from "@mui/material/Table";
import FormControl from '@mui/material/FormControl';
import TableBody from "@mui/material/TableBody";
import Select from '@mui/material/Select';
import TableCell from "@mui/material/TableCell";
import StarIcon from '@mui/icons-material/Star';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from "@mui/material/TableContainer";
import InputLabel from '@mui/material/InputLabel';
import TableHead from "@mui/material/TableHead";
import TextField from '@mui/material/TextField';
import TableRow from "@mui/material/TableRow";
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import FormItem from 'antd/lib/form/FormItem';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import "./Cart.css";
import axios from 'axios';
import DateTime from '../../../utils/Days';

const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState();
    const [rating, setRating] = useState();
    const [discount, setDiscount] = useState(0);
    const [member, setMember] = useState();
    const [billPopUp, setBillPopUp] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector(state => state.rootReducer);

    const handlerIncrement = (record) => {
      
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity + 1}
        });
        console.log(record)
    };

    const handlerDecrement = (record) => {
      
        if(record.quantity !== 1){
            dispatch({
                type: "UPDATE_CART",
                payload: {...record, quantity: record.quantity - 1}
            });
            console.log(record)
        }
        console.log(record)
    };

    const handlerDelete = (record) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        });
    }

    const handlerDeleteAll = (record) => {
      while (record.length > 0) {
        record.pop();
      }
   }

    useEffect(() => {

        let temp = 0;
        cartItems.forEach((product) => (temp = temp + product.item_price * product.quantity));
        setSubTotal(temp);

    }, [cartItems]);

    useEffect(() => {

      let temp = 0;
      if(member == null){
        temp = 0
        setDiscount(temp)
      } else if (member != null){
        temp = 15
        setDiscount(temp)
      }
      
  });

    const handleSubmit = async () => {
        console.log(member)
        console.log(discount)
        try {
            const newObject = {
                cartItems,
                subTotal,
                discount: Number(subTotal / 100) * (Number(discount)),
                rating: rating,
                paymentMethod: paymentMethod,
                tax: Number(((subTotal / 100) * 10).toFixed(2)),
                totalAmount: Number((Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)),
            }
            setDiscount(0)
            setMember(null)
            await axios.post("artafila-pos.herokuapp/api/transaction/add", newObject);
            message.success("Bill Generated!");
            handlerDeleteAll(cartItems)
            setDiscount(0)
            setMember(null)
            navigate("/order");
        } catch(error) {
            message.error("Error!")
            console.log(error);
        }
      }

    const priceSplitter = (number) => (number && "Rp " + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  return (
    <div className="cartPage">
    <Layout>
    <div className="MainDash">    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <div className="order">
        <TableContainer className="head">
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="custH" align="left">Item</TableCell>
                <TableCell className="numbH" align="left">Qty</TableCell>
                <TableCell className="taxH" align="left">Action</TableCell>
                <TableCell className="totalH" align="left">Total Price</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <div className="Content">
        <TableContainer className="body">
            <Table>
              <TableBody>
                {cartItems.map((row) => {
                  return (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell className="custB" component="th" scope="row">
                            <div className="CompactCard">
                                <div className="productsImage"> <img src={row.image} /> </div>
                                <div className="productsDetail">
                                    <span>{row.product_name}</span>
                                    <span>{priceSplitter(row.item_price)}</span>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="numbB" align="left">
                            <div className="minplus">
                                <MinusCircleOutlined className='cart-minus' onClick={() => handlerDecrement(row)}/>
                                    <strong className='cart-quantity'>{row.quantity}</strong>
                                <PlusCircleOutlined className='cart-plus' onClick={() => handlerIncrement(row)} />
                            </div>
                        </TableCell>
                        <TableCell className="taxB" align="left">
                            <DeleteOutlined className='cart-action' onClick={() => handlerDelete(row)} />
                        </TableCell>
                        <TableCell className="totalB" align="right">{priceSplitter(row.item_price * row.quantity)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        </div>
        <div className="payment">
            <TableContainer className="head">    
                <TableHead>
                    <TableCell className="titleTable" align="left" >Payment</TableCell>
                </TableHead>
            </TableContainer>
            <div className="paymentContent">
            <div>
            <form>
                    <TextField
                        name="member"
                        id="outlined-helperText"
                        defaultValue={null}
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                        label="Member ID"
                        fullWidth
                        size="small"
                        autoComplete='off'
                    />
                      <FormControl fullWidth className="select">
                        <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                        <Select
                          sx={{my:2}}
                          name="paymentMethod"
                          labelId="demo-simple-select-label"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          id="demo-simple-select"
                          label="Payment Method"
                          size="small"
                        >
                          <MenuItem value={"cash"}>Cash</MenuItem>
                          <MenuItem value={"shopeepay"}>ShopeePay</MenuItem>
                          <MenuItem value={"dana"}>Dana</MenuItem>
                          <MenuItem value={"gopay"}>GoPay</MenuItem>
                          <MenuItem value={"qris"}>Scan QRIS</MenuItem>
                          <MenuItem value={"card"}>Card</MenuItem>
                        </Select>
                      </FormControl>
                      <TableContainer className="head rate">    
                          <TableHead>
                              <TableCell className="titleTable" align="left" >Rate Us</TableCell>
                          </TableHead>
                      </TableContainer>
                      <div className="rating"> 
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                        onChange={(rating, newRating) => {
                          setRating(newRating);
                        }}
                      />
                      </div>
                      
                  </form>
                </div>
                <div></div>
                <div className="total">
                  <div>
                    <span>Sub Total :</span><br />
                    <span>Tax :</span><br />
                    <span>Discount :</span>
                    <h3>Total :</h3>
                  </div>
                  <div>
                    <span>{priceSplitter(subTotal)}</span><br />
                    <span>{priceSplitter((subTotal / 100) * 10)}</span><br />
                    <span>{priceSplitter(Number(subTotal / 100) * (Number(discount)))}</span><br />
                    <h3>{priceSplitter((Number(subTotal) + Number((subTotal / 100) * 10)) - (Number(subTotal / 100) * (Number(discount))))}</h3>
                  </div>
                
                </div>
                </div>
                <DialogActions>
                    <Button htmlType='submit' onClick={()=> navigate('/order')} >Cancel</Button>
                    <Button htmlType='submit'onClick={handleSubmit}>Submit</Button>
                </DialogActions>
              
        </div>
    </Paper>
      </div>
    </Layout>
    </div>
  )
}

export default Cart

