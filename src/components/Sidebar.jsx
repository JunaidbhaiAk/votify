import React from 'react'
import { Layout, Menu } from 'antd';
import { getItem } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { items } from '../utils/constants';
const { Sider } = Layout;
const Sidebar = () => {
  const navigate = useNavigate();
 
  const handleClick = (data) => {
    navigate(data.key)
  }
  return (
    <Sider width={250}>
        <div className="logo" />
        <Menu
          onClick={handleClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          style={{marginTop:'62px'}}
          items={items}
        />
    </Sider>
  )
}

export default Sidebar