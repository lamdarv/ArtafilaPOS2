import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../../component/Layout'
import TableBills from './table/Table';
import './Customer.css'
import '../../../src/App.css'
import DateTime from '../../utils/Days';

const Customers = () => {

    return (
      <div className="customerPage">
        <LayoutApp>
          <div className="MainDash">
            <div className="title">
              <h1>Customer Management</h1>
              <DateTime></DateTime>
            </div>
            <TableBills />
          </div>
      </LayoutApp>
      </div>
    )
  }


export default Customers