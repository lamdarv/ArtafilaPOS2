import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card
const priceSplitter = (number) => (number && "Rp " + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

const Card = (props) => {
  return (
    <CompactCard param={props} />
  )
   
};
// Compact Card
function CompactCard({ param }) {
  const Png = param.png;
  return (
    <div className="CompactCard">
      <div className="detail">
        <Png />
        <span>{priceSplitter(param.revenue)}{param.count}{param.rating}</span>   
        <span>{param.title} so far</span>
      </div>
      
    </div>
  );
}

export default Card;