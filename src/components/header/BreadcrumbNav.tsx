import React from "react";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";

const BreadcrumbNav: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[
        {
          title: 'Location',
        },
        {
          key: 'home',
          title: <Link to="/home">首页</Link>,
        }
      ]} style={{
        marginLeft: '44px',
        position: 'absolute'
      }}>
      </Breadcrumb>
    </>
  )
}
export default BreadcrumbNav;