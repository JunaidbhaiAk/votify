import { Form,Space,theme,Input,Button, DatePicker } from 'antd';
import Title from "antd/es/typography/Title";
import React from 'react'
import { createElection } from '../utils/web3';

const ElectionReg = () => {
  const [form] = Form.useForm();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    // console.log(values)
    createElection(values).then(data => console.log(data))
    form.resetFields();
  };
  return (
    <div style={{padding: 24,background: colorBgContainer,width:'fit-content',margin:'auto'}}>
      <Title level={2}>Election Registration Form</Title>
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
        <Form.Item label='Name' name='name'
          rules={[
            {
              required: true,
              message: `Please enter Election Name`,
            },
          ]}
          >
          <Input />
        </Form.Item>
        <Form.Item label='Election Role' name='role'
          rules={[
            {
              required: true,
              message: `Please enter Role`,
            },
          ]}
          >
          <Input />
        </Form.Item>
        {/* <Form.Item label='Date Of Election' name='doe'
          rules={[
            {
              required: true,
              message: `Please Election Date`,
            },
          ]}
          >
          <DatePicker style={{width:'100%'}}/>
        </Form.Item>
        <Space.Compact align="center" block>
        <Form.Item label="City" name='city' style={{width:'50%'}}
        rules={[
            {
              required: true,
              message: `Please Enter City`,
            },
          ]}
        >
          <Input />
        </Form.Item>
          <Form.Item label='State' name='state' style={{width:'50%'}}
          rules={[
            {
              required: true,
              message: `Please Enter State`,
            },
          ]}
          >
          <Input />
        </Form.Item> */}
        {/* </Space.Compact> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ElectionReg