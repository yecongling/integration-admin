import React from "react";
import {Breadcrumb} from "antd";

const BreadcrumbNav: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[
        {
          title: 'Location',
        },
        {
          href: '/home',
          title: '首页',
        },
        {
          href: '',
          title: 'Application List',
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