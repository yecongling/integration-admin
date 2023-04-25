import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useNavigate} from "umi";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import "./login.less";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const submit = ()=> {
    navigate("/home");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 左边图案和标题 */}
        <div className="login-left">

        </div>
        {/* 右边登陆表单 */}
        <div className="login-form">
          <div className="login-title">
            登陆标题
          </div>
          <div className="form">
            <Form
              onFinish={submit}
            >
              <Form.Item name="username" rules={[{required: true, message: "请输入用户名"}]}>
                <Input autoFocus placeholder="用户名：admin" prefix={<UserOutlined/>}/>
              </Form.Item>
              <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
                <Input.Password autoComplete="new-password" placeholder="密码：123456"
                                prefix={<LockOutlined/>}/>
              </Form.Item>
              {/* 记住密码 */}
              <Form.Item name="remeber" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
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