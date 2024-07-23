import React from "react";
import { Avatar, Calendar, Card, Col, Row, Statistic } from "antd";
import "./index.less";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import BrokenLine from "@/components/chart/BrokenLine";

/**
 * 首页
 * @returns
 */
const Index: React.FC = () => {
  /**
   *  日历切换
   * @param value
   * @param mode
   */
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <>
      <Row style={{ marginBottom: "8px" }}>
        <Col span={24}>
          <Card bordered={false}>
            <Avatar size={64} icon={<UserOutlined />} />
            <h2>下午好，欢迎登录</h2>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginBottom: "8px" }}>
        <Col span={24}>
          <Card bordered={false}>下午好</Card>
        </Col>
      </Row>

      <Row gutter={8} style={{ marginBottom: "8px" }}>
        <Col span={7}>
          <Card bordered={false} style={{ height: "100%" }}>
            下午好
          </Card>
        </Col>
        <Col span={7}>
          <Row style={{ marginBottom: "8px", height: "calc(50% - 4px)" }}>
            <Col span={24}>
              <Card bordered={false} style={{ height: "100%" }}>
                下午好2
              </Card>
            </Col>
          </Row>
          <Row style={{ height: "calc(50% - 4px)" }}>
            <Col span={24}>
              <Card bordered={false} style={{ height: "100%" }}>
                下午好3
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Card bordered={false}>
            <BrokenLine />
          </Card>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={14}>
          <Card bordered={false} style={{ height: "100%" }}>
            下午好
          </Card>
        </Col>
        <Col span={10}>
          <Row gutter={8} style={{ marginBottom: "8px" }}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          {/* 日历面板 */}
          <Row>
            <Col span={24}>
              <Card bordered={false}>
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Index;
