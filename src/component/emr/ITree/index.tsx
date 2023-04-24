import React from "react";
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons';
import type {DataNode} from 'antd/es/tree';
import {Tree} from "antd";

const ITree: React.FC = (props) => {
  const treeData: DataNode[] = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <CarryOutOutlined/>,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined/>,
          children: [
            {title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined/>},
            {
              title: (
                <>
                  <div>multiple line title</div>
                  <div>multiple line title</div>
                </>
              ),
              key: '0-0-0-1',
              icon: <CarryOutOutlined/>,
            },
            {title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined/>},
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <CarryOutOutlined/>,
          children: [{title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined/>}],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <CarryOutOutlined/>,
          children: [
            {title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined/>},
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <CarryOutOutlined/>,
              switcherIcon: <FormOutlined/>,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <CarryOutOutlined/>,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <CarryOutOutlined/>,
          children: [
            {title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined/>},
            {title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined/>},
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Tree showLine showIcon defaultExpandAll treeData={treeData} style={{marginTop: '6px'}}></Tree>
    </>
  )
}

export default ITree;