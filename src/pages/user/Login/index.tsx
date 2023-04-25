import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {useNavigate} from "umi";
import logo from "@/assets/images/logo.png";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import "./login.less";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate("/home");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 左边图案和标题 */}
        <div className="login-left">
          <div className="logo" style={{marginTop: "60px"}}>
            <img className="login-icon" width="70" src={logo} alt="logo"/>
          </div>
          <div className="title">
            <p style={{fontSize: "20px", margin: 0}}><span style={{
              fontFamily: "微软雅黑 Bold, 微软雅黑 Regular, 微软雅黑, sans-serif",
              fontWeight: 700
            }}>集成信息管理平台</span></p>
            <p style={{fontSize: "14px", margin: 0}}><span
              style={{fontFamily: "微软雅黑, sans-serif", fontWeight: 400, color: "#999999"}}>Integration System</span>
            </p>
          </div>
        </div>
        {/* 右边登陆表单 */}
        <div className="login-form">
          <div className="login-title">
            <p style={{fontSize: "20px", margin: 0}}><span style={{
              fontFamily: "微软雅黑 Bold, 微软雅黑 Regular, 微软雅黑, sans-serif",
              fontWeight: 700
            }}>用户登录</span></p>
          </div>
          <div className="form" style={{marginTop: "40px"}}>
            <Form
              onFinish={submit}
            >
              <Form.Item name="username" rules={[{required: true, message: "请输入用户名"}]}>
                <Input size="large" autoFocus placeholder="用户名：admin" prefix={<UserOutlined/>}/>
              </Form.Item>
              <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
                <Input.Password size="large" autoComplete="new-password" placeholder="密码：123456"
                                prefix={<LockOutlined/>}/>
              </Form.Item>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={18}>
                    <Form.Item
                      name="captcha"
                      noStyle
                      rules={[{required: true, message: '请输入验证码'}]}
                    >
                      <Input size="large" placeholder="输入右侧验证码" prefix={<LockOutlined />}/>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Button size="large" style={{width: "100%", backgroundColor: "#f0f0f0"}}>验证码</Button>
                  </Col>
                </Row>
              </Form.Item>
              {/* 记住密码 */}
              <Form.Item name="remeber" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button size="large" style={{width: "100%"}} type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Login;