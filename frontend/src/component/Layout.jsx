import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    UilChartPieAlt,
    UilShoppingCart,
    UilPricetagAlt,
    UilUsersAlt,
    UilUsdSquare,
    UilCommentAltHeart,
    UilUserSquare,
    UilSignOutAlt
} from "@iconscout/react-unicons"
import { Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../component/layout.css';
import '../App.css';

const { Content} = Layout;

const LayoutApp = ({children}) => {

    const navigate = useNavigate();

    return (
        <div className="App">
            <div className="AppGlass">
                <div className="Sidebar">
                    <Layout>                   

                        {/* logo */}
                        <div className="logo">
                            <div>
                                Ar<span>Ta</span><br /><span>Fi</span>La
                            </div>
                        </div>

                        {/* menu */}
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
                            <div class="gapTop dash "> </div>
                            <Menu.Item key='/home' icon={<UilChartPieAlt />} className="dashIcon">
                                <Link to="/home"></Link>
                            </Menu.Item>
                            <div class="gapBottom dash"> </div>
                            <div class="gapTop order"> </div>
                            <Menu.Item key='/order' icon={<UilShoppingCart />}>
                                <Link to="/order"></Link>
                            </Menu.Item>
                            <div class="gapBottom order"> </div>
                            <div class="gapTop prod"> </div>
                            <Menu.Item key="/products" icon={<UilPricetagAlt />}>
                                <Link to="/products"></Link>
                            </Menu.Item>
                            <div class="gapBottom prod"> </div>
                            <div class="gapTop cust"> </div>
                            <Menu.Item key='/customers' icon={<UilUsersAlt />}>
                                <Link to="/customers"></Link>
                            </Menu.Item>
                            <div class="gapBottom cust"> </div>
                            <div class="gapTop"> </div>
                            <Menu.Item key='/' icon={<UilSignOutAlt />} onClick={() => {localStorage.removeItem("auth"); localStorage.removeItem("cartItems"); navigate("/");}}>
                                <Link to="/"></Link>
                            </Menu.Item>
                        </Menu>
                        </Layout>
                </div>
                <Content
                    className="site-layout-background"
                    style={
                            {
                                margin: '24px 24px 24px 24px'
                            }
                        }
                    >
                    {children}
                </Content>
                
            </div>
        </div>
    );
};
    
export default LayoutApp;
