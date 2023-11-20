import React from "react";
import {Tabs, TabsProps} from "antd";
import {
  EditOutlined, LineHeightOutlined,
  PauseCircleOutlined,
  QuestionOutlined,
  StepBackwardOutlined,
  StepForwardOutlined
} from "@ant-design/icons";
import "./index.less";

const IconPicker: React.FC = () => {

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `方向类`,
      children: <>
        <ul className="anticons-list">
          <li className="Outlined">
            <StepBackwardOutlined style={{fontSize: "18px"}}/>
          </li>
          <li className="actions-list">
            <StepForwardOutlined style={{fontSize: "18px"}}/>
          </li>
        </ul>
      </>,
    },
    {
      key: '2',
      label: `提示类`,
      children: <>
        <ul className="anticons-list">
          <li className="Outlined">
            <QuestionOutlined style={{fontSize: "18px"}}/>
          </li>
          <li className="actions-list">
            <PauseCircleOutlined style={{fontSize: "18px"}}/>
          </li>
        </ul>
      </>,
    },
    {
      key: '3',
      label: `编辑类`,
      children: <>
        <ul className="anticons-list">
          <li className="Outlined">
            <EditOutlined style={{fontSize: "18px"}}/>
          </li>
          <li className="actions-list">
            <LineHeightOutlined style={{fontSize: "18px"}}/>
          </li>
        </ul>
      </>,
    },
  ];

  return (
    <>
      <Tabs tabBarStyle={{marginBottom: 0}} defaultActiveKey="1" items={items} onChange={onChange}/>
    </>
  )
}
export default IconPicker;