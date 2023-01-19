import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from '@mui/material/Button';
import { UilFilePlus } from "@iconscout/react-unicons";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Dialog from '@mui/material/Dialog';
import Paper from "@mui/material/Paper";
import axios from 'axios';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import "./Table.css";

export default function StickyHeadTable() {
const dispatch = useDispatch();
const [membersData, setMembersData] = useState([]);
const [openAdd, setOpenAdd] = React.useState(false);
const [tempProduct, setTempProduct] = useState(false);
const [popModal, setPopModal] = useState(false);

const getAllMembers = async () => {
  try {
    dispatch({
      type: "SHOW_LOADING",
    });
    const {data} = await axios.get('https://artafila-pos.herokuapp.com/api/member/view');
    setMembersData(data);
    dispatch({
      type: "HIDE_LOADING",
    })
    console.log(data);

  } catch(error) {
    dispatch({
      type: "HIDE_LOADING",
    });
    console.log(error);
  }
};

useEffect(() => {
    getAllMembers();
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

  const handleChange = (e) => {
    setTempProduct({...tempProduct, [e.target.name]: e.target.value});
  }


  const handleSubmit = async () => {
    console.log(tempProduct);
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('https://artafila-pos.herokuapp.com/api/member/add', tempProduct);
        message.success("Member Added Successfully!")
        getAllMembers();
        setOpenAdd(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!")
        console.log(error);
      }
    
  }

return (
    <div className="Cust">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className="head">
          <Table aria-label="sticky table">
            <TableHead>
            <TableContainer>
              <Table aria-label="sticky table">
              <Button disableRipple size="small" startIcon={<UilFilePlus/>} onClick={()=> {setOpenAdd(true); setTempProduct(false);}}>
                  Add Member
              </Button>
              </Table>
            </TableContainer>
              <TableRow>
                <TableCell className="custId" align="left">Customer Name</TableCell>
                <TableCell className="custN" align="left">Email</TableCell>
                <TableCell className="contN" align="left">Contac Number</TableCell>
                <TableCell className="custAd" align="left">Customer Address</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <div className="Content">
        <TableContainer className="body">
            <Table>
              <TableBody>
                {membersData
                .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row) => {
                  return (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell className="custIdB" component="th" scope="row">{row.member_name}</TableCell>
                      <TableCell className="custNB" align="left">{row.email}</TableCell>
                      <TableCell className="contNB" align="left">{row.phone_number}</TableCell>
                      <TableCell className="custAdB" align="left">{row.address}</TableCell>
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
          count={membersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0,0,0,0.5)' }}} open={openAdd} onClose={() => {setOpenAdd(false)}}>
        <DialogTitle>
          Add Member
        </DialogTitle>
          <DialogContent>
            <form>
            <TextField
              sx={{my:2}}
              name="member_name"
              value={tempProduct.member_name}
              id="outlined-helperText"
              label="Member Name"
              onChange={handleChange}
              fullWidth
              size="small"
              autoComplete='off'
            />
            <TextField
              sx={{my:2}}
              name="email"
              value={tempProduct.email}
              id="outlined-helperText"
              label="Email"
              onChange={handleChange}
              fullWidth
              size="small"
              autoComplete='off'
            />
              <TextField
                sx={{my:2}}
                name="phone_number"
                value={tempProduct.phone_number}
                id="outlined-helperText"
                label="Phone Number"
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete='off'
              />
              <TextField
                sx={{my:2}}
                name="address"
                value={tempProduct.address}
                id="outlined-helperText"
                label="Addres"
                onChange={handleChange}
                fullWidth
                size="small"
                autoComplete='off'
              />
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {setOpenAdd(false)}}>Cancel</Button>
            <Button htmlType='submit' onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
    </div>
);

}