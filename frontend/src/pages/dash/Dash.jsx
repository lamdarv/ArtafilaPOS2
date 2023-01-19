import React, {useState, useEffect, useRef} from 'react'
import LayoutApp from '../../component/Layout'
import axios from 'axios'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import Product from '../../component/Product';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import Cards from './cards/Cards';
import TransactionTable from './table/Table';
import './Dash.css'
import '../../../src/App.css'
import DateTime from '../../utils/Days';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric"}
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const Dash = ()=> {
  return (
    <div className="dashPage">
      <LayoutApp>
        <div className="MainDash">
          <div className="title">
            <h1>Dashboard</h1>
            <DateTime></DateTime>
          </div>
          <Cards />
          <TransactionTable />
        </div>
    </LayoutApp>
    </div>
  )
}

export default Dash

