import React from "react";
import {Button} from "antd";
import {useNavigate} from "umi";
const Login: React.FC = ()=> {
  const navigate = useNavigate();
  return (
    <>
      <div>登录界面</div>
      <Button onClick={()=>{navigate("/home")}}>跳往主页</Button>
    </>

  );
}
export default Login;