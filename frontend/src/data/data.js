import {
  UilChartPieAlt,
  UilShoppingCart,
  UilPricetagAlt,
  UilUsersAlt,
  UilUsdSquare,
  UilEnvelopeStar,
  UilUserSquare
} from "@iconscout/react-unicons"
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// Sidebar Data



export const SidebarData = [
    {
      icon: UilChartPieAlt
    },
    {
      icon: UilShoppingCart
    },
    {
      icon: UilPricetagAlt
    },
    {
      icon: UilUsersAlt
    }
];

export const cardsData = [
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(rgb(31, 29, 43) -99.42%, rgb(31, 29, 43) -46.42%)"
    },
    value: "250,000",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Customer",
    color: {
      backGround: "rgb(31, 29, 43)",
    },
    barValue: 80,
    value: "270",
    png: UilUserSquare,
    series: [
      {
        name: "Customer",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Rating",
    color: {
      backGround: "rgb(31, 29, 43)",
    },
    barValue: 78,
    value: "8.9",
    png:   UilEnvelopeStar,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
