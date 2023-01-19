import React from "react";
import "./Cards.css";
import Card from "./Card";
import { cardsData } from "../../../data/data";
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Cards = () => {
  const dispatch = useDispatch();
  const [transData, setTransData] = useState([]);

  const getAllTrans = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/transaction/view');
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

  const average = transData.reduce((a,v)=> a=a+v.rating, 0)/transData.length
  return (
    
    <div className="Cards">
        <div className="parentContainer" >
          <Card
            title={cardsData[0].title}
            color={cardsData[0].color}
            revenue={transData.reduce((a,v)=> a=a+v.totalAmount, 0)}
            png={cardsData[0].png}
          />
        </div>
        <div className="parentContainer" >
          <Card
            title={cardsData[1].title}
            color={cardsData[0].color}
            count={transData.length}
            png={cardsData[1].png}
          />
          </div>
          <div className="parentContainer" >
            <Card
              title={cardsData[2].title}
              color={cardsData[0].color}
              rating={(average).toFixed(2)}
              png={cardsData[2].png}
            />
          </div>
    </div>
  );
};

export default Cards;