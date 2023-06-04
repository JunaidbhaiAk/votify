import React from 'react'
import { Card, Typography } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const {Title,Text} = Typography
const Dashboard = () => {
  const {user} = useContext(AuthContext)
  return (
    <Card bordered style={{width:'500px'}}>
      <Title level={8} style={{textAlign:'center'}}>Welcome To Votify Panel</Title>
      <Text code style={{textAlign:'center'}}>{user?.address}</Text>
    </Card>
  )
}

export default Dashboard