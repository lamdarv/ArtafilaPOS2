import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useReactToPrint } from 'react-to-print';
import Paper from "@mui/material/Paper";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Button, Modal} from 'antd';
import { useDispatch } from 'react-redux';
import "./Table.css";
import { EyeOutlined } from '@ant-design/icons';

export default function StickyHeadTable() {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [transData, setTransData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getAllTrans = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('https://artafila-pos.herokuapp.com/api/transaction/view');
      setTransData(data);
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
    getAllTrans();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const priceSplitter = (number) => (number && "Rp " + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

  return (
    <div className="Table">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className="head">
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="titleTable" align="left" colSpan={6}>Recent Transaction</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="custH" align="left">Time</TableCell>
                <TableCell className="numbH" align="left">SubTotal</TableCell>
                <TableCell className="totalH" align="left">Total</TableCell>
                <TableCell className="taxH" align="left">Payment</TableCell>
                <TableCell className="amtbH" align="left">Rating</TableCell>
                <TableCell className="card-editH" align="left">Action</TableCell>

              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <div className="Content">
        <TableContainer className="body">
            <Table>
              <TableBody>
                {transData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                  return (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell className="custB" component="th" scope="row">{formatDate(row.createdAt)}</TableCell>
                      <TableCell className="numbB" align="left">{priceSplitter(row.subTotal)}</TableCell>
                      <TableCell className="totalB" align="left">{priceSplitter(row.totalAmount)}</TableCell>
                      <TableCell className="taxB" align="left">{row.paymentMethod}</TableCell>
                      <TableCell className="amtbB" align="left">{row.rating } &#9733;</TableCell>
                      <TableCell className="card-editB" align="left">
                        <div>
                          <EyeOutlined className='cart-edit eye' onClick={() => {setSelectedTrans(row); setPopModal(true);}} />
                        </div>
                      </TableCell>                      
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

{
        popModal && 
        <Modal title="Invoice Details" width={400} pagination={false} visible={popModal} onCancel={() => setPopModal(false)} footer={false}>
          <div className="card" ref={componentRef}>
            <div className="cardHeader">
                <h2 className="logoStruk">ARTAFILA POS</h2>
            </div>
            <div className="cardBody">
                <div className="group">
                    <span>Date Order:</span>
                    <span><b>{selectedTrans.createdAt.toString().substring(0, 10)}</b></span>
                </div>
                <div className="group">
                    <span>Total Amount:</span>
                    <span><b>{priceSplitter(selectedTrans.totalAmount)}</b></span>
                </div>
            </div>
            <div className="cardFooter">
                <h4>Your Order</h4>
                {selectedTrans.cartItems.map((product) => (
                    <>
                        <div className="footerCard">
                            <div className="group">
                                <span>Product:</span>
                                <span><b>{product.product_name}</b></span>
                            </div>
                            <div className="group">
                                <span>Qty:</span>
                                <span><b>{product.quantity}</b></span>
                            </div>
                            <div className="group">
                                <span>Price:</span>
                                <span><b>{priceSplitter(product.item_price)}</b></span>
                            </div>
                        </div>
                    </>
                ))}
                <div className="footerCardTotal">
                    <div className="group">
                        <h3>Discount:</h3>
                        <h3>Total:</h3>
                        
                    </div>
                    <div className="duit">
                        <h3><b>{priceSplitter(selectedTrans.discount)}</b></h3>
                        <h3><b>{priceSplitter(selectedTrans.totalAmount)}</b></h3>
                    </div>
                </div>
            </div>
          </div>
          <div className="bills-btn-add">
            <Button onClick={handlePrint} htmlType='submit' className='add-new-invoice'>Generate Invoice</Button>
        </div>  
        </Modal>
      }
      </Paper>
    </div>
  );
}