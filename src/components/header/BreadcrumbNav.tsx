import React from "react";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";

const BreadcrumbNav: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[
        {
          title: '导航条',
        },
        {
          key: 'home',
          title: <Link to="/home">首页</Link>,
        }
      ]} style={{
        marginLeft: '24px'
      }}>
      </Breadcrumb>
    </>
  )
}
export default BreadcrumbNav;