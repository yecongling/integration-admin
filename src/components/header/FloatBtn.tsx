import React, {useState} from 'react';
import {CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined} from '@ant-design/icons';
import {FloatButton, Tooltip} from 'antd';

const FloatBtn: React.FC = () => {

  const [open, setOpen] = useState<boolean>(false);
  return (
      <>
        <FloatButton.Group shape="square" trigger="click" style={{right: 24}} open={open}
                           icon={<CustomerServiceOutlined onClick={() => {
                             setOpen(!open)
                           }}/>}>
          <FloatButton icon={<QuestionCircleOutlined/>}/>
          <FloatButton/>
          <FloatButton icon={<SyncOutlined/>}/>
          <Tooltip title="返回到顶部"><FloatButton.BackTop/></Tooltip>
        </FloatButton.Group>
      </>
  )
};
export default FloatBtn;