import { AntDesignOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Space, theme,Avatar } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { constantFields } from "../utils/constants";
import { regCandidate } from "../utils/web3";

const CandidateReg = () => {
  const [form] = Form.useForm();
  const [symbol,setSybmol] = useState('');
  const esl = Form.useWatch('esl', form);

  useEffect(() => {
    setSybmol(esl);
  },[esl])
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = async(data) => {
    // console.log(data);
    const res = await regCandidate(data);
    form.resetFields();
  };
  return (
    <div style={{padding: 24,background: colorBgContainer,width:'fit-content',margin:'auto'}}>
      <Title level={2}>Candidate Registration Form</Title>
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        style={{
          maxWidth: 400,
          marginTop: "25px",
        }}
        layout='vertical'
        autoComplete="off"
      >
        <Space style={{justifyContent:'center',width:'100%',marginBottom:'15px'}}>
          <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 120 }} icon={<AntDesignOutlined />} src={symbol}/>
        </Space>
        {constantFields.map((ele,idx) => {
          return (
          <Form.Item label={ele.label} name={ele.name}
          rules={[
            {
              required: true,
              message: `Please input your ${ele.label}`,
            },
          ]}
          >
            <Input />
          </Form.Item>)
        })}
        <Space.Compact align="center" block>
        <Form.Item label="Date Of Birth" name='dob' 
        rules={[
            {
              required: true,
              message: `Select date of birth`,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
          <Form.Item label='Party Name' name='pname'
          rules={[
            {
              required: true,
              message: `Please input your Party Name`,
            },
          ]}
          style={{width:'65%',marginLeft:'4px'}}
          >
          <Input />
        </Form.Item>
        </Space.Compact>
        {/* <Space.Compact align="center" block>
        <Form.Item label="City" name='city' style={{width:'40%'}}
        rules={[
            {
              required: true,
              message: `Please Enter City`,
            },
          ]}
        >
          <Input />
        </Form.Item>
          <Form.Item label='State' name='state' style={{width:'40%'}}
          rules={[
            {
              required: true,
              message: `Please Enter State`,
            },
          ]}
          >
          <Input />
        </Form.Item>
        <Form.Item label='Pincode' name='pin' style={{width:'20%'}}
          rules={[
            {
              required: true,
              message: `Please Enter Pincode`,
            },
          ]}
          >
          <Input />
        </Form.Item>
        </Space.Compact> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CandidateReg;
