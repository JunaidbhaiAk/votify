import { Button } from 'antd'
import { Typography } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
import './homepage.css'

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{width:'1000px'}} className='land_img'>
        <img src='flatpng.png' alt='one' style={{width:'100%'}} />
      </div>
      <div className='land_info'>
        <Title strong style={{fontSize:'4rem',textTransform:'uppercase',color:'#fff'}}>Vote online with confidence.</Title>
        <Title style={{fontSize:'1.5rem',width:'600px',color:'#fff'}}>E-voting with blockchain is the most secure and transparent way to vote.</Title>
        <Button type='primary' shape="round" style={{backgroundColor:'#045DE9',marginTop:'1.5rem',width:'300px'}} size='large' onClick={() => navigate('/voting')}>Start Voting</Button>
      </div>
    </div>
  )
}

export default Homepage