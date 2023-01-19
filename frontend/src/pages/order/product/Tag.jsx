import React from 'react'
import { useDispatch } from 'react-redux';
import './Tag.css'
import Meta from 'antd/lib/card/Meta';

export default function Tag(props) {
    let { product_name, item_price, image, stock , brand, _id} = props

    const dispatch = useDispatch();
    const handlerToCart = () => {
        console.log(props)
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...props, quantity: 1 }
        })
      }

    const priceSplitter = (number) => (number && "Rp " + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

    return (
        <div className="card">
            <div className="wrapper">
                <div className="cardInfo">
                    {/* {_id} */}
                    <h1>{product_name}</h1>
                    <div className="priceGroup">
                            <p className="price">{priceSplitter(item_price)}</p>
                    </div>
                    <p className="stock">{stock}</p>
                    <div className="action" onClick={() => handlerToCart()}>
                        <div className="cart">
                            <p>Add to cart</p>
                        </div>
                    </div>
                </div>
                <div className="card_img" > <img src={image} /></div>
            </div>
        </div>
    )
}