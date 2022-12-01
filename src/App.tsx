import Icon, { CalendarFilled, ClockCircleFilled } from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout";
import React, { ChangeEvent, useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const { Title } = Typography;
  const EarthSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <path
        fill="rgba(0, 0, 0, 0.45)"
        d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2ZM4 16a11.915 11.915 0 0 1 .7-4H10l5 4l-2.8 3.693A1 1 0 0 0 12.293 21L15 24v3.95A12.01 12.01 0 0 1 4 16Zm17.435 10.685l2.546-7.7a1 1 0 0 0-.367-.985L15 11l2-2h5.28a1 1 0 0 0 .948-.684l.495-1.486a11.974 11.974 0 0 1-2.288 19.855Z"
      />
    </svg>
  );
  const EarthIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={EarthSvg} {...props} />
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
  });
  const onFinish = () => {
    if (
      formData.name &&
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email)
    ) {
      Modal.success({
        title: "Success",
        content: (
            <>
               Name: {formData.name}.<br />
               Email: {formData.email}.<br />
               Description: {formData.description}.
            </>
        ),
      });
    } else {
      if (!formData.name) {
        errorMsg.name = "Name is required";
      } else if (!formData.email) {
        errorMsg.email = "Email is required";
      } else {
        errorMsg.email = "Please enter valid email";
      }
      Modal.error({
        title: "Error",
        content: errorMsg.name !== "" ? errorMsg.name : errorMsg.email,
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.value) {
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: "",
      });
    }
  };

  return (
    <Layout className="layout">
      <Content className="app-container">
        <Card style={{ boxShadow: "-5px 5px 5px grey" }}>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Title type="secondary" level={4}>
                Gaurav Garg
              </Title>
              <Title level={2} style={{ marginTop: "5px" }}>
                15 Minute Meeting
              </Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 10,
                  marginTop: "20px",
                }}
              >
                <ClockCircleFilled style={{ color: "rgba(0,0,0,.45)" }} />
                <Title type="secondary" level={5} style={{ margin: 0 }}>
                  15 mins
                </Title>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <CalendarFilled style={{ color: "rgba(0,0,0,.45)" }} />
                <Title type="secondary" level={5} style={{ margin: 0 }}>
                  9:30am - 9:45am, Friday, September 16, 2022
                </Title>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 10,
                }}
              >
                <EarthIcon style={{ color: "rgba(0,0,0,.45)" }} />
                <Title type="secondary" level={5} style={{ margin: 0 }}>
                  Indian Standard Time
                </Title>
              </div>
            </Col>
            <Col xs={24} lg={16}>
              <Title level={3}>Enter Details</Title>
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ lg: 12 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item label="Name" htmlFor="name" required={true}>
                  <Input name="name" onChange={handleChange} />
                </Form.Item>
                <Form.Item htmlFor="email" label="Email" required={true}>
                  <Input name="email" onChange={handleChange} />
                  <Button
                    type="primary"
                    htmlType="button"
                    shape="round"
                    ghost
                    style={{ marginTop: "10px" }}
                  >
                    Add Guests
                  </Button>
                </Form.Item>
                <Form.Item label="Please share anything that will help prepare for our meeting.">
                  <TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 12 }}>
                  <Button type="primary" htmlType="submit" shape="round">
                    Schedule Event
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default App;
