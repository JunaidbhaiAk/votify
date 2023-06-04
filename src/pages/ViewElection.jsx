import React, { useEffect } from "react";
import { Button, Card, Col, Divider, Row, Space, Table, Tag, theme, Typography } from "antd";
import { columns } from "../utils/constants";
import { BellOutlined } from "@ant-design/icons";
import { getAllElections } from "../utils/web3";
import useElections from "../hooks/useElections";
import ElectionCard from "../components/ElectionCard";
// import  from "antd/es/skeleton/Paragraph";
const { Text,Paragraph,Title } = Typography;
const ViewElection = () => {

  const [elections,isLoading] = useElections();

  console.log(elections,isLoading);
  const data = [
    {
      key:'1',
      symbol:<BellOutlined />,
      name:'Jhon',
      age:'35',
      party:'Congress',
      state:'Maharashtra'
    }
  ]
  
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        {elections.map((ele) => {
          const {timestamp} = ele;
          return (
            <Col span={6} key={timestamp.toString()}>
              <ElectionCard data={ele}/>
            </Col>
          )
        })}
      </Row>
    </div>
  );
};

export default ViewElection;
