import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (value) => {
    console.log(value);
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.post('/api/profile/login', value);
      dispatch({
        type: "HIDE_LOADING",
      });
      // dispatch({type: 'USER_SIGNIN', payload: res.data});
      message.success("User Login Successfully!");
      localStorage.setItem('auth', JSON.stringify(data));
      navigate("/home");
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/home");
    }
    
  }, [navigate]);

  return (
    <div className='form'>
        <h2>ARTAFILA POS</h2>
        <p>Login</p>
        <div className="form-group">
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="email" label="Email">
              <Input/>
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password"/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Login</Button>
              <Link className='form-other' to="/register" onClick={()=> navigate('/register')}>Register Here!</Link>
            </div>
          </Form>
        </div>
    </div>
  )
}

// onClick={()=> navigate('/home')}
export default Login
