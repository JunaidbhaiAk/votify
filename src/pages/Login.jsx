import { Button, Card } from 'antd';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { connectWallet, isOwner } from '../utils/web3';
// import { onConnect } from '../utils/web3';

const Login = () => {
  const {updateAuthUser,user} = useContext(AuthContext)
  useEffect(() => {
    (async () => {
      const address = await connectWallet();
      const isAdmin = await isOwner();
      updateAuthUser({address,isAdmin});
    })()
  },[])
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  }
  return (
    <div >
       <Card title={user?.address} bordered={true} style={{width: 500,margin:'400px auto'}}>
        {user?.isAdmin && <Button type='primary' block onClick={handleClick}>Login</Button>}
       </Card>
    </div>
  )
}

export default Login