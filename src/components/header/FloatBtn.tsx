import React from 'react';
import {QuestionCircleOutlined, SyncOutlined} from '@ant-design/icons';
import {FloatButton} from 'antd';

const FloatBtn: React.FC = () => (
  <>
    <FloatButton.Group shape="square" style={{right: 24}}>
      <FloatButton icon={<QuestionCircleOutlined/>}/>
      <FloatButton/>
      <FloatButton icon={<SyncOutlined/>}/>
      <FloatButton.BackTop visibilityHeight={0}/>
    </FloatButton.Group>
  </>
);
export default FloatBtn;