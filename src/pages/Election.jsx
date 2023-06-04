import React, { useState } from "react";
import { Button, Card, Divider, Form, Input, Space, Tag, theme, Typography,Modal, InputNumber } from "antd";
import { useEffect } from "react";
import { declareWinner, getCandidatesForElection, getElectionData, isOwner, startElection, stopElection, vote } from "../utils/web3";
import Confetti from 'react-dom-confetti';
import { useParams } from "react-router-dom";
import {CrownFilled} from '@ant-design/icons'
// import './CardWithGradientBorder.css'
import { confConfig } from "../utils/constants";
import { convertDate } from "../utils/helpers";
const { Text, Title } = Typography;
const Election = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  let {id} = useParams();
  const [candidates,setCandidates] = useState([]);
  const [selected,setSelected] = useState('Select Candidate');
  const [isAdmin,setisAdmin] = useState(false);
  const [conf,setConf] = useState(false);
  const [currE,setcurrE] = useState({});
  const [ref,setRef] = useState(false);
  useEffect(() => {
    (async() => {
      const data = await getCandidatesForElection(id);
      const edata = await getElectionData(id);
      const res = await isOwner();
      setisAdmin(res); 
      console.log(edata);
      setcurrE(edata);
      if(data){
        const combinedData = data[0].map((ele,idx) => ({
          name:ele,
          img:data[1][idx]
        }))
        setCandidates(combinedData);
      }
    })();
  },[ref])
  const onFinish = async(data) => {
    if(selected !== 'Select Candidate'){
      const obj = {id,selected,...data};
      const res = await vote(obj);
      console.log(res);
    }
    else return;
  }

  const syncEle = async (state) => {
    if(state) await startElection(id);
    else await stopElection(id);
    setRef(!ref);
  } 

  const handleClick = (cname) => setSelected(cname);

  const handleWinner = async() => {
    const winner = await declareWinner(id);
    Modal.success({
      content: <h1>🎉 Winner Is {winner} 🎉</h1>,
    });
    setConf(true);
    setRef(!ref);
  }
 
  return (
    <div style={{ padding: 12, background: "#f5f5f5", height: "100vh" }}>
      <Confetti active={ conf } config={confConfig}/>
      <div style={{ padding: 24, background: "#fff",boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
        <Title>{id}</Title>
        <Divider />
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <p>
            Election Date: <Text strong>{convertDate(currE.timestamp)}</Text>
          </p>
          <p>
            Role: <Text strong>{currE.role}</Text>
          </p>
          <p>
            Status: <Tag color={currE.isActive ? "success" : 'error'}>{currE.isActive ? 'Active' : 'Not Active'}</Tag>
          </p>
          {isAdmin && currE.winner === '' &&  currE.status === 2 && <Button type="primary" size="small" icon={<CrownFilled />} onClick={handleWinner}> Declare Winner </Button>}
          {isAdmin && currE.status === 1 && <Button type="primary" size="small" danger onClick={() => syncEle(false)}>Stop Election</Button>}
          {isAdmin && currE.status === 0 && <Button type="primary" size="small" onClick={() => syncEle(true)}>Start Election</Button> }
        </Space>
        <Divider orientation="left">Participents</Divider>
        {currE.isActive && <Space
          wrap={true}
          align="center"
          style={{ justifyContent: "space-around", gap: "15px",marginBottom:'12px' }}
        >
          {candidates.map((ele,idx) => {
            return (
            <Card
              style={{ width: "200px",boxShadow: selected === ele.name ? 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
              hoverable
              onClick={() => handleClick(ele.name)}
              cover={
                <img
                  alt="example"
                  src={ele.img}
                />
              }
              key={ele.name}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                {ele.name}
              </Title>
            </Card>)
          })}
        </Space>}
        {currE.winner !== '' && <Title level={2} style={{textAlign:'center'}}>Winner Is {currE.winner}</Title>}
        {currE.status === 0 && <Title level={2} style={{textAlign:'center'}}>Wait for Election To Start</Title>}
        {currE.isActive && <Form form={form} name="basic" onFinish={onFinish} layout='vertical' autoComplete="off"
        style={{
          width: '100%',
          marginTop: "25px",
        }}>
        <Space.Compact style={{width:'100%',justifyContent:"center"}}>
          <Form.Item name='aid' style={{width:'30%'}}
            rules={[
              {
                required: true,
                message: `Please enter Aadhar ID`,
              },
              { min: 12,max:12, message: 'AadharId must be 12 characters.'} 
            ]}
            >
            <InputNumber placeholder="Enter Aadhar Id" size="large" addonBefore={selected}/>
          </Form.Item>
          <Button type="primary" size="large" style={{width:'200px'}} htmlType="submit">
              Vote
          </Button>
        </Space.Compact>
        </Form>}
      </div>
    </div>
  );
};

export default Election;
