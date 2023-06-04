import { getItem } from "./helpers";
import {
  UserAddOutlined,
  DashboardOutlined,
  TeamOutlined,
  NotificationFilled,
  FlagFilled
} from "@ant-design/icons";


export const columns = [
  {
    key:'symbol',
    dataIndex:'symbol',
    title:'Symbol',
  },
  {
    key:'name',
    dataIndex:'name',
    title:'Name',
  },
  {
    key:'age',
    dataIndex:'age',
    title:'Age',
  },
  {
    key:'party',
    dataIndex:'party',
    title:'Party',
  },
  {
    key:'state',
    dataIndex:'state',
    title:'State',
  }
]

export const constantFields = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Election Name",
    name: "ename",
  },
  {
    label: "Election Symbol Link",
    name: "esl",
  },
  {
    label: "Public Address",
    name: "caddress",
  },
];

export const items = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  getItem("Register Candidate", "/regCandidate", <UserAddOutlined />),
  getItem("Elections", null, <TeamOutlined />, [
    getItem("Register Elections", "/regElection",<FlagFilled />),
    getItem("View Elections", "/viewElection",<NotificationFilled />),
  ]),
];


export const confConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: "100",
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "900px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};