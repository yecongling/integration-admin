import { ProCard } from "@ant-design/pro-components";
import { Switch } from "antd";
import React from "react";

/**
 * 
 * @returns 项目设计
 */
const Design: React.FC = () => {
    return (
        <ProCard style={{maxWidth: 300}} boxShadow title="项目维护模块" extra={<Switch/>}>项目设计(计划做成卡片形式)</ProCard>
    )
}
export default Design