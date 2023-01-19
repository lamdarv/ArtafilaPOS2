import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 }
    })
  }

    const { Meta } = Card;

  return (
    <Card
        hoverable
        style={{ width: 240, marginBottom: 30, backgroundColor: '#2e2c3b', borderRadius: 20, boxShadow: "5px 8px 24px 5px rgba(0, 0, 0, 0.6)"}}
        cover={<img alt={product.product_name} src={product.image} style={{height: 200}} />}
    >
        <Meta title={product.product_name} description={`$${product.item_price}`} />
        <div className="product-btn">
          <Button onClick={() => handlerToCart()}>Add To Cart</Button>
        </div>
    </Card>
  )
}

export default Product