import React from 'react'
import { Typography } from 'antd';
import ViewElection from './ViewElection'
const {Title} = Typography;

const Votes = () => {
  return (
    <div>
        <Title strong style={{color:"#fff",textAlign:'center'}}>All Elections</Title>
        <ViewElection />
    </div>
  )
}

export default Votes