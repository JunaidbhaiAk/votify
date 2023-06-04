import { Card, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Text, Paragraph } = Typography;
import React from "react";
import { convertDate } from "../utils/helpers";

const ElectionCard = ({data}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/ele/${data.name}`);

  return (
    <Card title={data.name} bordered={false} style={{ width: 300 }} hoverable onClick={handleClick}>
      <p>
        Election Started At: <Text strong>{convertDate(data.timestamp)}</Text>
      </p>
      <p>
        Role: <Text strong>{data.role}</Text>
      </p>
      <p>
        Created By: <Text strong>Admin</Text>
      </p>
      <Space align="center" style={{ width: "100%", justifyContent: "space-between",marginTop:'15px' }}>
        {data.isActive ? <Tag color="success">Active</Tag> : <Tag color="error">Not Active</Tag>}
      </Space>
    </Card>
  );
};

export default ElectionCard;
