import { Layout,theme  } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const { Content } = Layout;
const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: "62px 16px 25px" }}>
            <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
