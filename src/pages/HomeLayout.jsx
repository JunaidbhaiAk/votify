import { Layout,Menu,Image, Button } from 'antd'
import { Typography } from 'antd';
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { connectWallet, isOwner } from '../utils/web3';
const { Header, Content } = Layout;
const { Title } = Typography;

const HomeLayout = () => {
  
  const navigate = useNavigate();
  const handleClick = (data) => {
    navigate(data.key);
  }
  return (
    <Layout style={{background:'linear-gradient(180deg, rgba(0,210,255,1) 0%, rgba(3,130,240,1) 77%, rgba(4,93,233,1) 100%)',height:'100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center',background:'none',justifyContent:'space-between' }}>
        <div>
          <img src='V.png' alt='clogo' style={{marginTop:'12px'}}/>
        </div>
        <Menu
          mode="horizontal"
          style={{background:'none',color:'#fff',width:'200px'}}
          defaultSelectedKeys={['/']}
          items={[{label:'Home',key:'/'},{label:'Vote',key:'/voting'},{label:'Admin',key:'/login'}]}
          onClick={handleClick}
        />
      </Header>
      <Content style={{ padding: '20px' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default HomeLayout